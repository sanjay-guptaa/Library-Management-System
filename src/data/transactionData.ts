import { Transaction } from '@/types';

const today = new Date();
const daysAgo = (days: number) => new Date(today.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
const daysFromNow = (days: number) => new Date(today.getTime() + days * 24 * 60 * 60 * 1000).toISOString();

export const transactions: Transaction[] = [
    {
        transactionId: 1001, userId: 3, isbn: '978-0132350884',
        issueDate: daysAgo(20), dueDate: daysAgo(5), // Overdue
        returnDate: null, fineAmount: 0
    },
    {
        transactionId: 1002, userId: 4, isbn: '978-0201633610',
        issueDate: daysAgo(10), dueDate: daysFromNow(5), // Not due yet
        returnDate: null, fineAmount: 0 
    },
    {
        transactionId: 1003, userId: 5, isbn: '978-0262033848',
        issueDate: daysAgo(5), dueDate: daysFromNow(10), // Not due yet
        returnDate: null, fineAmount: 0 
    },
    {
        transactionId: 1004, userId: 3, isbn: '978-0321765723',
        issueDate: daysAgo(40), dueDate: daysAgo(25),
        returnDate: daysAgo(24), fineAmount: 5.00  // Returned, with fine
    },
    {
        transactionId: 1005, userId: 4, isbn: '978-1491904244',
        issueDate: daysAgo(8), dueDate: daysFromNow(7),
        returnDate: daysAgo(1), fineAmount: 0 // Returned, no fine
    },
];

