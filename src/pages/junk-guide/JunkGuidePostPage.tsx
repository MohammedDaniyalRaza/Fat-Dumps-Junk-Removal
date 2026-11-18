import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EstimateCtaBand } from '../../components/sections/EstimateCtaBand';
import { PageHero } from '../../components/sections/PageHero';
import { LinkButton } from '../../components/ui/Button';
import { business } from '../../data/business';
import { getGuideBySlug, junkGuidePosts } from '../../data/junkGuide';
import { usePageSeo } from '../../lib/seo';
import NotFoundPage from '../not-found/NotFoundPage';

export default function JunkGuidePostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getGuideBySlug(slug) : undefined;

  usePageSeo({
    title: post ? post.title : 'Guide Not Found',
    description: post ? post.excerpt : business.estimatePrompt,
    path: post ? `/junk-guide/${post.slug}` : '/junk-guide',
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          author: {
            '@type': 'Organization',
            name: business.fullName,
          },
        }
      : undefined,
  });

  if (!post) {
    return <NotFoundPage />;
  }

  const others = junkGuidePosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHero
        imageKey={post.imageKey}
        title={post.kicker}
        subtitle={post.title}
        breadcrumb={[{ label: 'Junk Guide', to: '/junk-guide' }, { label: post.kicker }]}
      />

      <article className="section surface-black">
        <div className="container-narrow">
          <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '18px' }}>
            {post.kicker} · {post.readTime}
          </p>
          <p className="t-body-lg" style={{ color: 'var(--silver-100)', marginBottom: '32px' }}>
            {post.excerpt}
          </p>

          <div style={{ display: 'grid', gap: '28px' }}>
            {post.sections.map((sec) => (
              <section
                key={sec.heading}
                style={{
                  paddingTop: '22px',
                  borderTop: '1px solid var(--border-dark)',
                }}
              >
                <h2 className="t-display-md" style={{ color: 'var(--white)', marginBottom: '10px' }}>
                  {sec.heading}
                </h2>
                <p className="t-body" style={{ color: 'var(--silver-200)', maxWidth: '68ch' }}>
                  {sec.body}
                </p>
              </section>
            ))}
          </div>

          <div
            style={{
              marginTop: '36px',
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-graphite)',
              border: '1px solid var(--border-lime)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <p className="t-display-md" style={{ color: 'var(--white)', fontSize: '1.1rem' }}>
                Ready to skip the heavy lifting?
              </p>
              <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '4px' }}>
                {business.tagline}
              </p>
            </div>
            <LinkButton to="/get-an-estimate" variant="primary">
              Send Photos for Estimate
            </LinkButton>
          </div>

          <div style={{ marginTop: '28px' }}>
            <Link
              to="/junk-guide"
              className="t-label"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--silver-200)' }}
            >
              <ArrowLeft size={14} />
              <span>Back to All Guides</span>
            </Link>
          </div>
        </div>
      </article>

      <section className="section-compact surface-ink hairline-top">
        <div className="container">
          <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '14px' }}>
            More Guides
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '18px',
            }}
          >
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/junk-guide/${o.slug}`}
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-graphite)',
                  border: '1px solid var(--border-dark-strong)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <div>
                  <span className="t-label" style={{ color: 'var(--lime)', fontSize: '0.7rem' }}>
                    {o.kicker}
                  </span>
                  <h3 className="t-display-md" style={{ color: 'var(--white)', fontSize: '1.04rem', marginTop: '4px' }}>
                    {o.title}
                  </h3>
                </div>
                <ArrowRight size={17} style={{ color: 'var(--lime)', flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EstimateCtaBand />
    </>
  );
}
