import React from 'react';
import { beforeAfterPairs } from '../../data/gallery';
import { images } from '../../data/images';
import { BeforeAfter } from '../ui/InteractiveControls';

export const BeforeAfterSection: React.FC = () => (
  <section className="section surface-ink hairline-top">
    <div className="container">
      <div className="section-head section-head-split">
        <div>
          <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '10px' }}>
            Before &amp; After
          </p>
          <h2 className="t-display-xl">
            <span className="text-metal">Slide to clear</span>{' '}
            <span className="t-serif-accent" style={{ color: 'var(--lime)' }}>
              the clutter.
            </span>
          </h2>
        </div>
        <p className="t-body muted-dark">
          Drag the handle across either sample project to see how fast a packed garage or living room turns back into open floor space.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '24px',
        }}
      >
        {beforeAfterPairs.map((pair) => {
          const beforeImg = images[pair.beforeKey];
          const afterImg = images[pair.afterKey];
          return (
            <article key={pair.id}>
              <BeforeAfter
                beforeUrl={beforeImg.url}
                beforeAlt={beforeImg.alt}
                afterUrl={afterImg.url}
                afterAlt={afterImg.alt}
                beforeLabel={pair.beforeLabel}
                afterLabel={pair.afterLabel}
              />
              <div style={{ marginTop: '14px' }}>
                <p className="t-label" style={{ color: 'var(--lime)' }}>
                  {pair.label}
                </p>
                <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '4px' }}>
                  {pair.summary}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
