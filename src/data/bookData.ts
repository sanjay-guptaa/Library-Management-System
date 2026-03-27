import { Book } from '@/types';

export const books: Book[] = [
    { isbn: '978-0321765723', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', category: 'Programming', isAvailable: true },
    { isbn: '978-0132350884', title: 'Clean Code', author: 'Robert C. Martin', category: 'Software Engineering', isAvailable: false },
    { isbn: '978-1491904244', title: 'You Don\'t Know JS: Scope & Closures', author: 'Kyle Simpson', category: 'Programming', isAvailable: true },
    { isbn: '978-0596007126', title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', category: 'Programming', isAvailable: true },
    { isbn: '978-0201633610', title: 'Design Patterns', author: 'Erich Gamma', category: 'Software Design', isAvailable: false },
    { isbn: '978-1449331818', title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', category: 'Programming', isAvailable: true },
    { isbn: '978-0735619678', title: 'Code Complete', author: 'Steve McConnell', category: 'Software Engineering', isAvailable: true },
    { isbn: '978-0262033848', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', isAvailable: false },
];
