import React from 'react';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { EstimateWizard } from '../../components/estimate/EstimateWizard';
import { PageHero } from '../../components/sections/PageHero';
import { LinkButton } from '../../components/ui/Button';
import { business } from '../../data/business';
import { usePageSeo } from '../../lib/seo';

export default function GetEstimatePage() {
  usePageSeo({
    title: 'Get a Free Photo Estimate — Fat Dumps Junk Removal',
    description:
      'Snap photos of the items you need hauled, pick your North County San Diego location, and send them by text or email for a free junk removal estimate.',
    path: '/get-an-estimate',
  });

  return (
    <>
      <PageHero
        imageKey="clutteredGarage"
        title="Free Photo"
        accentWord="Estimate"
        subtitle={business.estimatePrompt}
        breadcrumb={[{ label: 'Get an Estimate' }]}
      />

      <section className="section surface-black">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr)',
              gap: '28px',
            }}
          >
            <EstimateWizard />

            {/* Direct Shortcut Bar */}
            <div
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-graphite)',
                border: '1px solid var(--border-dark-strong)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '18px',
              }}
            >
              <div>
                <p className="t-label" style={{ color: 'var(--lime)' }}>
                  Prefer to Skip the Steps?
                </p>
                <h2 className="t-display-md" style={{ color: 'var(--white)', marginTop: '4px' }}>
                  Text or call us directly right now.
                </h2>
                <p className="t-body-sm" style={{ color: 'var(--silver-300)', marginTop: '4px' }}>
                  {business.tagline}
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <LinkButton href={business.smsHref} variant="primary">
                  <MessageSquare size={16} />
                  <span>Text {business.phoneDisplay}</span>
                </LinkButton>
                <LinkButton href={business.phoneHref} variant="light">
                  <Phone size={16} />
                  <span>Call Now</span>
                </LinkButton>
                <LinkButton href={business.emailHref} variant="outline-dark">
                  <Mail size={16} />
                  <span>Email Photos</span>
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
