import React from 'react';
import { AreaSection } from '../../components/sections/AreaSection';
import { BeforeAfterSection } from '../../components/sections/BeforeAfterSection';
import { BenefitsStrip } from '../../components/sections/BenefitsStrip';
import { EstimateCtaBand } from '../../components/sections/EstimateCtaBand';
import { FaqSection } from '../../components/sections/FaqSection';
import { GalleryPreview } from '../../components/sections/GalleryPreview';
import { HomeHero } from '../../components/sections/HomeHero';
import { LoadVisualizer } from '../../components/sections/LoadVisualizer';
import { ProcessSteps } from '../../components/sections/ProcessSteps';
import { ServiceBadges } from '../../components/sections/ServiceBadges';
import { ServicesShowcase } from '../../components/sections/ServicesShowcase';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { TruckLoadShowpiece } from '../../components/sections/TruckLoadShowpiece';
import { WhatWeTakePreview } from '../../components/sections/WhatWeTakePreview';
import { usePageSeo } from '../../lib/seo';

export default function HomePage() {
  usePageSeo({
    title: 'Fat Dumps — Junk Removal in North County San Diego',
    description:
      'Local junk removal serving North County San Diego. Residential cleanouts, furniture & appliance removal, and garage/yard hauling. Send photos for a free estimate.',
    path: '/',
  });

  return (
    <>
      <HomeHero />
      <BenefitsStrip />
      <ServiceBadges />
      <ServicesShowcase />
      <TruckLoadShowpiece />
      <ProcessSteps />
      <LoadVisualizer />
      <WhatWeTakePreview />
      <BeforeAfterSection />
      <GalleryPreview limit={6} />
      <TestimonialsSection limit={6} light />
      <AreaSection />
      <FaqSection limit={6} />
      <EstimateCtaBand imageKey="heroTruck" />
    </>
  );
}
