import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ChevronRight, Phone } from 'lucide-react';
import { business } from '../../data/business';
import { images } from '../../data/images';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/gsap';
import { BannerRibbon } from '../svg/BrandGlyphs';
import { LinkButton } from '../ui/Button';
import './sections.css';

interface PageHeroProps {
  imageKey: keyof typeof images;
  title: string;
  accentWord?: string;
  subtitle: string;
  breadcrumb: { label: string; to?: string }[];
  bannerText?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  imageKey,
  title,
  accentWord,
  subtitle,
  breadcrumb,
  bannerText = business.bannerLabel,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();
  const img = images[imageKey] || images.heroTruck;

  useGsapContext(
    heroRef,
    () => {
      if (reducedMotion || !bgRef.current) return;
      gsap.fromTo(
        bgRef.current,
        { scale: 1.07 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    [reducedMotion]
  );

  return (
    <section ref={heroRef} className="fd-page-hero diag-cut-bottom">
      <div className="fd-hero-bg">
        <img
          ref={bgRef}
          src={img.url}
          alt={img.alt}
          loading="eager"
          decoding="sync"
          referrerPolicy="no-referrer"
          className="fd-hero-bg-img"
          style={{ objectPosition: img.focalPoint }}
        />
        <div className="fd-hero-scrim" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: '14px' }}>
          <ol
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--silver-200)',
              fontSize: '0.84rem',
            }}
          >
            <li>
              <Link to="/" style={{ color: 'var(--silver-200)' }}>
                Home
              </Link>
            </li>
            {breadcrumb.map((crumb, idx) => (
              <React.Fragment key={crumb.label}>
                <li aria-hidden="true" style={{ display: 'inline-flex', color: 'var(--lime)' }}>
                  <ChevronRight size={14} />
                </li>
                <li>
                  {crumb.to && idx < breadcrumb.length - 1 ? (
                    <Link to={crumb.to} style={{ color: 'var(--silver-200)' }}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <span style={{ color: 'var(--lime)', fontWeight: 600 }}>{crumb.label}</span>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>

        <div style={{ marginBottom: '14px' }}>
          <BannerRibbon label={bannerText} />
        </div>

        <h1 className="t-display-xl" style={{ maxWidth: '18ch', color: 'var(--white)' }}>
          <span className="text-metal">{title}</span>
          {accentWord && (
            <>
              {' '}
              <span className="t-serif-accent text-lime-fill">{accentWord}</span>
            </>
          )}
        </h1>

        <p className="t-body-lg" style={{ color: 'var(--silver-200)', maxWidth: '58ch', marginTop: '14px' }}>
          {subtitle}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
          <LinkButton to="/get-an-estimate" variant="primary">
            <Camera size={17} />
            <span>Send Photos for Free Estimate</span>
          </LinkButton>
          <LinkButton href={business.phoneHref} variant="light">
            <Phone size={17} />
            <span className="t-tabular">{business.phoneDisplay}</span>
          </LinkButton>
        </div>
      </div>
    </section>
  );
};
