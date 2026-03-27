import { User } from '@/types';
import { users as mockUsers } from '@/data';

// In-memory data store
let users: User[] = [...mockUsers];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const userService = {
  async getAll(): Promise<User[]> {
    await delay(100);
    return [...users];
  },

  async getById(id: number): Promise<User | undefined> {
    await delay(100);
    return users.find(user => user.userId === id);
  },

  async create(newUser: Omit<User, 'userId'>): Promise<User> {
    await delay(100);
    const user: User = {
      ...newUser,
      userId: Math.max(...users.map(u => u.userId)) + 1,
    };
    users.push(user);
    return user;
  },

  async update(id: number, updatedData: Partial<User>): Promise<User | null> {
    await delay(100);
    const userIndex = users.findIndex(user => user.userId === id);
    if (userIndex === -1) return null;
    users[userIndex] = { ...users[userIndex], ...updatedData };
    return users[userIndex];
  },

  async delete(id: number): Promise<boolean> {
    await delay(100);
    const initialLength = users.length;
    users = users.filter(user => user.userId !== id);
    return users.length < initialLength;
  },
};
