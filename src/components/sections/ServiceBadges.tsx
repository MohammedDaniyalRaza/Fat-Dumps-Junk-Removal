import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { images } from '../../data/images';
import { services } from '../../data/services';
import './sections.css';

export const ServiceBadges: React.FC = () => (
  <section className="section surface-black">
    <div className="container">
      <div className="section-head section-head-split">
        <div>
          <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '10px' }}>
            Three Core Services
          </p>
          <h2 className="t-display-xl">
            <span className="text-metal">What we haul</span>{' '}
            <span className="t-serif-accent" style={{ color: 'var(--lime)' }}>
              every day.
            </span>
          </h2>
        </div>
        <p className="t-body muted-dark">
          Inspired by the three circular stamps on our logo—click any badge to view what we take, what to expect, and how fast we clear it.
        </p>
      </div>

      <div className="fd-badges-grid">
        {services.map((srv) => {
          const img = images[srv.heroImageKey];
          const ringId = `ring-path-${srv.slug}`;
          return (
            <Link key={srv.slug} to={`/services/${srv.slug}`} className="fd-badge-card">
              <div className="fd-badge-ring-wrap">
                <svg viewBox="0 0 180 180" className="fd-badge-ring-svg" aria-hidden="true">
                  <defs>
                    <path
                      id={ringId}
                      d="M 90, 90 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                    />
                  </defs>
                  <text
                    fill="#84E01B"
                    fontSize="11.5"
                    fontFamily="Chivo Mono, monospace"
                    letterSpacing="2.4"
                  >
                    <textPath href={`#${ringId}`}>
                      {`FAT DUMPS · ${srv.shortTitle.toUpperCase()} · NORTH COUNTY · `}
                    </textPath>
                  </text>
                </svg>

                <div className="fd-badge-center">
                  <img
                    src={img.url}
                    alt={img.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: img.focalPoint }}
                    loading="lazy"
                  />
                </div>
              </div>

              <span className="t-label" style={{ color: 'var(--lime)' }}>
                {srv.number} · {srv.kicker}
              </span>
              <h3 className="t-display-md" style={{ color: 'var(--white)', marginTop: '8px' }}>
                {srv.title}
              </h3>
              <p className="t-body-sm" style={{ color: 'var(--silver-300)', marginTop: '10px', maxWidth: '34ch' }}>
                {srv.shortBlurb}
              </p>
              <span
                className="t-label"
                style={{
                  color: 'var(--lime)',
                  marginTop: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Explore Service</span>
                <ArrowUpRight size={15} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);
