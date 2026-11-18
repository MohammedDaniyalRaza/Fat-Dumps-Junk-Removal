import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EstimateCtaBand } from '../../components/sections/EstimateCtaBand';
import { PageHero } from '../../components/sections/PageHero';
import { SmartImage } from '../../components/ui/SmartImage';
import { images } from '../../data/images';
import { junkGuidePosts } from '../../data/junkGuide';
import { usePageSeo } from '../../lib/seo';

export default function JunkGuidePage() {
  usePageSeo({
    title: 'Junk Guide — Practical Cleanout & Hauling Tips',
    description:
      'Helpful local guides on prepping for a home cleanout, handling old mattresses or couches, weekend garage checklists, and donating vs. hauling.',
    path: '/junk-guide',
  });

  return (
    <>
      <PageHero
        imageKey="yardDebris"
        title="The Junk"
        accentWord="Guide"
        subtitle="Practical, zero-fluff checklists and local tips for preparing cleanouts, sorting garages, and getting bulky items out fast."
        breadcrumb={[{ label: 'Junk Guide' }]}
      />

      <section className="section surface-black">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '24px',
            }}
          >
            {junkGuidePosts.map((post) => {
              const img = images[post.imageKey];
              return (
                <article
                  key={post.slug}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    background: 'var(--bg-ink)',
                    border: '1px solid var(--border-dark-strong)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <SmartImage
                    src={img.url}
                    alt={img.alt}
                    focalPoint={img.focalPoint}
                    aspectRatio="16 / 10"
                  />
                  <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
                    <div>
                      <p className="t-label" style={{ color: 'var(--lime)', fontSize: '0.72rem' }}>
                        {post.kicker} · {post.readTime}
                      </p>
                      <h2 className="t-display-md" style={{ color: 'var(--white)', marginTop: '8px' }}>
                        {post.title}
                      </h2>
                      <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '10px' }}>
                        {post.excerpt}
                      </p>
                    </div>

                    <Link
                      to={`/junk-guide/${post.slug}`}
                      className="t-label"
                      style={{
                        color: 'var(--lime)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>Read Guide</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <EstimateCtaBand />
    </>
  );
}
