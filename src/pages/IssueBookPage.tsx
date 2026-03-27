import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useForm } from '@/hooks/useForm';
import { theme } from '@/constants/theme';
import { userService, bookService, transactionService } from '@/services';
import { User, Book } from '@/types';

const IssueBookPage: React.FC = () => {
  const { values, handleChange, resetForm } = useForm({ userId: '', isbn: '' });
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({ submitting: false, error: '', success: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [allUsers, allBooks] = await Promise.all([
        userService.getAll(),
        bookService.getAll(),
      ]);
      setUsers(allUsers);
      setBooks(allBooks.filter(b => b.isAvailable)); // Only show available books
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.userId || !values.isbn) {
        setFormState({ submitting: false, success: '', error: 'Please select both a user and a book.' });
        return;
    }

    setFormState({ submitting: true, success: '', error: '' });
    try {
        const newTransaction = await transactionService.issueBook({
            userId: Number(values.userId),
            isbn: values.isbn
        });
        setFormState({ submitting: false, error: '', success: `Book issued successfully! Transaction ID: ${newTransaction.transactionId}`});
        resetForm();
        setTimeout(() => navigate(`/transactions/${newTransaction.transactionId}`), 2000);
    } catch (err: any) {
        setFormState({ submitting: false, success: '', error: err.message || 'An unexpected error occurred.' });
    }
  };

  if (loading) return <p>Loading users and books...</p>;

  const formGroup: React.CSSProperties = { marginBottom: theme.spacing.lg };
  const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 'bold', marginBottom: theme.spacing.sm };

  return (
    <Card>
        <h1 style={theme.typography.h1}>Issue a New Book</h1>
        <p style={{...theme.typography.p, marginBottom: theme.spacing.xl}}>Follow the steps from the sequence diagram to issue a book.</p>
        <form onSubmit={handleSubmit}>
            <div style={formGroup}>
                <label htmlFor="userId" style={labelStyle}>1. Select User</label>
                <Select id="userId" name="userId" value={values.userId} onChange={handleChange} required>
                    <option value="">-- Select a User --</option>
                    {users.map(user => (
                        <option key={user.userId} value={user.userId}>{user.name} (ID: {user.userId})</option>
                    ))}
                </Select>
            </div>

            <div style={formGroup}>
                <label htmlFor="isbn" style={labelStyle}>2. Select Available Book</label>
                <Select id="isbn" name="isbn" value={values.isbn} onChange={handleChange} required>
                    <option value="">-- Select a Book --</option>
                    {books.map(book => (
                        <option key={book.isbn} value={book.isbn}>{book.title} - {book.author}</option>
                    ))}
                </Select>
            </div>
            
            <Button type="submit" variant="primary" disabled={formState.submitting}>
                {formState.submitting ? 'Issuing...' : '3. Issue Book'}
            </Button>

            {formState.error && <p style={{color: theme.colors.danger, marginTop: theme.spacing.md}}>{formState.error}</p>}
            {formState.success && <p style={{color: theme.colors.success, marginTop: theme.spacing.md}}>{formState.success}</p>}
        </form>
    </Card>
  );
};

export default IssueBookPage;
