import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { EstimateCtaBand } from '../../components/sections/EstimateCtaBand';
import { PageHero } from '../../components/sections/PageHero';
import { WhatWeTakePreview } from '../../components/sections/WhatWeTakePreview';
import { restrictedNote } from '../../data/whatWeTake';
import { usePageSeo } from '../../lib/seo';

export default function WhatWeTakePage() {
  usePageSeo({
    title: 'What We Take — Junk & Items We Haul',
    description:
      'See all furniture, appliances, mattresses, garage clutter, yard waste, and remodel scraps Fat Dumps hauls across North County San Diego.',
    path: '/what-we-take',
  });

  return (
    <>
      <PageHero
        imageKey="appliancesPickup"
        title="What We"
        accentWord="Haul"
        subtitle="Couches, fridges, mattresses, garage clutter, palm fronds, and remodel scraps. If you are unsure about an item, just send a photo and ask."
        breadcrumb={[{ label: 'What We Take' }]}
      />

      <WhatWeTakePreview fullView />

      <section className="section-compact surface-ink hairline-top">
        <div className="container-narrow">
          <div
            style={{
              padding: '26px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-graphite)',
              border: '1px solid var(--border-dark-strong)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <AlertTriangle size={20} style={{ color: 'var(--lime)' }} />
              <h2 className="t-display-md" style={{ color: 'var(--white)' }}>
                Items Requiring Special Disposal
              </h2>
            </div>
            <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginBottom: '14px' }}>
              {restrictedNote.body}
            </p>
            <ul
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '8px',
              }}
            >
              {restrictedNote.commonRestricted.map((item) => (
                <li key={item} className="t-body-sm" style={{ color: 'var(--silver-300)' }}>
                  · {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <EstimateCtaBand />
    </>
  );
}
