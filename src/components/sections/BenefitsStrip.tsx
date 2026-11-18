import React, { useRef } from 'react';
import { Check } from 'lucide-react';
import { areasData } from '../../data/areas';
import { business } from '../../data/business';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/gsap';
import './sections.css';

export const BenefitsStrip: React.FC = () => {
  const scopeRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    scopeRef,
    () => {
      if (reducedMotion) return;
      gsap.from('.fd-benefit-card', {
        y: 22,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top 84%',
          once: true,
        },
      });
    },
    [reducedMotion]
  );

  const marqueeItems = [
    ...areasData.towns.slice(0, 8).map((t) => t.name),
    'FREE ESTIMATES',
    'Residential Cleanouts',
    'Furniture & Appliances',
    'Garage & Yard Junk',
  ];

  return (
    <section ref={scopeRef} className="surface-ink">
      <div className="section-compact">
        <div className="container">
          <div className="fd-benefits-grid">
            {business.benefits.map((b) => (
              <div key={b.id} className="fd-benefit-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--lime)',
                      color: '#070807',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <h2 className="t-display-md" style={{ color: 'var(--white)', fontSize: '1.04rem' }}>
                    {b.title}
                  </h2>
                </div>
                <p className="t-body-sm" style={{ color: 'var(--silver-300)' }}>
                  {b.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="fd-marquee" aria-hidden="true">
        <div className="fd-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="t-label"
              style={{
                color: idx % 3 === 0 ? 'var(--lime)' : 'var(--silver-200)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              <span>{item}</span>
              <span style={{ color: 'var(--silver-400)' }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
