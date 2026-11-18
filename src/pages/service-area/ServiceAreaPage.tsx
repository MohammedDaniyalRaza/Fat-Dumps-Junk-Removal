import React from 'react';
import { AreaSection } from '../../components/sections/AreaSection';
import { EstimateCtaBand } from '../../components/sections/EstimateCtaBand';
import { PageHero } from '../../components/sections/PageHero';
import { areasData } from '../../data/areas';
import { usePageSeo } from '../../lib/seo';

export default function ServiceAreaPage() {
  usePageSeo({
    title: 'Service Area — North County San Diego Junk Removal',
    description:
      'Serving Oceanside, Carlsbad, Vista, San Marcos, Escondido, Encinitas, Solana Beach, Del Mar, Poway, Fallbrook, and surrounding North County San Diego.',
    path: '/service-area',
  });

  return (
    <>
      <PageHero
        imageKey="coastalNorthCounty"
        title="North County"
        accentWord="Service Area"
        subtitle={`${areasData.headline}. ${areasData.note}`}
        breadcrumb={[{ label: 'Service Area' }]}
      />
      <AreaSection />

      <section className="section-compact surface-light" data-surface="light">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '20px',
            }}
          >
            <div style={{ padding: '22px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <p className="t-label" style={{ color: 'var(--green-deep)' }}>
                Coastal Corridor
              </p>
              <h3 className="t-display-md" style={{ color: '#0d0f0d', marginTop: '6px' }}>
                Oceanside to Del Mar
              </h3>
              <p className="t-body-sm muted-light" style={{ marginTop: '8px' }}>
                Tight coastal driveways, beach cottages, condos, and HOA neighborhoods along the I-5 and Highway 101 corridor.
              </p>
            </div>

            <div style={{ padding: '22px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <p className="t-label" style={{ color: 'var(--green-deep)' }}>
                78 &amp; 15 Inland Corridor
              </p>
              <h3 className="t-display-md" style={{ color: '#0d0f0d', marginTop: '6px' }}>
                Vista, San Marcos &amp; Escondido
              </h3>
              <p className="t-body-sm muted-light" style={{ marginTop: '8px' }}>
                Family homes, two-car garage purges, rental turnovers, and remodel debris cleanups throughout the 78 valley.
              </p>
            </div>

            <div style={{ padding: '22px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <p className="t-label" style={{ color: 'var(--green-deep)' }}>
                Hills, Ranches &amp; Estates
              </p>
              <h3 className="t-display-md" style={{ color: '#0d0f0d', marginTop: '6px' }}>
                Fallbrook, Poway &amp; Beyond
              </h3>
              <p className="t-body-sm muted-light" style={{ marginTop: '8px' }}>
                Larger lots, yard brush piles, outbuilding cleanouts, and surrounding communities—ask anytime if your town is nearby.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EstimateCtaBand />
    </>
  );
}
