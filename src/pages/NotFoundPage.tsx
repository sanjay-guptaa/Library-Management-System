import React from 'react';
import { Link } from 'react-router-dom';
import { theme } from '@/constants/theme';
import { Button } from '@/components/ui/Button';

const NotFoundPage: React.FC = () => {
    const containerStyle: React.CSSProperties = {
        textAlign: 'center',
        padding: `80px ${theme.spacing.lg}`,
    };
    const h1Style: React.CSSProperties = {
        fontSize: '6rem',
        color: theme.colors.primary,
        marginBottom: 0,
    };
    const h2Style: React.CSSProperties = {
        ...theme.typography.h2,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xl
    };

  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>404</h1>
      <h2 style={h2Style}>Page Not Found</h2>
      <p style={{marginBottom: theme.spacing.xl}}>The page you are looking for does not exist or has been moved.</p>
      <Link to="/dashboard">
        <Button variant="primary">Go to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
