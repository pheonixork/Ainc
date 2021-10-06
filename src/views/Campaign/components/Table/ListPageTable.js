import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getComparator, stableSort } from 'libs/commonFunc'
import { ListPageTableHead } from '.';
import FltSingleSelect from '../FltSingleSelect';
import Rating from '../Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const statusValues = [
  '社内確認中',
  'インフルエンサー交渉中',
  'NG',
  'OK'
]

export default function ListPageTable({ headCells, data, handleSelectChanged }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState(-1);
  const [visible, setVisible] = React.useState(new Array(data.length).fill(0));
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (index) => {
    setSelected(index);
    handleSelectChanged(index);    
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* '0 0px 6px 0 rgb(140 152 164 / 53%)' */}
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
                    <TableRow
                      hover
                      onClick={() => handleClick(index)}
                      tabIndex={-1}
                      key={index}
                      selected={selected === index}
                    >
                      <TableCell align="center">
                        <Box
                          component={LazyLoadImage}
                          effect="blur"
                          src={'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D'}
                          height={'3.125rem'}
                          width={'3.125rem'}
                          sx={{margin:'1rem', borderRadius:'50%'}}
                        />
                        <Rating rating={row.star}/>
                      </TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.followers}</TableCell>
                      <TableCell align="center">{row.eg}</TableCell>
                      <TableCell align="center" style={{ width: '250px' }}>
                        <Button
                          variant={'outlined'}
                          style={{ padding: '0 30px' }}
                        >
                          CP
                        </Button>
                      </TableCell>
                      <TableCell align="center" style={{ width: '250px' }}>
                        <FltSingleSelect 
                          tip=''
                          icon={false} 
                          values={statusValues}
                          style={{ width: '250px', marginLeft: 'auto' }}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}