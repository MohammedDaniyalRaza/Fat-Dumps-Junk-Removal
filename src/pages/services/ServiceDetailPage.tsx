import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, Maximize2 } from 'lucide-react';
import { useLightbox } from '../../app/providers';
import { EstimateCtaBand } from '../../components/sections/EstimateCtaBand';
import { PageHero } from '../../components/sections/PageHero';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { LinkButton } from '../../components/ui/Button';
import { Accordion } from '../../components/ui/InteractiveControls';
import { SmartImage } from '../../components/ui/SmartImage';
import { business } from '../../data/business';
import { images } from '../../data/images';
import { getServiceBySlug, services } from '../../data/services';
import { usePageSeo } from '../../lib/seo';
import NotFoundPage from '../not-found/NotFoundPage';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const { open } = useLightbox();

  usePageSeo({
    title: service ? `${service.title} — North County San Diego` : 'Service Not Found',
    description: service
      ? `${service.shortBlurb} Text photos to ${business.phoneDisplay} for a free estimate.`
      : business.estimatePrompt,
    path: service ? `/services/${service.slug}` : '/services',
    jsonLd: service
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.longDescription,
          areaServed: 'North County San Diego, CA',
          provider: {
            '@type': 'LocalBusiness',
            name: business.fullName,
            telephone: '+1-619-627-5859',
            email: business.email,
          },
        }
      : undefined,
  });

  if (!service) {
    return <NotFoundPage />;
  }

  const galleryList = service.galleryKeys.map((k) => {
    const img = images[k];
    return {
      url: img.url,
      alt: img.alt,
      title: `${service.title} — Sample Project`,
      caption: 'Sample imagery — replace with the client’s real job photos.',
      categoryLabel: service.shortTitle,
    };
  });

  const related = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        imageKey={service.heroImageKey}
        title={service.title}
        subtitle={service.shortBlurb}
        breadcrumb={[{ label: 'Services', to: '/services' }, { label: service.shortTitle }]}
      />

      {/* Overview & What We Take / What to Expect */}
      <section className="section surface-black">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '32px',
              alignItems: 'start',
            }}
          >
            <div>
              <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '10px' }}>
                {service.number} · {service.kicker}
              </p>
              <h2 className="t-display-lg" style={{ color: 'var(--white)' }}>
                How we handle {service.shortTitle.toLowerCase()}
              </h2>
              <p className="t-body" style={{ color: 'var(--silver-200)', marginTop: '14px' }}>
                {service.longDescription}
              </p>

              <div
                style={{
                  marginTop: '24px',
                  padding: '22px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-ink)',
                  border: '1px solid var(--border-dark-strong)',
                }}
              >
                <h3 className="t-display-md" style={{ color: 'var(--lime)', fontSize: '1.05rem', marginBottom: '12px' }}>
                  Common Situations
                </h3>
                <ul style={{ display: 'grid', gap: '8px' }}>
                  {service.situations.map((s) => (
                    <li key={s} className="t-body-sm" style={{ display: 'flex', gap: '9px', color: 'var(--silver-100)' }}>
                      <Check size={15} style={{ color: 'var(--lime)', flexShrink: 0, marginTop: '3px' }} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              <div
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-graphite)',
                  border: '1px solid var(--border-dark-strong)',
                }}
              >
                <h3 className="t-display-md" style={{ color: 'var(--white)', marginBottom: '14px' }}>
                  What We Take
                </h3>
                <ul style={{ display: 'grid', gap: '9px' }}>
                  {service.whatWeTake.map((item) => (
                    <li key={item} className="t-body-sm" style={{ display: 'flex', gap: '10px', color: 'var(--silver-200)' }}>
                      <Check size={15} style={{ color: 'var(--lime)', flexShrink: 0, marginTop: '3px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="t-body-sm" style={{ color: 'var(--silver-300)', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-dark)' }}>
                  Not sure if a hazardous or unusual item is allowed? Ask us when you send your photos.
                </p>
              </div>

              <div
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-ink)',
                  border: '1px solid var(--border-dark-strong)',
                }}
              >
                <h3 className="t-display-md" style={{ color: 'var(--white)', marginBottom: '14px' }}>
                  What to Expect on Pickup Day
                </h3>
                <ul style={{ display: 'grid', gap: '9px' }}>
                  {service.whatToExpect.map((step) => (
                    <li key={step} className="t-body-sm" style={{ color: 'var(--silver-200)' }}>
                      · {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section surface-ink hairline-top">
        <div className="container">
          <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '10px' }}>
            Three-Step Flow
          </p>
          <h2 className="t-display-lg" style={{ color: 'var(--white)', marginBottom: '26px' }}>
            From photo to cleared space
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '20px',
            }}
          >
            {service.processSteps.map((ps) => (
              <div
                key={ps.step}
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-graphite)',
                  border: '1px solid var(--border-dark-strong)',
                }}
              >
                <span className="t-display-lg text-lime-outline t-tabular">{ps.step}</span>
                <h3 className="t-display-md" style={{ color: 'var(--white)', marginTop: '10px', fontSize: '1.15rem' }}>
                  {ps.title}
                </h3>
                <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '8px' }}>
                  {ps.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Strip (Lightbox) */}
      <section className="section surface-black hairline-top">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', alignItems: 'end', marginBottom: '24px' }}>
            <div>
              <p className="t-label" style={{ color: 'var(--lime)' }}>
                Sample Imagery
              </p>
              <h2 className="t-display-lg" style={{ color: 'var(--white)', marginTop: '6px' }}>
                {service.shortTitle} in action
              </h2>
            </div>
            <LinkButton to="/gallery" variant="outline-dark" size="sm">
              Full Gallery
            </LinkButton>
          </div>

          <div className="fd-gallery-grid">
            {galleryList.map((g, idx) => (
              <button
                key={g.url + idx}
                type="button"
                className="fd-gallery-tile"
                onClick={(e) => open(galleryList, idx, e.currentTarget)}
              >
                <div style={{ position: 'relative' }}>
                  <SmartImage src={g.url} alt={g.alt} aspectRatio="4 / 3" />
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(7,8,7,0.85)',
                      color: 'var(--lime)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Maximize2 size={14} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQ */}
      <section className="section surface-light" data-surface="light">
        <div className="container-narrow">
          <p className="t-label" style={{ color: 'var(--green-deep)', marginBottom: '8px' }}>
            Service Questions
          </p>
          <h2 className="t-display-lg" style={{ color: '#0d0f0d', marginBottom: '22px' }}>
            {service.shortTitle} FAQs
          </h2>
          <Accordion
            items={service.faqs.map((f, i) => ({
              id: `${service.slug}-faq-${i}`,
              question: f.q,
              answer: f.a,
            }))}
          />
        </div>
      </section>

      <TestimonialsSection serviceSlug={service.slug} />

      {/* Related Services */}
      <section className="section-compact surface-black hairline-top">
        <div className="container">
          <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '12px' }}>
            Other Ways We Help
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '18px',
            }}
          >
            {related.map((rel) => (
              <Link
                key={rel.slug}
                to={`/services/${rel.slug}`}
                style={{
                  padding: '22px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-ink)',
                  border: '1px solid var(--border-dark-strong)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div>
                  <span className="t-label" style={{ color: 'var(--lime)', fontSize: '0.7rem' }}>
                    {rel.number} · {rel.kicker}
                  </span>
                  <h3 className="t-display-md" style={{ color: 'var(--white)', marginTop: '4px', fontSize: '1.1rem' }}>
                    {rel.title}
                  </h3>
                </div>
                <ArrowRight size={18} style={{ color: 'var(--lime)', flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EstimateCtaBand imageKey={service.heroImageKey} />
    </>
  );
}
