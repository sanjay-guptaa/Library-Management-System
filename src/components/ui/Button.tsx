import React from 'react';
import { theme } from '@/constants/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<Props> = ({ children, variant = 'primary', style, ...props }) => {
  const baseStyle: React.CSSProperties = {
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    border: 'none',
    borderRadius: theme.borderRadius,
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 600,
    transition: 'background-color 0.2s ease-in-out, transform 0.1s ease',
  };

  const variantStyles: Record<typeof variant, React.CSSProperties> = {
    primary: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.white,
    },
    secondary: {
      backgroundColor: theme.colors.lightGray,
      color: theme.colors.dark,
      border: `1px solid ${theme.colors.gray}`,
    },
    danger: {
      backgroundColor: theme.colors.danger,
      color: theme.colors.white,
    },
  };

  const disabledStyle: React.CSSProperties = props.disabled
    ? { backgroundColor: theme.colors.gray, cursor: 'not-allowed' }
    : {};

  return (
    <button
      style={{ ...baseStyle, ...variantStyles[variant], ...disabledStyle, ...style }}
      {...props}
    >
      {children}
    </button>
  );
};
