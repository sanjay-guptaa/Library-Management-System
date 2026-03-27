export type UserRole = 'Librarian' | 'Admin' | 'Member';

export interface User {
    userId: number;
    name: string;
    email: string;
    passwordHash: string; // Should be handled securely on a real backend
    role: UserRole;
}
