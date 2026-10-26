import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { DemoBar } from '../common/DemoBar';
import { MobileBottomBar } from '../common/MobileBottomBar';

export const PublicLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-lace)' }}>
      <DemoBar />
      <Header />
      <main style={{ flex: 1 }} className="has-mobile-bottom-bar">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
};

