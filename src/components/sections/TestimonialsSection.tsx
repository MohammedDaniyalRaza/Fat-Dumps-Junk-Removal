import React, { useMemo, useState } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { services } from '../../data/services';
import { testimonials } from '../../data/testimonials';
import { LinkButton } from '../ui/Button';
import { Tabs } from '../ui/InteractiveControls';
import './sections.css';

interface TestimonialsSectionProps {
  showFilters?: boolean;
  serviceSlug?: string;
  limit?: number;
  light?: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  showFilters = false,
  serviceSlug,
  limit,
  light = false,
}) => {
  const [activeService, setActiveService] = useState('All');

  const filterNames = ['All', ...services.map((s) => s.shortTitle)];

  const filtered = useMemo(() => {
    let list = testimonials;
    if (serviceSlug) {
      list = list.filter((t) => t.serviceSlug === serviceSlug);
    } else if (showFilters && activeService !== 'All') {
      const match = services.find((s) => s.shortTitle === activeService);
      if (match) list = list.filter((t) => t.serviceSlug === match.slug);
    }
    if (limit) list = list.slice(0, limit);
    return list;
  }, [activeService, limit, serviceSlug, showFilters]);

  return (
    <section
      className={`section hairline-top ${light ? 'surface-light' : 'surface-ink'}`}
      data-surface={light ? 'light' : 'dark'}
    >
      <div className="container">
        <div className="section-head section-head-split">
          <div>
            <p
              className="t-label"
              style={{ color: light ? 'var(--green-deep)' : 'var(--lime)', marginBottom: '10px' }}
            >
              Sample Customer Notes
            </p>
            <h2 className="t-display-xl" style={{ color: light ? '#0d0f0d' : 'var(--white)' }}>
              Neighbors around{' '}
              <span
                className="t-serif-accent"
                style={{ color: light ? 'var(--green-deep)' : 'var(--lime)' }}
              >
                North County.
              </span>
            </h2>
          </div>

          <div>
            <p className={`t-body ${light ? 'muted-light' : 'muted-dark'}`}>
              Sample reviews showing the kind of cleanouts, single-item pickups, and garage purges we handle every week.
            </p>
            {showFilters && (
              <div style={{ marginTop: '16px' }}>
                <Tabs tabs={filterNames} activeTab={activeService} onChange={setActiveService} />
              </div>
            )}
          </div>
        </div>

        <div className="fd-reviews-grid">
          {filtered.map((rev, i) => (
            <article
              key={rev.id}
              className="fd-review-card"
              style={{
                transform: i % 3 === 1 ? 'translateY(6px)' : undefined,
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span
                    className="t-label"
                    style={{ color: light ? 'var(--green-deep)' : 'var(--lime)', fontSize: '0.72rem' }}
                  >
                    {rev.jobNote}
                  </span>
                  <Quote
                    size={18}
                    style={{ color: light ? 'var(--green-deep)' : 'var(--lime)', opacity: 0.6 }}
                    aria-hidden="true"
                  />
                </div>
                <p
                  className="t-body"
                  style={{ color: light ? '#161916' : 'var(--silver-100)' }}
                >
                  “{rev.quote}”
                </p>
              </div>

              <div
                style={{
                  paddingTop: '14px',
                  borderTop: `1px solid ${light ? 'var(--border-light)' : 'var(--border-dark)'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ fontWeight: 700, color: light ? '#0d0f0d' : 'var(--white)' }}>
                  {rev.name}
                </span>
                <span className="t-label" style={{ color: light ? 'var(--muted-on-light)' : 'var(--silver-300)' }}>
                  {rev.town}
                </span>
              </div>
            </article>
          ))}
        </div>

        {!showFilters && !serviceSlug && (
          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
            <LinkButton to="/testimonials" variant={light ? 'outline-light' : 'outline-dark'}>
              <span>Read More Sample Reviews</span>
              <ArrowRight size={16} />
            </LinkButton>
          </div>
        )}
      </div>
    </section>
  );
};
