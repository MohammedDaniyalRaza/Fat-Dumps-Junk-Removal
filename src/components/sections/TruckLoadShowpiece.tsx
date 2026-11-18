import React, { useRef, useState } from 'react';
import { Armchair, Box, Refrigerator, Trees } from 'lucide-react';
import { images } from '../../data/images';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/gsap';
import { LinkButton } from '../ui/Button';
import { SmartImage } from '../ui/SmartImage';
import { DumpTruck } from '../svg/DumpTruck';
import { HouseOutline, TrashBin } from '../svg/BrandGlyphs';
import './sections.css';

const LOAD_ITEMS = [
  { label: 'Old Sofa', Icon: Armchair },
  { label: 'Dead Fridge', Icon: Refrigerator },
  { label: 'Garage Boxes', Icon: Box },
  { label: 'Palm Fronds', Icon: Trees },
];

export const TruckLoadShowpiece: React.FC = () => {
  const scopeRef = useRef<HTMLElement>(null);
  const truckWrapRef = useRef<HTMLDivElement>(null);
  const roomRevealRef = useRef<HTMLDivElement>(null);
  const [fillPct, setFillPct] = useState(25);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    scopeRef,
    () => {
      if (reducedMotion) {
        setFillPct(92);
        return;
      }

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const items = gsap.utils.toArray<HTMLElement>('.fd-load-fly-item');
        const wheels = gsap.utils.toArray<SVGGElement>('.fd-showpiece-truck .fd-truck-wheel');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scopeRef.current,
            start: 'top 62%',
            end: 'bottom 35%',
            scrub: 0.7,
            onUpdate: (self) => {
              setFillPct(Math.round(18 + self.progress * 77));
            },
          },
        });

        if (truckWrapRef.current) {
          tl.fromTo(
            truckWrapRef.current,
            { x: -34 },
            { x: 34, ease: 'none' },
            0
          );
        }

        if (wheels.length > 0) {
          tl.to(wheels, { rotation: 360, ease: 'none' }, 0);
        }

        if (items.length > 0) {
          tl.to(
            items,
            {
              x: 42,
              y: 12,
              opacity: 0.35,
              scale: 0.85,
              stagger: 0.14,
              ease: 'power1.inOut',
            },
            0
          );
        }

        if (roomRevealRef.current) {
          tl.fromTo(
            roomRevealRef.current,
            { clipPath: 'inset(0 0 0 42%)' },
            { clipPath: 'inset(0 0 0 0%)', ease: 'none' },
            0.25
          );
        }
      });

      mm.add('(max-width: 1023px)', () => {
        setFillPct(85);
      });

      return () => mm.revert();
    },
    [reducedMotion]
  );

  const cleanRoom = images.emptyLivingRoom;

  return (
    <section ref={scopeRef} className="section surface-black hairline-top">
      <div className="container">
        <div className="section-head section-head-split">
          <div>
            <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '10px' }}>
              From Clutter to Clear Floor
            </p>
            <h2 className="t-display-xl">
              <span className="text-metal">Watch it load up.</span>{' '}
              <span className="t-serif-accent" style={{ color: 'var(--lime)' }}>
                Reclaim the room.
              </span>
            </h2>
          </div>
          <p className="t-body muted-dark">
            Whether it is one sofa or a whole-house cleanout, every item goes straight onto the truck and out of your hair.
          </p>
        </div>

        <div className="fd-showpiece-stage">
          <div className="fd-showpiece-grid">
            {/* Left: SVG House + Bin + Scrubbed Truck */}
            <div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '22px',
                }}
              >
                {LOAD_ITEMS.map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="fd-load-fly-item"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-xs)',
                      background: 'var(--bg-graphite)',
                      border: '1px solid var(--border-dark-strong)',
                      color: 'var(--silver-100)',
                      fontSize: '0.86rem',
                    }}
                  >
                    <Icon size={16} style={{ color: 'var(--lime)' }} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '12px',
                  paddingBlock: '12px',
                }}
              >
                <div style={{ width: '52px', flexShrink: 0, opacity: 0.8 }}>
                  <TrashBin />
                </div>
                <div style={{ width: '74px', flexShrink: 0, opacity: 0.85 }}>
                  <HouseOutline />
                </div>
                <div ref={truckWrapRef} className="fd-showpiece-truck" style={{ flex: '1 1 220px', maxWidth: '330px' }}>
                  <DumpTruck fillPercent={fillPct} />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '14px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-dark)',
                }}
              >
                <span className="t-label" style={{ color: 'var(--silver-300)' }}>
                  Truck Bed Progress
                </span>
                <span className="t-label t-tabular" style={{ color: 'var(--lime)' }}>
                  {fillPct}% Loaded
                </span>
              </div>
            </div>

            {/* Right: Clean Empty Room Reveal */}
            <div>
              <div
                ref={roomRevealRef}
                style={{
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-lime)',
                }}
              >
                <SmartImage
                  src={cleanRoom.url}
                  alt={cleanRoom.alt}
                  focalPoint={cleanRoom.focalPoint}
                  aspectRatio="16 / 10"
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  marginTop: '14px',
                }}
              >
                <p className="t-body-sm" style={{ color: 'var(--silver-200)' }}>
                  Floors swept and cleared on the way out.
                </p>
                <LinkButton to="/get-an-estimate" variant="primary" size="sm">
                  Send Photos Now
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
