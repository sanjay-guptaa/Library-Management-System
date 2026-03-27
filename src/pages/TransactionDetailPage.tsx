import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { transactionService } from '@/services';
import { useEntity } from '@/hooks/useEntity';
import { TransactionWithDetails } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { theme } from '@/constants/theme';
import { formatDate, formatCurrency } from '@/utils/formatters';
import { isOverdue } from '@/utils/validators';

const DetailRow: React.FC<{ label: string, value: React.ReactNode }> = ({ label, value }) => (
    <div style={{ marginBottom: theme.spacing.md, display: 'grid', gridTemplateColumns: '150px 1fr' }}>
        <strong style={{ color: theme.colors.textSecondary }}>{label}</strong>
        <span>{value}</span>
    </div>
);

const TransactionDetailPage: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const { data: transaction, loading, error, refetch } = useEntity<TransactionWithDetails>(transactionService, Number(transactionId));
  const navigate = useNavigate();
  const [isReturning, setIsReturning] = useState(false);
  const [returnError, setReturnError] = useState('');

  const handleReturnBook = async () => {
    if (!transactionId) return;
    setIsReturning(true);
    setReturnError('');
    try {
        await transactionService.returnBook(Number(transactionId));
        // Refetch the data to show updated state
        refetch();
    } catch(e: any) {
        setReturnError(e.message || 'Failed to return book.');
    } finally {
        setIsReturning(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error || !transaction) return <div>Error: {error || 'Transaction not found'}</div>;

  const tx = transaction as TransactionWithDetails;

  return (
    <div>
        <Link to="/transactions"><Button variant="secondary" style={{marginBottom: theme.spacing.lg}}>&larr; Back to Transactions</Button></Link>
        <Card>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `1px solid ${theme.colors.lightGray}`, paddingBottom: theme.spacing.md, marginBottom: theme.spacing.lg}}>
                <h1 style={{...theme.typography.h1, marginTop: 0, marginBottom: 0}}>Transaction #{tx.transactionId}</h1>
                {tx.returnDate ? 
                    <Badge variant="default">Closed</Badge> : 
                    isOverdue(tx.dueDate) ? 
                    <Badge variant="danger">Overdue</Badge> : 
                    <Badge variant="warning">Active</Badge>}
            </div>
            <h2 style={theme.typography.h2}>Book Details</h2>
            <DetailRow label="Title" value={<Link to={`/books/${tx.book.isbn}`} style={{color: theme.colors.primary}}>{tx.book.title}</Link>} />
            <DetailRow label="Author" value={tx.book.author} />
            <DetailRow label="ISBN" value={tx.book.isbn} />
            
            <h2 style={{...theme.typography.h2, marginTop: theme.spacing.lg}}>User Details</h2>
            <DetailRow label="Name" value={<Link to={`/users/${tx.user.userId}`} style={{color: theme.colors.primary}}>{tx.user.name}</Link>} />
            <DetailRow label="Email" value={tx.user.email} />
            
            <h2 style={{...theme.typography.h2, marginTop: theme.spacing.lg}}>Loan Details</h2>
            <DetailRow label="Issue Date" value={formatDate(tx.issueDate)} />
            <DetailRow label="Due Date" value={formatDate(tx.dueDate)} />
            <DetailRow label="Return Date" value={formatDate(tx.returnDate)} />
            <DetailRow label="Fine Incurred" value={<strong>{formatCurrency(tx.fineAmount)}</strong>} />

            {!tx.returnDate && (
                <div style={{borderTop: `1px solid ${theme.colors.lightGray}`, paddingTop: theme.spacing.lg, marginTop: theme.spacing.lg}}>
                    <Button variant="primary" onClick={handleReturnBook} disabled={isReturning}>
                        {isReturning ? 'Processing...' : 'Process Book Return'}
                    </Button>
                    {returnError && <p style={{color: theme.colors.danger, marginTop: theme.spacing.sm}}>{returnError}</p>}
                </div>
            )}
        </Card>
    </div>
  );
};

export default TransactionDetailPage;
