import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { theme } from '@/constants/theme';
import { bookService, userService, transactionService } from '@/services';
import { isOverdue } from '@/utils/validators';

const StatCard: React.FC<{ title: string; value: string | number; style?: React.CSSProperties }> = ({ title, value, style }) => (
    <Card style={{...{textAlign: 'center'}, ...style}}>
        <h3 style={{...theme.typography.h3, color: theme.colors.primary}}>{value}</h3>
        <p style={{color: theme.colors.textSecondary}}>{title}</p>
    </Card>
);

const DashboardPage: React.FC = () => {
    const [stats, setStats] = useState({ books: 0, users: 0, activeLoans: 0, overdue: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const [allBooks, allUsers, allTransactions] = await Promise.all([
                bookService.getAll(),
                userService.getAll(),
                transactionService.getAll()
            ]);

            const activeLoans = allTransactions.filter(t => t.returnDate === null);
            const overdueLoans = activeLoans.filter(t => isOverdue(t.dueDate));

            setStats({
                books: allBooks.length,
                users: allUsers.length,
                activeLoans: activeLoans.length,
                overdue: overdueLoans.length
            });
        };
        fetchStats();
    }, []);

    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: theme.spacing.lg,
        marginTop: theme.spacing.lg,
    }; 

    return (
        <div>
            <h1 style={theme.typography.h1}>Dashboard</h1>
            <p style={theme.typography.p}>An overview of the library's current status.</p>
            <div style={gridStyle}>
                <StatCard title="Total Books" value={stats.books} />
                <StatCard title="Registered Users" value={stats.users} />
                <StatCard title="Active Loans" value={stats.activeLoans} />
                <StatCard title="Books Overdue" value={stats.overdue} style={{backgroundColor: stats.overdue > 0 ? '#fff3cd' : theme.colors.white}} />
            </div>
        </div>
    );
};

export default DashboardPage;
