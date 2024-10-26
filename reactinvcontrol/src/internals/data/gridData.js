import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderSparklineCell(params) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

function renderStatus(status) {
  const colors = {
    Online: 'success',
    Offline: 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(params) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    maxWidth: 120,
  },
  { field: 'produto', headerName: 'Produto', flex: 1.5, minWidth: 200 },
  
  
  {
    field: 'quantidade',
    headerName: 'Quantidade',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    maxWidth: 170,
  },
  {
    field: 'editar',
    headerName: 'Editar',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    maxWidth: 170,
  },
];

export const rows = [
  {
    id: 1,
    produto:'cafe',
    quantidade: '30',
    editar: '(editar)',
  },
  {
    id: 2,
    produto:'cafe',
    quantidade: '12',
    editar: '(editar)',
  },
  {
    id: 3,
    produto:'cafe',
    quantidade: '41',
    editar: '(editar)',
  },
  {
    id: 4,
    produto:'cafe',
    quantidade: '42',
    editar: '(editar)',
  },
  {
    id: 5,
    produto:'cafe',
    quantidade: '23',
    editar: '(editar)',
  },
  {
    id: 6,
    produto:'cafe',
    quantidade: '220',
    editar: '(editar)',
  },
  {
    id: 7,
    produto:'cafe',
    quantidade: '123',
    editar: '(editar)',
  },
  {
    id: 8,
    produto:'cafe',
    quantidade: '41',
    editar: '(editar)',
  },
  {
    id: 9,
    produto:'cafe',
    quantidade: '41',
    editar: '(editar)',
  },
  {
    id: 10,
    produto:'cafe',
    quantidade: '81',
    editar: '(editar)',
  },
  {
    id: 11,
    produto:'cafe',
    quantidade: '314',
    editar: '(editar)',
  },
  {
    id: 12,
    produto:'cafe',
    quantidade: '320',
    editar: '(editar)',
  },
  {
    id: 13,
    produto:'cafe',
    quantidade: '2',
    editar: '(editar)',
  },
  {
    id: 14,
    produto:'cafe',
    quantidade: '4',
    editar: '(editar)',
  },
  {
    id: 15,
    produto:'cafe',
    quantidade: '55',
    editar: '(editar)',
  },
  {
    id: 16,
    produto:'cafe',
    quantidade: '278',
    editar: '(editar)',
  },
  {
    id: 17,
    produto:'cafe',
    quantidade: '322',
    editar: '(editar)',
  },
  {
    id: 18,
    produto:'cafe',
    quantidade: '21',
    editar: '(editar)',
  },
  {
    id: 19,
    produto:'cafe',
    quantidade: '87',
    editar: '(editar)',
  },
  {
    id: 20,
    produto:'cafe',
    quantidade: '277',
    editar: '(editar)',
  },
  {
    id: 21,
    produto:'cafe',
    quantidade: '777',
    editar: '(editar)',
  }
];
