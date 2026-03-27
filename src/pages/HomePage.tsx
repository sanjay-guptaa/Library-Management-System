import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

const HomePage: React.FC = () => {
    const containerStyle: React.CSSProperties = {
        textAlign: 'center',
        padding: `${theme.spacing.xxl} ${theme.spacing.lg}`,
    }

    const h1Style: React.CSSProperties = {
        ...theme.typography.h1,
        marginBottom: theme.spacing.md,
    }

    const pStyle: React.CSSProperties = {
        ...theme.typography.p,
        maxWidth: '600px',
        margin: '0 auto',
        marginBottom: theme.spacing.xl,
    }

    const buttonContainer: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing.lg,
    }

    return (
        <Card style={containerStyle}>
            <h1 style={h1Style}>Welcome to the Library Management System</h1>
            <p style={pStyle}>
                Efficiently manage library operations, from book cataloging to user transactions. 
                This system is designed to be organized, user-friendly, and efficient.
            </p>
            <div style={buttonContainer}>
                <Link to="/dashboard"><Button variant="primary">Go to Dashboard</Button></Link>
                <Link to="/books"><Button variant="secondary">Browse Books</Button></Link>
            </div>
        </Card>
    );
};

export default HomePage;
