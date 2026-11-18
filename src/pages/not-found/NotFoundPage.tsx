import React from 'react';
import { Camera, Home } from 'lucide-react';
import { PageHero } from '../../components/sections/PageHero';
import { DumpTruck } from '../../components/svg/DumpTruck';
import { LinkButton } from '../../components/ui/Button';
import { usePageSeo } from '../../lib/seo';

export default function NotFoundPage() {
  usePageSeo({
    title: 'This Page Got Hauled Away (404)',
    description: 'The page you were looking for is gone—just like the junk after a Fat Dumps pickup.',
    path: '/404',
  });

  return (
    <>
      <PageHero
        imageKey="heroTruck"
        title="This page got"
        accentWord="hauled away."
        subtitle="Looks like the link you followed is missing—we already loaded it onto the truck and swept up."
        breadcrumb={[{ label: '404' }]}
        bannerText="404 · CLEANED OUT"
      />

      <section className="section surface-black">
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '300px', marginInline: 'auto', marginBottom: '22px' }}>
            <DumpTruck fillPercent={80} />
          </div>
          <h2 className="t-display-lg" style={{ color: 'var(--white)' }}>
            Let’s get you back on track.
          </h2>
          <p className="t-body muted-dark" style={{ maxWidth: '46ch', marginInline: 'auto', marginTop: '10px' }}>
            Head back to the home page or jump straight to sending photos for a free junk removal estimate.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
            <LinkButton to="/" variant="light">
              <Home size={16} />
              <span>Back to Home</span>
            </LinkButton>
            <LinkButton to="/get-an-estimate" variant="primary">
              <Camera size={16} />
              <span>Get a Free Estimate</span>
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
