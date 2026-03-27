import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { theme } from '@/constants/theme';

interface Props {}

export const PageLayout: React.FC<Props> = () => {
  const layoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    padding: theme.spacing.xl,
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
  };

  return (
    <div style={layoutStyle}>
      <Header />
      <main style={mainStyle}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
