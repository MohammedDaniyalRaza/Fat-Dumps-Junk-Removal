import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../app/providers';
import { ScrollTrigger, refreshScrollTriggerAfterPaint } from '../../lib/gsap';
import './layout.css';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const { scrollToTop, clearScrollLocks } = useApp();

  useEffect(() => {
    clearScrollLocks();
    scrollToTop(true);

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    refreshScrollTriggerAfterPaint();
  }, [pathname, scrollToTop, clearScrollLocks]);

  return (
    <div key={pathname} className="fd-page-enter">
      <div className="fd-route-hairline" aria-hidden="true" />
      {children}
    </div>
  );
};
