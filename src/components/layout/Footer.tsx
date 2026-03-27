import React from 'react';
import { theme } from '@/constants/theme';

export const Footer: React.FC = () => {
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: theme.spacing.lg,
    marginTop: 'auto',
    backgroundColor: theme.colors.white,
    color: theme.colors.textSecondary,
    fontSize: '0.875rem',
  };
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Library Management System. All rights reserved.</p>
    </footer>
  );
};
