import React, { useEffect, useRef } from 'react';
import { Armchair, Box, Camera, Refrigerator } from 'lucide-react';
import { loadSizes } from '../../data/estimate';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/gsap';
import { DumpTruck } from '../svg/DumpTruck';
import { LinkButton } from '../ui/Button';

interface LoadVisualizerProps {
  selectedId?: string;
  onSelect?: (id: string) => void;
  embedded?: boolean;
}

export const LoadVisualizer: React.FC<LoadVisualizerProps> = ({
  selectedId = 'half',
  onSelect,
  embedded = false,
}) => {
  const [internalId, setInternalId] = React.useState(selectedId);
  const activeId = onSelect ? selectedId : internalId;
  const activeLoad = loadSizes.find((l) => l.id === activeId) || loadSizes[2];
  const iconsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const handlePick = (id: string) => {
    if (onSelect) onSelect(id);
    else setInternalId(id);
  };

  useEffect(() => {
    if (reducedMotion || !iconsRef.current) return;
    gsap.fromTo(
      iconsRef.current.children,
      { y: -12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.035,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      }
    );
  }, [activeId, reducedMotion]);

  const content = (
    <div
      style={{
        padding: embedded ? '20px' : 'clamp(24px, 4vw, 42px)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-graphite)',
        border: '1px solid var(--border-dark-strong)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '28px',
          alignItems: 'center',
        }}
      >
        {/* Truck Visual */}
        <div>
          <div style={{ maxWidth: '360px', marginInline: 'auto' }}>
            <DumpTruck fillPercent={activeLoad.fillPercent} />
          </div>

          <div
            ref={iconsRef}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '14px',
              minHeight: '36px',
            }}
            aria-hidden="true"
          >
            {Array.from({ length: Math.min(8, Math.ceil(activeLoad.itemCount / 2)) }).map((_, i) => {
              const Icon = i % 3 === 0 ? Armchair : i % 3 === 1 ? Refrigerator : Box;
              return (
                <span
                  key={i}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: 'var(--bg-ink)',
                    border: '1px solid var(--border-lime)',
                    color: 'var(--lime)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={15} />
                </span>
              );
            })}
          </div>
        </div>

        {/* Controls + Qualitative Summary */}
        <div>
          <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '8px' }}>
            Estimate Your Truck Space
          </p>
          <h3 className="t-display-md" style={{ color: 'var(--white)' }}>
            {activeLoad.label}
          </h3>
          <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '8px' }}>
            {activeLoad.summary}
          </p>
          <p className="t-body-sm" style={{ color: 'var(--silver-300)', marginTop: '4px' }}>
            Typical examples: {activeLoad.examples}
          </p>

          <div className="fd-chip-group" style={{ marginTop: '16px' }} role="group" aria-label="Load size options">
            {loadSizes.map((item) => (
              <button
                key={item.id}
                type="button"
                className="fd-chip"
                aria-pressed={item.id === activeId}
                data-active={item.id === activeId}
                onClick={() => handlePick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {!embedded && (
            <div style={{ marginTop: '20px' }}>
              <LinkButton to={`/get-an-estimate?load=${activeId}`} variant="primary">
                <Camera size={16} />
                <span>Send Photos for This Load Size</span>
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (embedded) return content;

  return (
    <section className="section surface-ink hairline-top">
      <div className="container">
        <div className="section-head section-head-split">
          <div>
            <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '10px' }}>
              Load Visualizer
            </p>
            <h2 className="t-display-xl">
              <span className="text-metal">How much space</span>{' '}
              <span className="t-serif-accent" style={{ color: 'var(--lime)' }}>
                will it take?
              </span>
            </h2>
          </div>
          <p className="t-body muted-dark">
            Tap a rough size below to picture how much truck space your pile needs—then send photos for a free, accurate estimate.
          </p>
        </div>
        {content}
      </div>
    </section>
  );
};
