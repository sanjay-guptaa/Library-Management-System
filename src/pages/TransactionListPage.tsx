import React from 'react';
import { Link } from 'react-router-dom';
import { transactionService } from '@/services';
import { useEntity } from '@/hooks/useEntity';
import { TransactionWithDetails } from '@/types';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { theme } from '@/constants/theme';
import { formatDate } from '@/utils/formatters';
import { isOverdue } from '@/utils/validators';

const TransactionListPage: React.FC = () => {
  const { data, loading, error } = useEntity<TransactionWithDetails[]>(transactionService, undefined);
  const transactions = data as TransactionWithDetails[] | null;

  const headers = [
    { key: 'book', label: 'Book Title' },
    { key: 'user', label: 'User' },
    { key: 'dates', label: 'Dates' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error: {error}</p>;

  const TdStyle: React.CSSProperties = {
    padding: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.lightGray}`,
    verticalAlign: 'middle',
  };

  const renderRow = (tx: TransactionWithDetails) => (
    <tr key={tx.transactionId} style={{backgroundColor: theme.colors.white}}>
      <td style={TdStyle}><strong>{tx.book.title}</strong></td>
      <td style={TdStyle}>{tx.user.name}</td>
      <td style={TdStyle}>
        <div>Issued: {formatDate(tx.issueDate)}</div>
        <div style={{color: theme.colors.textSecondary}}>Due: {formatDate(tx.dueDate)}</div>
      </td>
      <td style={TdStyle}>
        {tx.returnDate ? 
            <Badge variant="default">Returned</Badge> : 
            isOverdue(tx.dueDate) ? 
            <Badge variant="danger">Overdue</Badge> : 
            <Badge variant="warning">Active</Badge>}
      </td>
      <td style={TdStyle}>
        <Link to={`/transactions/${tx.transactionId}`}><Button style={{padding: '4px 8px'}}>View</Button></Link>
      </td>
    </tr>
  );

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg}}>
        <h1 style={theme.typography.h1}>All Transactions</h1>
        <Link to="/transactions/new"><Button variant="primary">Issue New Book</Button></Link>
      </div>
      <Table headers={headers} data={transactions || []} renderRow={renderRow} />
    </div>
  );
};

export default TransactionListPage;
