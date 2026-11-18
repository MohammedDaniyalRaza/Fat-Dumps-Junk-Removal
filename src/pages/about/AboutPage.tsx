import React from 'react';
import { BenefitsStrip } from '../../components/sections/BenefitsStrip';
import { EstimateCtaBand } from '../../components/sections/EstimateCtaBand';
import { PageHero } from '../../components/sections/PageHero';
import { LinkButton } from '../../components/ui/Button';
import { SmartImage } from '../../components/ui/SmartImage';
import { business } from '../../data/business';
import { images } from '../../data/images';
import { usePageSeo } from '../../lib/seo';

export default function AboutPage() {
  usePageSeo({
    title: 'About Fat Dumps Junk Removal',
    description:
      'Straightforward, friendly junk removal serving North County San Diego. Free photo estimates, affordable pricing, and flexible scheduling.',
    path: '/about',
  });

  const heroImg = images.heroTruck;

  return (
    <>
      <PageHero
        imageKey="heroTruck"
        title="About"
        accentWord="Fat Dumps"
        subtitle="A playful name backed by serious work ethic. Local, friendly junk removal serving North County San Diego without corporate runaround."
        breadcrumb={[{ label: 'About' }]}
      />

      <section className="section surface-black">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '36px',
              alignItems: 'center',
            }}
          >
            <div>
              <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '10px' }}>
                How We Work
              </p>
              <h2 className="t-display-lg" style={{ color: 'var(--white)' }}>
                Simple estimates.{' '}
                <span className="t-serif-accent" style={{ color: 'var(--lime)' }}>
                  Honest hauling.
                </span>
              </h2>
              <p className="t-body" style={{ color: 'var(--silver-200)', marginTop: '14px' }}>
                Getting rid of an old sofa, clearing out a family home, or finally seeing the concrete floor in your garage should not feel like pulling teeth. You snap a photo, share your neighborhood, and get a straight answer.
              </p>
              <p className="t-body" style={{ color: 'var(--silver-200)', marginTop: '12px' }}>
                We show up on the schedule you pick, treat your floors and walls with care, haul the load away, and leave the area swept. And yes—even if it is just one heavy washer or a single mattress, reach out. {business.tagline}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
                <LinkButton to="/get-an-estimate" variant="primary">
                  Send Photos for Free Estimate
                </LinkButton>
                <LinkButton to="/services" variant="outline-dark">
                  Explore Services
                </LinkButton>
              </div>
            </div>

            <div
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-dark-strong)',
              }}
            >
              <SmartImage
                src={heroImg.url}
                alt={heroImg.alt}
                focalPoint={heroImg.focalPoint}
                aspectRatio="16 / 10"
              />
            </div>
          </div>
        </div>
      </section>

      <BenefitsStrip />
      <EstimateCtaBand />
    </>
  );
}
