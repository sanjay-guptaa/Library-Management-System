interface NavLink {
  path: string;
  label: string;
}

export const navLinks: NavLink[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
  },
  {
    path: '/books',
    label: 'Books',
  },
  {
    path: '/users',
    label: 'Users',
  },
  {
    path: '/transactions',
    label: 'Transactions',
  },
];
