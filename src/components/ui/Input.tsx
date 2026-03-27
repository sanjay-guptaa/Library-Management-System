import React from 'react';
import { theme } from '@/constants/theme';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<Props> = ({ style, ...props }) => {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: theme.spacing.md,
    fontSize: '1rem',
    border: `1px solid ${theme.colors.gray}`,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.white,
  };

  return <input style={{ ...inputStyle, ...style }} {...props} />;
};
