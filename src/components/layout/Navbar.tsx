import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, MessageSquare, Phone, X } from 'lucide-react';
import { useApp } from '../../app/providers';
import { business } from '../../data/business';
import { images } from '../../data/images';
import { navLinks } from '../../data/nav';
import { services } from '../../data/services';
import { LinkButton } from '../ui/Button';
import { SmartImage } from '../ui/SmartImage';
import './layout.css';

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const { mobileMenuOpen, setMobileMenuOpen, lockScroll, unlockScroll } = useApp();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastYRef = useRef(0);
  const megaTimeoutRef = useRef<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMegaOpen(false);
    setMobileMenuOpen(false);
    setHidden(false);
  }, [pathname, setMobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      lockScroll('mobile-menu');
      setHidden(false);
      closeBtnRef.current?.focus();
    } else {
      unlockScroll('mobile-menu');
    }
    return () => unlockScroll('mobile-menu');
  }, [mobileMenuOpen, lockScroll, unlockScroll]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (mobileMenuOpen || megaOpen) {
        setHidden(false);
        lastYRef.current = y;
        return;
      }
      if (y > 140 && y > lastYRef.current + 6) {
        setHidden(true);
      } else if (y < lastYRef.current - 6 || y <= 80) {
        setHidden(false);
      }
      lastYRef.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileMenuOpen, megaOpen]);

  const openMega = () => {
    if (megaTimeoutRef.current) window.clearTimeout(megaTimeoutRef.current);
    setMegaOpen(true);
  };

  const closeMegaDelayed = () => {
    megaTimeoutRef.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  const isRouteActive = (to: string) => {
    if (to === '/') return pathname === '/';
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <>
      <header
        className={`fd-header ${hidden && !mobileMenuOpen ? 'fd-header--hidden' : ''}`}
        onMouseLeave={closeMegaDelayed}
      >
        <div className="fd-header-inner">
          <Link to="/" className="fd-nav-brand" aria-label={`${business.fullName} home`}>
            <img src={business.logo} alt={business.fullName} className="fd-nav-logo" />
          </Link>

          {/* Desktop Navigation (>= 1100px) */}
          <nav className="fd-desktop-nav" aria-label="Main navigation">
            {navLinks.map((item) => {
              const active = isRouteActive(item.to);
              if (item.hasMegaMenu) {
                return (
                  <div
                    key={item.to}
                    onMouseEnter={openMega}
                    onFocus={openMega}
                    style={{ position: 'relative' }}
                  >
                    <Link
                      to={item.to}
                      className="fd-nav-link"
                      data-active={active}
                      aria-expanded={megaOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        style={{
                          transform: megaOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 160ms ease',
                        }}
                      />
                    </Link>
                  </div>
                );
              }
              return (
                <Link key={item.to} to={item.to} className="fd-nav-link" data-active={active}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="fd-desktop-actions">
            <LinkButton href={business.phoneHref} variant="outline-dark" size="sm">
              <Phone size={15} />
              <span className="t-tabular">{business.phoneDisplay}</span>
            </LinkButton>
            <LinkButton to="/get-an-estimate" variant="primary" size="sm">
              <span>Free Estimate</span>
            </LinkButton>
          </div>

          {/* Mobile Actions (< 1100px) */}
          <div className="fd-mobile-actions">
            <LinkButton
              to="/get-an-estimate"
              variant="primary"
              size="sm"
              className="fd-mobile-estimate-cta"
            >
              Free Estimate
            </LinkButton>
            <button
              ref={hamburgerRef}
              type="button"
              className="fd-hamburger"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={21} />
            </button>
          </div>
        </div>

        {/* Services Mega Menu */}
        {megaOpen && (
          <div
            className="fd-megamenu"
            onMouseEnter={openMega}
            onMouseLeave={closeMegaDelayed}
          >
            <div className="container">
              <div className="fd-megamenu-grid">
                {services.map((srv) => {
                  const img = images[srv.heroImageKey];
                  return (
                    <Link
                      key={srv.slug}
                      to={`/services/${srv.slug}`}
                      className="fd-megamenu-card"
                      onClick={() => setMegaOpen(false)}
                    >
                      <SmartImage
                        src={img.url}
                        alt={img.alt}
                        focalPoint={img.focalPoint}
                        aspectRatio="16 / 9"
                      />
                      <div>
                        <span className="t-label" style={{ color: 'var(--lime)', fontSize: '0.7rem' }}>
                          {srv.number}. {srv.kicker}
                        </span>
                        <h3 className="t-display-md" style={{ color: 'var(--white)', marginTop: '4px', fontSize: '1.05rem' }}>
                          {srv.title}
                        </h3>
                        <p className="t-body-sm" style={{ color: 'var(--silver-300)', marginTop: '4px' }}>
                          {srv.shortBlurb}
                        </p>
                      </div>
                    </Link>
                  );
                })}

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '18px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'linear-gradient(155deg, rgba(47, 122, 18, 0.25), rgba(13, 15, 13, 0.95))',
                    border: '1px solid var(--border-lime)',
                  }}
                >
                  <div>
                    <p className="t-label" style={{ color: 'var(--lime)' }}>
                      Free Photo Estimate
                    </p>
                    <p className="t-display-md" style={{ color: 'var(--white)', marginTop: '8px', fontSize: '1.1rem' }}>
                      Snap a picture, get a price.
                    </p>
                    <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '8px' }}>
                      {business.tagline}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                    <LinkButton to="/get-an-estimate" variant="primary" size="sm" fullWidth>
                      <span>Start Photo Estimate</span>
                      <ArrowRight size={15} />
                    </LinkButton>
                    <LinkButton to="/services" variant="outline-dark" size="sm" fullWidth>
                      All Services Overview
                    </LinkButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fd-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          data-lenis-prevent
        >
          <div className="fd-mobile-menu-top">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img src={business.logo} alt={business.fullName} className="fd-nav-logo" />
            </Link>
            <button
              ref={closeBtnRef}
              type="button"
              className="fd-hamburger"
              aria-label="Close navigation menu"
              onClick={() => {
                setMobileMenuOpen(false);
                hamburgerRef.current?.focus();
              }}
            >
              <X size={21} />
            </button>
          </div>

          <nav aria-label="Mobile links" style={{ marginTop: '12px', flex: 1 }}>
            {navLinks.map((item) => {
              const active = isRouteActive(item.to);
              if (item.hasMegaMenu) {
                return (
                  <div key={item.to}>
                    <button
                      type="button"
                      className="fd-mobile-menu-link"
                      data-active={active}
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((v) => !v)}
                    >
                      <span>Services</span>
                      <ChevronDown
                        size={20}
                        style={{
                          transform: mobileServicesOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 180ms ease',
                          color: 'var(--lime)',
                        }}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <div style={{ padding: '6px 0 12px 14px', borderBottom: '1px solid var(--border-dark)' }}>
                        <Link
                          to="/services"
                          onClick={() => setMobileMenuOpen(false)}
                          style={{ display: 'block', padding: '8px 0', color: 'var(--lime)', fontWeight: 700 }}
                        >
                          All Services Overview
                        </Link>
                        {services.map((srv) => (
                          <Link
                            key={srv.slug}
                            to={`/services/${srv.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ display: 'block', padding: '8px 0', color: 'var(--silver-200)' }}
                          >
                            {srv.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="fd-mobile-menu-link"
                  data-active={active}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={17} style={{ opacity: 0.5 }} />
                </Link>
              );
            })}
          </nav>

          <div style={{ display: 'grid', gap: '10px', marginTop: '24px' }}>
            <LinkButton
              to="/get-an-estimate"
              variant="primary"
              fullWidth
              onClick={() => setMobileMenuOpen(false)}
            >
              Send Photos for a Free Estimate
            </LinkButton>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <LinkButton href={business.phoneHref} variant="light" fullWidth>
                <Phone size={16} />
                <span>Call</span>
              </LinkButton>
              <LinkButton href={business.smsHref} variant="outline-dark" fullWidth>
                <MessageSquare size={16} />
                <span>Text Photos</span>
              </LinkButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
