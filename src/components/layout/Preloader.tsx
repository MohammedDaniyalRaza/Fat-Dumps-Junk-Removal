import React, { useEffect, useRef } from 'react';
import { useApp } from '../../app/providers';
import { business } from '../../data/business';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/gsap';
import { safeSetSession } from '../../lib/helpers';
import { DumpTruck } from '../svg/DumpTruck';
import './layout.css';

const PRELOADER_SESSION_KEY = 'fd_preloader_seen_v1';

export const Preloader: React.FC = () => {
  const { showPreloader, markAppReady, lockScroll, unlockScroll } = useApp();
  const reducedMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!showPreloader) return;
    lockScroll('preloader');

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      safeSetSession(PRELOADER_SESSION_KEY, '1');
      unlockScroll('preloader');
      markAppReady();
    };

    // Hard failsafe: never keep preloader past 3 seconds
    const hardFailsafe = window.setTimeout(finish, 3000);

    const el = overlayRef.current;
    if (!el) {
      finish();
      return () => window.clearTimeout(hardFailsafe);
    }

    if (reducedMotion) {
      const quickTimer = window.setTimeout(() => {
        gsap.to(el, {
          opacity: 0,
          duration: 0.25,
          onComplete: finish,
        });
      }, 250);
      return () => {
        window.clearTimeout(hardFailsafe);
        window.clearTimeout(quickTimer);
        unlockScroll('preloader');
      };
    }

    const fontGate = Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((res) => window.setTimeout(res, 1100)),
    ]);

    let tl: gsap.core.Timeline | null = null;

    fontGate
      .catch(() => {})
      .finally(() => {
        if (doneRef.current) return;
        try {
          tl = gsap.timeline({
            onComplete: finish,
          });

          if (sheenRef.current) {
            tl.fromTo(
              sheenRef.current,
              { xPercent: -140 },
              { xPercent: 280, duration: 0.9, ease: 'power2.inOut' },
              0.08
            );
          }

          if (fillRef.current) {
            tl.to(
              fillRef.current,
              { scaleX: 1, duration: 1.05, ease: 'power2.inOut' },
              0.05
            );
          }

          if (truckRef.current) {
            const trackWidth = truckRef.current.parentElement?.clientWidth || 260;
            const travel = Math.max(120, trackWidth - 68);
            tl.to(
              truckRef.current,
              { x: travel, duration: 1.05, ease: 'power2.inOut' },
              0.05
            );
          }

          tl.add(() => {
            el.classList.add('fd-preloader--exiting');
          });

          tl.to(el, {
            clipPath: 'inset(0 0 100% 0)',
            opacity: 0.92,
            duration: 0.45,
            ease: 'power3.inOut',
          });
        } catch {
          finish();
        }
      });

    return () => {
      window.clearTimeout(hardFailsafe);
      tl?.kill();
      unlockScroll('preloader');
    };
  }, [showPreloader, reducedMotion, lockScroll, unlockScroll, markAppReady]);

  if (!showPreloader) return null;

  return (
    <div
      ref={overlayRef}
      className="fd-preloader"
      aria-label="Loading Fat Dumps Junk Removal"
      role="status"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div className="fd-preloader-logo-wrap">
        <img src={business.logo} alt={business.fullName} className="fd-preloader-logo" />
        <div ref={sheenRef} className="sheen-sweep" />
      </div>

      <div className="fd-preloader-track">
        <div ref={truckRef} className="fd-preloader-truck">
          <DumpTruck fillPercent={65} showRecycle={false} />
        </div>
        <div className="fd-preloader-line-bg">
          <div ref={fillRef} className="fd-preloader-line-fill" />
        </div>
      </div>

      <p className="t-label" style={{ color: 'var(--silver-300)' }}>
        North County San Diego · We Haul It. You Walk Away.
      </p>
    </div>
  );
};
