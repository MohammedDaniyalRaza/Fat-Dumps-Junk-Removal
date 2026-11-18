import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './layout';

const HomePage = lazy(() => import('../pages/home/HomePage'));
const ServicesPage = lazy(() => import('../pages/services/ServicesPage'));
const ServiceDetailPage = lazy(() => import('../pages/services/ServiceDetailPage'));
const GetEstimatePage = lazy(() => import('../pages/estimate/GetEstimatePage'));
const WhatWeTakePage = lazy(() => import('../pages/what-we-take/WhatWeTakePage'));
const GalleryPage = lazy(() => import('../pages/gallery/GalleryPage'));
const ServiceAreaPage = lazy(() => import('../pages/service-area/ServiceAreaPage'));
const AboutPage = lazy(() => import('../pages/about/AboutPage'));
const TestimonialsPage = lazy(() => import('../pages/testimonials/TestimonialsPage'));
const FaqPage = lazy(() => import('../pages/faq/FaqPage'));
const JunkGuidePage = lazy(() => import('../pages/junk-guide/JunkGuidePage'));
const JunkGuidePostPage = lazy(() => import('../pages/junk-guide/JunkGuidePostPage'));
const ContactPage = lazy(() => import('../pages/contact/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/not-found/NotFoundPage'));

const MinimalFallback = () => (
  <div style={{ minHeight: '72dvh', backgroundColor: 'var(--bg-black)' }} aria-hidden="true" />
);

export const AppRoutes: React.FC = () => (
  <Suspense fallback={<MinimalFallback />}>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/get-an-estimate" element={<GetEstimatePage />} />
        <Route path="/what-we-take" element={<WhatWeTakePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/service-area" element={<ServiceAreaPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/junk-guide" element={<JunkGuidePage />} />
        <Route path="/junk-guide/:slug" element={<JunkGuidePostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
);
