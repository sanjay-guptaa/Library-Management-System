import React from 'react';
import { Link } from 'react-router-dom';
import { userService } from '@/services';
import { useEntity } from '@/hooks/useEntity';
import { User } from '@/types';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import {Badge} from '@/components/ui/Badge';

const UserListPage: React.FC = () => {
  const { data: users, loading, error } = useEntity<User[]>(userService);

  const headers = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'actions', label: 'Actions' },
  ];

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  const TdStyle: React.CSSProperties = {
    padding: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.lightGray}`,
    verticalAlign: 'middle',
  };

  const getRoleBadgeVariant = (role: string) => {
    switch(role) {
        case 'Admin': return 'danger';
        case 'Librarian': return 'warning';
        default: return 'default';
    }
  }

  const renderRow = (user: User) => (
    <tr key={user.userId} style={{backgroundColor: theme.colors.white}}>
      <td style={TdStyle}><strong>{user.name}</strong></td>
      <td style={TdStyle}>{user.email}</td>
      <td style={TdStyle}><Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge></td>
      <td style={TdStyle}>
        <Link to={`/users/${user.userId}`}><Button style={{padding: '4px 8px'}}>View Profile</Button></Link>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 style={theme.typography.h1}>User Management</h1>
      <p style={{...theme.typography.p, marginBottom: theme.spacing.lg}}>List of all registered library users.</p>
      <Table headers={headers} data={(users as User[]) || []} renderRow={renderRow} />
    </div>
  );
};

export default UserListPage;
