import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { MobileBar } from '../components/layout/MobileBar';
import { Navbar } from '../components/layout/Navbar';
import { PageTransition } from '../components/layout/PageTransition';
import { Preloader } from '../components/layout/Preloader';
import { CustomCursor } from '../components/ui/CustomCursor';
import { Lightbox } from '../components/ui/Lightbox';

export const AppLayout: React.FC = () => (
  <>
    <a href="#main-content" className="skip-link">
      Skip to content
    </a>
    <Preloader />
    <Navbar />
    <main id="main-content" tabIndex={-1}>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </main>
    <Footer />
    <MobileBar />
    <Lightbox />
    <CustomCursor />
  </>
);
