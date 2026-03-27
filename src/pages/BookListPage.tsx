import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { bookService } from '@/services';
import { Book } from '@/types';
import { Table } from '@/components/ui/Table';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

const BookListPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const data = await bookService.getAll();
      setBooks(data);
      setLoading(false);
    };
    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    if (!searchTerm) return books;
    const lowercasedTerm = searchTerm.toLowerCase();
    return books.filter(book => 
        book.title.toLowerCase().includes(lowercasedTerm) ||
        book.author.toLowerCase().includes(lowercasedTerm) ||
        book.isbn.includes(lowercasedTerm)
    );
  }, [books, searchTerm]);

  const headers = [
    { key: 'title', label: 'Title' },
    { key: 'author', label: 'Author' },
    { key: 'isbn', label: 'ISBN' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const TdStyle: React.CSSProperties = {
    padding: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.lightGray}`,
    verticalAlign: 'middle',
  };

  const renderRow = (book: Book) => (
    <tr key={book.isbn} style={{backgroundColor: theme.colors.white}}>
      <td style={TdStyle}><strong>{book.title}</strong></td>
      <td style={TdStyle}>{book.author}</td>
      <td style={TdStyle}>{book.isbn}</td>
      <td style={TdStyle}>
        {book.isAvailable ? 
            <Badge variant="success">Available</Badge> : 
            <Badge variant="danger">Unavailable</Badge>
        }
      </td>
      <td style={TdStyle}>
          <Link to={`/books/${book.isbn}`}><Button style={{padding: '4px 8px'}}>View Details</Button></Link>
      </td>
    </tr>
  );

  if (loading) return <div>Loading books...</div>;

  return (
    <div>
      <h1 style={theme.typography.h1}>Book Catalog</h1>
      <Input 
        placeholder="Search by title, author, or ISBN..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: `${theme.spacing.lg} 0`, maxWidth: '400px' }}
      />
      <Table headers={headers} data={filteredBooks} renderRow={renderRow} />
    </div>
  );
};

export default BookListPage;
