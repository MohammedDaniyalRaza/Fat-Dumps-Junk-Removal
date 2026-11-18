import React from 'react';
import { BeforeAfterSection } from '../../components/sections/BeforeAfterSection';
import { EstimateCtaBand } from '../../components/sections/EstimateCtaBand';
import { GalleryPreview } from '../../components/sections/GalleryPreview';
import { PageHero } from '../../components/sections/PageHero';
import { usePageSeo } from '../../lib/seo';

export default function GalleryPage() {
  usePageSeo({
    title: 'Before & After Junk Removal Gallery',
    description:
      'Browse sample garage purges, living room cleanouts, appliance hauls, and yard debris pickups across North County San Diego.',
    path: '/gallery',
  });

  return (
    <>
      <PageHero
        imageKey="cleanGarage"
        title="Cleanout"
        accentWord="Gallery"
        subtitle="Compare before-and-after transformations and inspect sample hauling jobs across North County San Diego. Tap any image for full view."
        breadcrumb={[{ label: 'Gallery' }]}
      />
      <BeforeAfterSection />
      <GalleryPreview showFilters />
      <EstimateCtaBand />
    </>
  );
}
