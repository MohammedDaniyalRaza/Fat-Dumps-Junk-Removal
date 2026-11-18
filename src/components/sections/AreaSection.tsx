import React, { useState } from 'react';
import { MapPin, MessageSquare } from 'lucide-react';
import { areasData } from '../../data/areas';
import { AreaMap } from '../svg/AreaMap';
import { LinkButton } from '../ui/Button';

export const AreaSection: React.FC = () => {
  const [selectedTown, setSelectedTown] = useState('Carlsbad');

  return (
    <section className="section surface-black hairline-top">
      <div className="container">
        <div className="section-head section-head-split">
          <div>
            <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '10px' }}>
              Service Coverage
            </p>
            <h2 className="t-display-xl">
              <span className="text-metal">{areasData.headline}</span>
            </h2>
          </div>
          <p className="t-body muted-dark">
            Tap any town on the map or list to preview coverage—then send photos and your neighborhood for a free estimate.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '28px',
            alignItems: 'start',
          }}
        >
          <AreaMap selectedTown={selectedTown} onSelectTown={setSelectedTown} />

          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '10px',
              }}
            >
              {areasData.towns.map((town) => {
                const active = town.name === selectedTown;
                return (
                  <button
                    key={town.name}
                    type="button"
                    onClick={() => setSelectedTown(town.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 14px',
                      minHeight: '46px',
                      borderRadius: 'var(--radius-xs)',
                      border: `1.5px solid ${active ? 'var(--lime)' : 'var(--border-dark-strong)'}`,
                      background: active ? 'var(--lime)' : 'var(--bg-ink)',
                      color: active ? '#070807' : 'var(--silver-100)',
                      fontWeight: active ? 700 : 500,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background-color 150ms ease, color 150ms ease, border-color 150ms ease',
                    }}
                  >
                    <MapPin size={15} style={{ flexShrink: 0, color: active ? '#070807' : 'var(--lime)' }} />
                    <span>{town.name}</span>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                marginTop: '20px',
                padding: '20px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-graphite)',
                border: '1px solid var(--border-dark-strong)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
              }}
            >
              <div>
                <p className="t-display-md" style={{ color: 'var(--white)', fontSize: '1.05rem' }}>
                  {areasData.note}
                </p>
                <p className="t-body-sm" style={{ color: 'var(--silver-300)', marginTop: '4px' }}>
                  We serve surrounding San Diego neighborhoods too.
                </p>
              </div>
              <LinkButton to={`/get-an-estimate?city=${encodeURIComponent(selectedTown)}`} variant="primary" size="sm">
                <MessageSquare size={15} />
                <span>Estimate for {selectedTown}</span>
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
