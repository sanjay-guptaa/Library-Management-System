import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookService } from '@/services';
import { useEntity } from '@/hooks/useEntity';
import { Book } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

const DetailRow: React.FC<{ label: string, value: React.ReactNode }> = ({ label, value }) => (
    <div style={{ marginBottom: theme.spacing.md }}>
        <strong style={{ color: theme.colors.textSecondary, display: 'block' }}>{label}</strong>
        <span style={{ fontSize: '1.1rem' }}>{value}</span>
    </div>
);

const BookDetailPage: React.FC = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const { data: book, loading, error } = useEntity<Book>(bookService, isbn);

  if (loading) return <div>Loading...</div>;
  if (error || !book) return <div>Error: {error || 'Book not found'}</div>;

  const typedBook = book as Book; // Cast from T | T[]

  return (
    <div>
        <Link to="/books"><Button variant="secondary" style={{marginBottom: theme.spacing.lg}}>&larr; Back to Catalog</Button></Link>
        <Card>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <h1 style={{...theme.typography.h1, marginTop: 0}}>{typedBook.title}</h1>
                {typedBook.isAvailable ? <Badge variant="success">Available</Badge> : <Badge variant="danger">Unavailable</Badge>}
            </div>
            <p style={{...theme.typography.p, color: theme.colors.textSecondary, marginTop: '-10px', marginBottom: theme.spacing.lg}}>by {typedBook.author}</p>
            
            <DetailRow label="ISBN" value={typedBook.isbn} />
            <DetailRow label="Category" value={typedBook.category} />
        </Card>
    </div>
  );
};

export default BookDetailPage;
