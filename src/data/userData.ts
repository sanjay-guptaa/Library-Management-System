import { User } from '@/types';

export const users: User[] = [
    { userId: 1, name: 'Alice Johnson', email: 'alice@example.com', passwordHash: 'hash123', role: 'Librarian' },
    { userId: 2, name: 'Bob Williams', email: 'bob@example.com', passwordHash: 'hash456', role: 'Admin' },
    { userId: 3, name: 'Charlie Brown', email: 'charlie@example.com', passwordHash: 'hash789', role: 'Member' },
    { userId: 4, name: 'Diana Prince', email: 'diana@example.com', passwordHash: 'hash101', role: 'Member' },
    { userId: 5, name: 'Ethan Hunt', email: 'ethan@example.com', passwordHash: 'hash112', role: 'Member' },
];
