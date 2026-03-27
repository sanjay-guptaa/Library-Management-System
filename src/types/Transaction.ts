import { User } from './User';
import { Book } from './Book';

export interface Transaction {
    transactionId: number;
    userId: number;
    isbn: string;
    issueDate: string; // ISO 8601 string format
    dueDate: string;   // ISO 8601 string format
    returnDate: string | null; // ISO 8601 string format or null
    fineAmount: number;
}

export interface TransactionWithDetails extends Omit<Transaction, 'userId' | 'isbn'> {
    user: User;
    book: Book;
}
