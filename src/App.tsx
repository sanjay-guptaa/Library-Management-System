import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout';
import HomePage from '@/pages/HomePage';
import DashboardPage from '@/pages/DashboardPage';
import BookListPage from '@/pages/BookListPage';
import BookDetailPage from '@/pages/BookDetailPage';
import UserListPage from '@/pages/UserListPage';
import UserDetailPage from '@/pages/UserDetailPage';
import TransactionListPage from '@/pages/TransactionListPage';
import TransactionDetailPage from '@/pages/TransactionDetailPage';
import IssueBookPage from '@/pages/IssueBookPage';
import NotFoundPage from '@/pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          
          <Route path="books" element={<BookListPage />} />
          <Route path="books/:isbn" element={<BookDetailPage />} />
          
          <Route path="users" element={<UserListPage />} />
          <Route path="users/:userId" element={<UserDetailPage />} />

          <Route path="transactions" element={<TransactionListPage />} />
          <Route path="transactions/:transactionId" element={<TransactionDetailPage />} />
          <Route path="transactions/new" element={<IssueBookPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
