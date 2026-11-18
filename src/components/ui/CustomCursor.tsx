import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const isFinePointer = useMediaQuery('(pointer: fine) and (hover: hover)');
  const reducedMotion = useReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFinePointer || reducedMotion) return;
    const ring = ringRef.current;
    if (!ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ring.style.opacity = '1';

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], input, textarea');
      if (interactive) {
        ring.dataset.hover = 'true';
      } else {
        ring.dataset.hover = 'false';
      }
    };

    const onLeave = () => {
      ring.style.opacity = '0';
    };

    const tick = () => {
      curX += (mouseX - curX) * 0.22;
      curY += (mouseY - curY) * 0.22;
      ring.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isFinePointer, reducedMotion]);

  if (!isFinePointer || reducedMotion) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        border: '1.5px solid rgba(132, 224, 27, 0.72)',
        backgroundColor: 'rgba(132, 224, 27, 0.04)',
        pointerEvents: 'none',
        zIndex: 'var(--z-cursor)' as unknown as number,
        opacity: 0,
        transition: 'width 180ms ease, height 180ms ease, border-color 180ms ease, opacity 180ms ease',
        mixBlendMode: 'difference',
      }}
      className="fd-custom-cursor"
    />
  );
};
