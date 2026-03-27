import React from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from '@/constants/navigation';
import { theme } from '@/constants/theme';

export const Header: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    backgroundColor: theme.colors.white,
    padding: `0 ${theme.spacing.xl}`,
    boxShadow: theme.shadows.sm,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  };

  const logoStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: theme.colors.primary,
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing.lg,
  };

  const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
    color: isActive ? theme.colors.primary : theme.colors.text,
    fontWeight: isActive ? 700 : 500,
    textDecoration: 'none',
    padding: `${theme.spacing.sm} 0`,
    borderBottom: `2px solid ${isActive ? theme.colors.primary : 'transparent'}`,
    transition: 'all 0.2s ease-in-out'
  });

  return (
    <header style={headerStyle}>
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <div style={logoStyle}>LMS</div>
      </NavLink>
      <nav style={navStyle}>
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            style={({ isActive }) => navLinkStyle(isActive)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
