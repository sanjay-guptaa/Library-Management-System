import { Transaction, TransactionWithDetails } from '@/types';
import { transactions as mockTransactions } from '@/data';
import { userService } from './userService';
import { bookService } from './bookService';
import { isOverdue } from '@/utils/validators';

let transactions: Transaction[] = [...mockTransactions];
const FINE_PER_DAY = 0.50;

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function enrichTransaction(transaction: Transaction): Promise<TransactionWithDetails> {
    const [user, book] = await Promise.all([
        userService.getById(transaction.userId),
        bookService.getById(transaction.isbn)
    ]);
    if(!user || !book) {
        throw new Error('Associated user or book not found for transaction ' + transaction.transactionId);
    }
    return { ...transaction, user, book };
}

export const transactionService = {
  async getAll(): Promise<TransactionWithDetails[]> {
    await delay(150);
    return Promise.all(transactions.map(enrichTransaction));
  },

  async getById(id: number): Promise<TransactionWithDetails | undefined> {
    await delay(100);
    const transaction = transactions.find(t => t.transactionId === id);
    return transaction ? enrichTransaction(transaction) : undefined;
  },
  
  async getByUserId(userId: number): Promise<TransactionWithDetails[]> {
    await delay(150);
    const userTransactions = transactions.filter(t => t.userId === userId);
    return Promise.all(userTransactions.map(enrichTransaction));
  },

  async issueBook({ userId, isbn }: { userId: number, isbn: string }): Promise<Transaction> {
    await delay(200);
    const user = await userService.getById(userId);
    const book = await bookService.getById(isbn);

    if(!user) throw new Error('User eligibility check failed: User not found.');
    if(!book) throw new Error('Book availability check failed: Book not found.');
    if(!book.isAvailable) throw new Error('Book is not available.');

    await bookService.update(isbn, { isAvailable: false });
    
    const newTransaction: Transaction = {
        transactionId: Math.max(0, ...transactions.map(t => t.transactionId)) + 1,
        userId,
        isbn,
        issueDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
        returnDate: null,
        fineAmount: 0
    };
    transactions.push(newTransaction);
    
    // Simulate notification from Class Diagram
    console.log(`NotificationService: Sent alert to User ID ${userId} about book issue: '${book.title}'.`);

    return newTransaction;
  },

  async returnBook(transactionId: number): Promise<Transaction> {
    await delay(200);
    const transactionIndex = transactions.findIndex(t => t.transactionId === transactionId);
    if (transactionIndex === -1) throw new Error('Transaction not found');
    
    const transaction = transactions[transactionIndex];
    if(transaction.returnDate) throw new Error('Book has already been returned.');

    let fine = 0;
    if(isOverdue(transaction.dueDate)){ // Activity Diagram Step: Is book overdue?
        const dueDate = new Date(transaction.dueDate);
        const today = new Date();
        const daysLate = Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
        fine = daysLate * FINE_PER_DAY; // Activity Diagram Step: Calculate Fine
    }

    const updatedTransaction: Transaction = {
        ...transaction,
        returnDate: new Date().toISOString(),
        fineAmount: fine,
    };

    transactions[transactionIndex] = updatedTransaction;

    await bookService.update(transaction.isbn, { isAvailable: true }); // Activity Diagram Step: Update Book Status

    // Simulate notification from Activity Diagram
    console.log(`NotificationService: Sent return confirmation to User ID ${transaction.userId}. Fine: $${fine.toFixed(2)}.`);
    
    return updatedTransaction;
  },
};
