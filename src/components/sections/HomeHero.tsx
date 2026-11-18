import React, { useRef } from 'react';
import { ArrowRight, Camera, MessageSquare, Phone } from 'lucide-react';
import { useApp } from '../../app/providers';
import { business } from '../../data/business';
import { images } from '../../data/images';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/gsap';
import { BannerRibbon } from '../svg/BrandGlyphs';
import { DumpTruck } from '../svg/DumpTruck';
import { LinkButton } from '../ui/Button';
import './sections.css';

export const HomeHero: React.FC = () => {
  const { appReady } = useApp();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroImg = images.heroTruck;

  useGsapContext(
    sectionRef,
    () => {
      if (!appReady || reducedMotion) return;

      const tl = gsap.timeline();
      if (headlineRef.current) {
        tl.from(headlineRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.72,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });
      }

      if (truckRef.current) {
        tl.from(
          truckRef.current,
          {
            x: -110,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
          0.1
        );
      }
    },
    [appReady, reducedMotion]
  );

  return (
    <section ref={sectionRef} className="fd-hero diag-cut-bottom">
      <div className="fd-hero-bg">
        <img
          src={heroImg.url}
          alt={heroImg.alt}
          loading="eager"
          decoding="sync"
          referrerPolicy="no-referrer"
          className="fd-hero-bg-img"
          style={{ objectPosition: heroImg.focalPoint }}
        />
        <div className="fd-hero-scrim" />
      </div>

      <div className="container">
        <div className="fd-hero-grid">
          {/* Left Focal Column */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <BannerRibbon label={business.bannerLabel} />
              <span className="t-label" style={{ color: 'var(--silver-200)' }}>
                North County San Diego · Free Estimates
              </span>
            </div>

            <h1 ref={headlineRef} className="t-display-hero" style={{ maxWidth: '15ch' }}>
              <span className="text-metal">WE HAUL IT.</span>
              <br />
              <span style={{ color: 'var(--white)' }}>YOU </span>
              <span className="t-serif-accent text-lime-fill">WALK AWAY.</span>
            </h1>

            <p className="t-body-lg" style={{ color: 'var(--silver-200)', maxWidth: '52ch', marginTop: '20px' }}>
              {business.estimatePrompt}
            </p>

            {/* Handwritten Note + Arrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '14px',
                color: 'var(--lime-bright)',
              }}
            >
              <svg width="36" height="22" viewBox="0 0 36 22" fill="none" aria-hidden="true">
                <path
                  d="M2 16C11 16 20 12 31 6M31 6L24 4M31 6L28 13"
                  stroke="#A6F23A"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="t-hand" style={{ fontSize: '1.55rem' }}>
                {business.tagline}
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '26px' }}>
              <LinkButton to="/get-an-estimate" variant="primary" size="lg">
                <Camera size={19} />
                <span>Send Photos for a Free Estimate</span>
              </LinkButton>
              <LinkButton href={business.phoneHref} variant="light" size="lg">
                <Phone size={18} />
                <span className="t-tabular">{business.phoneDisplay}</span>
              </LinkButton>
            </div>

            {/* Driving Truck Line */}
            <div className="fd-hero-truck-rail">
              <div ref={truckRef} style={{ width: '118px', flexShrink: 0 }}>
                <DumpTruck fillPercent={70} />
              </div>
              <p className="t-body-sm" style={{ color: 'var(--silver-300)' }}>
                Residential Cleanouts · Furniture &amp; Appliances · Garage &amp; Yard Hauling
              </p>
            </div>
          </div>

          {/* Right Mini Photo Estimate Card */}
          <aside className="fd-hero-mini-box" aria-label="Quick photo estimate options">
            <p className="t-label" style={{ color: 'var(--lime)' }}>
              Fastest Way to Book
            </p>
            <h2 className="t-display-md" style={{ color: 'var(--white)', marginTop: '8px' }}>
              Got junk? Snap a pic.
            </h2>
            <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '8px' }}>
              Send a wide shot of the pile, your North County town, and what needs to go. Zero guesswork.
            </p>

            <ol
              style={{
                display: 'grid',
                gap: '8px',
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: '1px solid var(--border-dark)',
              }}
            >
              <li className="t-body-sm" style={{ color: 'var(--silver-100)' }}>
                <strong style={{ color: 'var(--lime)' }}>01.</strong> Snap photos of items or room
              </li>
              <li className="t-body-sm" style={{ color: 'var(--silver-100)' }}>
                <strong style={{ color: 'var(--lime)' }}>02.</strong> Share city &amp; stairs/driveway access
              </li>
              <li className="t-body-sm" style={{ color: 'var(--silver-100)' }}>
                <strong style={{ color: 'var(--lime)' }}>03.</strong> Get your free estimate back
              </li>
            </ol>

            <div style={{ display: 'grid', gap: '8px', marginTop: '18px' }}>
              <LinkButton to="/get-an-estimate" variant="primary" fullWidth>
                <span>Open Photo Estimator</span>
                <ArrowRight size={16} />
              </LinkButton>
              <LinkButton href={business.smsHref} variant="outline-dark" fullWidth>
                <MessageSquare size={16} />
                <span>Text Photos to {business.phoneDisplay}</span>
              </LinkButton>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
