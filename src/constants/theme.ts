const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  background: '#f0f2f5',
  white: '#ffffff',
  text: '#212529',
  textSecondary: '#6c757d',
  gray: '#ced4da',
  lightGray: '#e9ecef',
};

const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  lg: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
};

const typography: Record<string, React.CSSProperties> = {
    h1: { fontSize: '2.5rem', fontWeight: 700, margin: '0 0 1rem 0' },
    h2: { fontSize: '2rem', fontWeight: 700, margin: '0 0 1rem 0' },
    h3: { fontSize: '1.75rem', fontWeight: 600, margin: '0 0 1rem 0' },
    p: { fontSize: '1rem', lineHeight: 1.6, margin: '0 0 1rem 0' },
}

export const theme = {
  colors,
  spacing,
  shadows,
  typography,
  borderRadius: '8px',
} as const;
