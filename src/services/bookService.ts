import { Book } from '@/types';
import { books as mockBooks } from '@/data';

// In-memory data store
let books: Book[] = [...mockBooks];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const bookService = {
  async getAll(query?: string): Promise<Book[]> {
    await delay(100);
    let results = [...books];
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      results = results.filter(
        book => 
          book.title.toLowerCase().includes(lowercasedQuery) || 
          book.author.toLowerCase().includes(lowercasedQuery) ||
          book.isbn.toLowerCase().includes(lowercasedQuery)
      );
    }
    return results;
  },

  async getById(isbn: string): Promise<Book | undefined> {
    await delay(100);
    return books.find(book => book.isbn === isbn);
  },

  async create(newBook: Omit<Book, 'isAvailable'>): Promise<Book> {
    await delay(100);
    const book: Book = {
      ...newBook,
      isAvailable: true,
    };
    books.push(book);
    return book;
  },

  async update(isbn: string, updatedData: Partial<Book>): Promise<Book | null> {
    await delay(100);
    const bookIndex = books.findIndex(book => book.isbn === isbn);
    if (bookIndex === -1) return null;
    books[bookIndex] = { ...books[bookIndex], ...updatedData };
    console.log(`Book status updated: ${books[bookIndex].title} is now ${books[bookIndex].isAvailable ? 'available' : 'unavailable'}`);
    return books[bookIndex];
  },

  async delete(isbn: string): Promise<boolean> {
    await delay(100);
    const initialLength = books.length;
    books = books.filter(book => book.isbn !== isbn);
    return books.length < initialLength;
  },
};
