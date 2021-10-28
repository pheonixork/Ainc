import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { Table, TableBody, TableContainer, Paper } from '@mui/material';
import { getComparator, stableSort } from 'libs/commonFunc'
import { ListPageTableHead, PostPageTableRow } from '.';

const headCells = [
  {
    id: 'star',
    numeric: true,
    label: '',
    align: 'center'
  },
  {
    id: 'id',
    numeric: true,
    label: 'アカウント名',
    align: 'left'
  },
  {
    id: 'followers',
    numeric: true,
    label: 'フォロワー数',
    align: 'left'
  },
  {
    id: 'eg',
    numeric: true,
    label: 'EG',
    align: 'left'
  },
  {
    id: 'price',
    numeric: true,
    label: '金額',
    align: 'center'
  },
  {
    id: 'status',
    numeric: true,
    label: 'ステータス',
    align: 'center'
  },
  {
    id: 'action',
    numeric: true,
    label: '',
    align: 'center'
  },
];

export default function PostPageTable({data, handleSaveMember}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mt: 2, mb: 2, overflow: 'auto', boxShadow: 'none !important' }}>
        <TableContainer style={{ padding: 10 }}>
          <Table
            className="styledTable"
            sx={{ minWidth: '100%' }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <ListPageTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .map((row, index) => {
                  return (
                    <PostPageTableRow 
                      key={index}
                      data={row} 
                      index={index}
                      handleSaveMember={handleSaveMember}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}