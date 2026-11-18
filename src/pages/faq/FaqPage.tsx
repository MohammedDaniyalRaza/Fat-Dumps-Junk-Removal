import React from 'react';
import { EstimateCtaBand } from '../../components/sections/EstimateCtaBand';
import { FaqSection } from '../../components/sections/FaqSection';
import { PageHero } from '../../components/sections/PageHero';
import { faqs } from '../../data/faqs';
import { usePageSeo } from '../../lib/seo';

export default function FaqPage() {
  usePageSeo({
    title: 'Junk Removal FAQ — Estimates, Scheduling & What We Take',
    description:
      'Honest answers on free photo estimates, flexible scheduling, appliances, mattresses, yard waste, and North County San Diego coverage.',
    path: '/faq',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    },
  });

  return (
    <>
      <PageHero
        imageKey="mattressAndChair"
        title="Frequently Asked"
        accentWord="Questions"
        subtitle="Everything you want to know about photo estimates, single-item pickups, preparation, and what can ride on the truck."
        breadcrumb={[{ label: 'FAQ' }]}
      />
      <FaqSection showCategoryTabs />
      <EstimateCtaBand />
    </>
  );
}
