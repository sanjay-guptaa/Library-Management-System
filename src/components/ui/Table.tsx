import React from 'react';
import { theme } from '@/constants/theme';

interface Header {
  key: string;
  label: string;
}

interface Props {
  headers: Header[];
  data: Record<string, any>[];
  renderRow: (item: Record<string, any>) => React.ReactNode;
}

export const Table: React.FC<Props> = ({ headers, data, renderRow }) => {
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: theme.shadows.sm,
    borderRadius: theme.borderRadius,
    overflow: 'hidden',
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: theme.spacing.md,
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    letterSpacing: '0.5px'
  };

  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header.key} style={thStyle}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => renderRow(item) || null)}
      </tbody>
    </table>
  );
};
