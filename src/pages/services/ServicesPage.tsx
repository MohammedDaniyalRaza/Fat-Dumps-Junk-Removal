import React from 'react';
import { ArrowRight, Camera, Check, Layers, MapPin, ShieldQuestion, Truck } from 'lucide-react';
import { EstimateCtaBand } from '../../components/sections/EstimateCtaBand';
import { LoadVisualizer } from '../../components/sections/LoadVisualizer';
import { PageHero } from '../../components/sections/PageHero';
import { LinkButton } from '../../components/ui/Button';
import { SmartImage } from '../../components/ui/SmartImage';
import { images } from '../../data/images';
import { services } from '../../data/services';
import { usePageSeo } from '../../lib/seo';

const ESTIMATE_FACTORS = [
  {
    title: 'Amount of Truck Space',
    body: 'Whether it is one bulky couch or a packed two-car garage, estimates scale with how much room your load takes.',
    Icon: Truck,
  },
  {
    title: 'Type & Weight of Items',
    body: 'Standard household furniture and boxes haul differently than dense tile, appliances, or heavy yard trimmings.',
    Icon: Layers,
  },
  {
    title: 'Stairs & Carry Access',
    body: 'Driveway staging, ground-floor rooms, second-story stairs, or tight side gates affect time and crew effort.',
    Icon: MapPin,
  },
  {
    title: 'Local Disposal & Sorting',
    body: 'Certain items like mattresses, refrigerators, or remodel debris carry specific local facility handling rules.',
    Icon: ShieldQuestion,
  },
];

export default function ServicesPage() {
  usePageSeo({
    title: 'Junk Removal Services in North County San Diego',
    description:
      'Residential cleanouts, furniture & appliance removal, and garage, yard & general junk hauling across North County San Diego. Send photos for a free estimate.',
    path: '/services',
  });

  return (
    <>
      <PageHero
        imageKey="heroTruck"
        title="Junk Removal"
        accentWord="Services"
        subtitle="Three focused hauling services built around real North County homes, driveways, garages, and moves. No job inquiry is too small."
        breadcrumb={[{ label: 'Services' }]}
      />

      {/* Detailed Three Services */}
      <section className="section surface-black">
        <div className="container">
          <div style={{ display: 'grid', gap: '36px' }}>
            {services.map((srv, idx) => {
              const img = images[srv.heroImageKey];
              const isReversed = idx % 2 === 1;
              return (
                <article
                  key={srv.slug}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                    gap: '28px',
                    alignItems: 'center',
                    padding: 'clamp(20px, 3vw, 34px)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-ink)',
                    border: '1px solid var(--border-dark-strong)',
                  }}
                >
                  <div style={{ order: isReversed ? 2 : 1 }}>
                    <SmartImage
                      src={img.url}
                      alt={img.alt}
                      focalPoint={img.focalPoint}
                      aspectRatio="16 / 10"
                    />
                  </div>

                  <div style={{ order: isReversed ? 1 : 2 }}>
                    <span className="t-label" style={{ color: 'var(--lime)' }}>
                      {srv.number} · {srv.kicker}
                    </span>
                    <h2 className="t-display-lg" style={{ color: 'var(--white)', marginTop: '8px' }}>
                      {srv.title}
                    </h2>
                    <p className="t-body" style={{ color: 'var(--silver-200)', marginTop: '12px' }}>
                      {srv.longDescription}
                    </p>

                    <ul
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                        gap: '8px',
                        marginTop: '16px',
                      }}
                    >
                      {srv.whatWeTake.slice(0, 4).map((item) => (
                        <li
                          key={item}
                          className="t-body-sm"
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--silver-100)' }}
                        >
                          <Check size={14} style={{ color: 'var(--lime)', flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '22px' }}>
                      <LinkButton to={`/services/${srv.slug}`} variant="light">
                        <span>Explore {srv.shortTitle}</span>
                        <ArrowRight size={16} />
                      </LinkButton>
                      <LinkButton to="/get-an-estimate" variant="primary">
                        <Camera size={16} />
                        <span>Get Free Estimate</span>
                      </LinkButton>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Affects the Estimate (NO invented prices) */}
      <section className="section surface-light" data-surface="light">
        <div className="container">
          <div className="section-head section-head-split">
            <div>
              <p className="t-label" style={{ color: 'var(--green-deep)', marginBottom: '10px' }}>
                Transparent Pricing Factors
              </p>
              <h2 className="t-display-xl" style={{ color: '#0d0f0d' }}>
                What affects{' '}
                <span className="t-serif-accent" style={{ color: 'var(--green-deep)' }}>
                  your estimate?
                </span>
              </h2>
            </div>
            <p className="t-body muted-light">
              Every pile is different—that is why we do photo estimates instead of guessing sight unseen. Here is what shapes your free quote.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '20px',
            }}
          >
            {ESTIMATE_FACTORS.map(({ title, body, Icon }) => (
              <div
                key={title}
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                }}
              >
                <span
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#0d0f0d',
                    color: 'var(--lime)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}
                >
                  <Icon size={19} />
                </span>
                <h3 className="t-display-md" style={{ color: '#0d0f0d', fontSize: '1.1rem' }}>
                  {title}
                </h3>
                <p className="t-body-sm" style={{ color: 'var(--muted-on-light)', marginTop: '8px' }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LoadVisualizer />
      <EstimateCtaBand />
    </>
  );
}
