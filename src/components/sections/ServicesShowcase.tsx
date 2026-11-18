import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { images } from '../../data/images';
import { services } from '../../data/services';
import { LinkButton } from '../ui/Button';
import './sections.css';

export const ServicesShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section surface-ink hairline-top">
      <div className="container">
        <div className="section-head section-head-split">
          <div>
            <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '10px' }}>
              Full Breakdown
            </p>
            <h2 className="t-display-xl">
              <span className="text-metal">Point at the pile.</span>{' '}
              <span className="t-serif-accent" style={{ color: 'var(--lime)' }}>
                We clear it.
              </span>
            </h2>
          </div>
          <p className="t-body muted-dark">
            Hover or tap any service panel to expand typical jobs, situations, and direct booking.
          </p>
        </div>

        <div className="fd-panels">
          {services.map((srv, idx) => {
            const isActive = idx === activeIndex;
            const img = images[srv.previewImageKey];
            return (
              <article
                key={srv.slug}
                className="fd-panel"
                data-active={isActive}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="fd-panel-bg">
                  <img
                    src={img.url}
                    alt={img.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    style={{ objectPosition: img.focalPoint }}
                  />
                  <div className="fd-panel-scrim" />
                </div>

                <div className="fd-panel-body">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <span className="t-display-lg text-lime-outline t-tabular" style={{ lineHeight: 1 }}>
                      {srv.number}
                    </span>
                    <span className="t-label" style={{ color: 'var(--lime)' }}>
                      {srv.kicker}
                    </span>
                  </div>

                  <h3 className="t-display-md" style={{ color: 'var(--white)', marginTop: '12px' }}>
                    {srv.title}
                  </h3>

                  <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '10px', maxWidth: '46ch' }}>
                    {srv.shortBlurb}
                  </p>

                  {isActive && (
                    <ul
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                        gap: '6px 14px',
                        marginTop: '14px',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--border-dark)',
                      }}
                    >
                      {srv.situations.slice(0, 4).map((sit) => (
                        <li key={sit} className="t-body-sm" style={{ color: 'var(--silver-100)' }}>
                          · {sit}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
                    <LinkButton to={`/services/${srv.slug}`} variant="light" size="sm">
                      <span>View Service Details</span>
                      <ArrowRight size={15} />
                    </LinkButton>
                    <LinkButton to="/get-an-estimate" variant="primary" size="sm">
                      Free Estimate
                    </LinkButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
