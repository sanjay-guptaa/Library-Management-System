import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userService, transactionService } from '@/services';
import { useEntity } from '@/hooks/useEntity';
import { User, TransactionWithDetails } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { formatDate } from '@/utils/formatters';
import { Badge } from '@/components/ui/Badge';

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: user, loading, error } = useEntity<User>(userService, Number(userId));
  const [transactions, setTransactions] = useState<TransactionWithDetails[]>([]);

  useEffect(() => {
    if (userId) {
      transactionService.getByUserId(Number(userId)).then(setTransactions);
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error || !user) return <div>Error: {error || 'User not found'}</div>;

  const typedUser = user as User;

  const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <p style={{ margin: `0 0 ${theme.spacing.sm} 0`}}>
        <strong style={{ color: theme.colors.textSecondary, width: '100px', display: 'inline-block' }}>{label}:</strong> {value}
    </p>
);

  return (
    <div>
      <Link to="/users"><Button variant="secondary" style={{ marginBottom: theme.spacing.lg }}>&larr; Back to Users</Button></Link>
      <Card style={{ marginBottom: theme.spacing.xl }}>
        <h1 style={{ ...theme.typography.h1, marginTop: 0 }}>{typedUser.name}</h1>
        <DetailRow label="User ID" value={typedUser.userId} />
        <DetailRow label="Email" value={typedUser.email} />
        <DetailRow label="Role" value={<Badge variant={typedUser.role === 'Admin' ? 'danger' : typedUser.role === 'Librarian' ? 'warning' : 'default'}>{typedUser.role}</Badge>} />
      </Card>

      <h2 style={{ ...theme.typography.h2, marginBottom: theme.spacing.md }}>Borrowing History</h2>
      {transactions.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          {transactions.map(tx => (
            <Card key={tx.transactionId} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <strong>{tx.book.title}</strong>
                <p style={{fontSize: '0.9rem', color: theme.colors.textSecondary}}>
                    Issued: {formatDate(tx.issueDate)} | Due: {formatDate(tx.dueDate)}
                </p>
              </div>
              {tx.returnDate 
                ? <Badge variant='default'>Returned on {formatDate(tx.returnDate)}</Badge>
                : <Badge variant='warning'>Active Loan</Badge>
              }
            </Card>
          ))}
        </div>
      ) : (
        <p>This user has no borrowing history.</p>
      )}
    </div>
  );
};

export default UserDetailPage;
