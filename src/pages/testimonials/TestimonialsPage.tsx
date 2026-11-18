import React from 'react';
import { EstimateCtaBand } from '../../components/sections/EstimateCtaBand';
import { PageHero } from '../../components/sections/PageHero';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { usePageSeo } from '../../lib/seo';

export default function TestimonialsPage() {
  usePageSeo({
    title: 'Customer Testimonials — Fat Dumps Junk Removal',
    description:
      'Sample homeowner stories across North County San Diego for residential cleanouts, furniture removal, and garage or yard junk hauling.',
    path: '/testimonials',
  });

  return (
    <>
      <PageHero
        imageKey="emptyLivingRoom"
        title="Customer"
        accentWord="Stories"
        subtitle="Filter by service to read sample notes from North County cleanouts, single-item hauls, and garage purges."
        breadcrumb={[{ label: 'Testimonials' }]}
      />
      <TestimonialsSection showFilters />
      <EstimateCtaBand />
    </>
  );
}
