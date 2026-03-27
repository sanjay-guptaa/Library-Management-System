import React from 'react';
import { theme } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'default';
}

export const Badge: React.FC<Props> = ({ children, variant = 'default' }) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    fontSize: '0.75rem',
    fontWeight: 700,
    borderRadius: '12px',
    textTransform: 'uppercase',
  };

  const variantStyles: Record<typeof variant, React.CSSProperties> = {
    success: { backgroundColor: '#d4edda', color: '#155724' },
    danger: { backgroundColor: '#f8d7da', color: '#721c24' },
    warning: { backgroundColor: '#fff3cd', color: '#856404' },
    default: { backgroundColor: theme.colors.lightGray, color: theme.colors.dark },
  };

  return <span style={{ ...baseStyle, ...variantStyles[variant] }}>{children}</span>;
};
