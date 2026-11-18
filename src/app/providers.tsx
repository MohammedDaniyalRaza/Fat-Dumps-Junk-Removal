import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { safeGetSession } from '../lib/helpers';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface LightboxItem {
  url: string;
  alt: string;
  title?: string;
  caption?: string;
  town?: string;
  categoryLabel?: string;
}

interface AppContextValue {
  appReady: boolean;
  showPreloader: boolean;
  markAppReady: () => void;
  lenis: Lenis | null;
  scrollToTop: (immediate?: boolean) => void;
  lockScroll: (source: string) => void;
  unlockScroll: (source: string) => void;
  clearScrollLocks: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LightboxContextValue {
  isOpen: boolean;
  items: LightboxItem[];
  index: number;
  open: (items: LightboxItem[], startIndex?: number, triggerEl?: HTMLElement | null) => void;
  close: () => void;
  setIndex: (idx: number) => void;
}

const AppContext = createContext<AppContextValue | null>(null);
const LightboxContext = createContext<LightboxContextValue | null>(null);

const PRELOADER_SESSION_KEY = 'fd_preloader_seen_v1';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [showPreloader, setShowPreloader] = useState<boolean>(() => {
    return safeGetSession(PRELOADER_SESSION_KEY) !== '1';
  });
  const [appReady, setAppReady] = useState<boolean>(() => {
    return safeGetSession(PRELOADER_SESSION_KEY) === '1';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [lbState, setLbState] = useState<{
    isOpen: boolean;
    items: LightboxItem[];
    index: number;
  }>({
    isOpen: false,
    items: [],
    index: 0,
  });

  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const locksRef = useRef<Set<string>>(new Set());
  const openerRef = useRef<HTMLElement | null>(null);

  const applyScrollLockState = useCallback(() => {
    const locked = locksRef.current.size > 0;
    if (locked) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenisRef.current?.start();
    }
  }, []);

  const lockScroll = useCallback(
    (source: string) => {
      locksRef.current.add(source);
      applyScrollLockState();
    },
    [applyScrollLockState]
  );

  const unlockScroll = useCallback(
    (source: string) => {
      locksRef.current.delete(source);
      applyScrollLockState();
    },
    [applyScrollLockState]
  );

  const clearScrollLocks = useCallback(() => {
    locksRef.current.clear();
    applyScrollLockState();
  }, [applyScrollLockState]);

  const markAppReady = useCallback(() => {
    setShowPreloader(false);
    setAppReady(true);
    locksRef.current.delete('preloader');
    applyScrollLockState();
    requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // Safe guard
      }
    });
  }, [applyScrollLockState]);

  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current = null;
      setLenisInstance(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    if (locksRef.current.size > 0) {
      lenis.stop();
    }

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [reducedMotion]);

  const scrollToTop = useCallback((immediate = true) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate });
    }
    window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'auto' : 'smooth' });
  }, []);

  const openLightbox = useCallback(
    (items: LightboxItem[], startIndex = 0, triggerEl?: HTMLElement | null) => {
      if (!items || items.length === 0) return;
      openerRef.current = triggerEl || (document.activeElement as HTMLElement | null);
      const clamped = Math.max(0, Math.min(startIndex, items.length - 1));
      setLbState({ isOpen: true, items, index: clamped });
      lockScroll('lightbox');
    },
    [lockScroll]
  );

  const closeLightbox = useCallback(() => {
    setLbState((prev) => ({ ...prev, isOpen: false }));
    unlockScroll('lightbox');
    requestAnimationFrame(() => {
      openerRef.current?.focus?.();
    });
  }, [unlockScroll]);

  const setLightboxIndex = useCallback((idx: number) => {
    setLbState((prev) => {
      if (prev.items.length === 0) return prev;
      const wrapped = ((idx % prev.items.length) + prev.items.length) % prev.items.length;
      return { ...prev, index: wrapped };
    });
  }, []);

  const appValue = useMemo<AppContextValue>(
    () => ({
      appReady,
      showPreloader,
      markAppReady,
      lenis: lenisInstance,
      scrollToTop,
      lockScroll,
      unlockScroll,
      clearScrollLocks,
      mobileMenuOpen,
      setMobileMenuOpen,
    }),
    [
      appReady,
      showPreloader,
      markAppReady,
      lenisInstance,
      scrollToTop,
      lockScroll,
      unlockScroll,
      clearScrollLocks,
      mobileMenuOpen,
    ]
  );

  const lightboxValue = useMemo<LightboxContextValue>(
    () => ({
      isOpen: lbState.isOpen,
      items: lbState.items,
      index: lbState.index,
      open: openLightbox,
      close: closeLightbox,
      setIndex: setLightboxIndex,
    }),
    [lbState, openLightbox, closeLightbox, setLightboxIndex]
  );

  return (
    <AppContext.Provider value={appValue}>
      <LightboxContext.Provider value={lightboxValue}>{children}</LightboxContext.Provider>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProviders');
  return ctx;
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used inside AppProviders');
  return ctx;
}
