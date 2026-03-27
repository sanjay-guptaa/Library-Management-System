import React from 'react';
import { theme } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<Props> = ({ children, style }) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    boxShadow: theme.shadows.sm,
    padding: theme.spacing.lg,
    ...style,
  };

  return <div style={cardStyle}>{children}</div>;
}; 
