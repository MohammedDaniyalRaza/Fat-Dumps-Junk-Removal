import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { images } from '../../data/images';
import { restrictedNote, whatWeTakeCategories } from '../../data/whatWeTake';
import { LinkButton } from '../ui/Button';
import { SmartImage } from '../ui/SmartImage';

export const WhatWeTakePreview: React.FC<{ fullView?: boolean }> = ({ fullView = false }) => {
  const list = fullView ? whatWeTakeCategories : whatWeTakeCategories.slice(0, 4);

  return (
    <section className="section surface-black hairline-top">
      <div className="container">
        <div className="section-head section-head-split">
          <div>
            <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '10px' }}>
              What We Haul
            </p>
            <h2 className="t-display-xl">
              <span className="text-metal">Almost anything</span>{' '}
              <span className="t-serif-accent" style={{ color: 'var(--lime)' }}>
                non-hazardous.
              </span>
            </h2>
          </div>
          <p className="t-body muted-dark">
            From one heavy refrigerator to a full garage or remodel stack—if two people can carry it onto the truck, we likely haul it.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
          }}
        >
          {list.map((cat) => {
            const img = images[cat.imageKey];
            return (
              <article
                key={cat.id}
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-ink)',
                  border: '1px solid var(--border-dark-strong)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <SmartImage
                  src={img.url}
                  alt={img.alt}
                  focalPoint={img.focalPoint}
                  aspectRatio="16 / 10"
                />
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h3 className="t-display-md" style={{ color: 'var(--white)', fontSize: '1.12rem' }}>
                    {cat.title}
                  </h3>
                  <p className="t-body-sm" style={{ color: 'var(--silver-300)' }}>
                    {cat.summary}
                  </p>
                  <ul style={{ display: 'grid', gap: '5px', marginTop: '4px' }}>
                    {cat.items.slice(0, fullView ? 5 : 3).map((item) => (
                      <li key={item} className="t-body-sm" style={{ color: 'var(--silver-100)' }}>
                        · {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* Generic Ask-Us Restricted Items Note */}
        <div
          style={{
            marginTop: '28px',
            padding: '22px 24px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-graphite)',
            border: '1px solid var(--border-lime)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '18px',
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', maxWidth: '68ch' }}>
            <AlertCircle size={22} style={{ color: 'var(--lime)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h3 className="t-display-md" style={{ color: 'var(--white)', fontSize: '1.08rem' }}>
                {restrictedNote.headline}
              </h3>
              <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '6px' }}>
                {restrictedNote.body}
              </p>
            </div>
          </div>

          {!fullView ? (
            <LinkButton to="/what-we-take" variant="outline-dark" size="sm">
              <span>See Full Item Guide</span>
              <ArrowRight size={15} />
            </LinkButton>
          ) : (
            <LinkButton to="/get-an-estimate" variant="primary" size="sm">
              <span>Ask About an Item</span>
              <ArrowRight size={15} />
            </LinkButton>
          )}
        </div>
      </div>
    </section>
  );
};
