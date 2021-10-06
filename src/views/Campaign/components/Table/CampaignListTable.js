import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomTableHead from './CustomTableHead';
import { getComparator, stableSort } from 'libs/commonFunc'

export default function CampaignListTable({ headCells, data, handleSelectChanged }) {
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

  const handleClickVisible = (index) => {
    visible[index] = 1 - visible[index];
    setVisible([...visible]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* '0 0px 6px 0 rgb(140 152 164 / 53%)' */}
      <Paper sx={{ width: '100%', mt: 2, mb: 2, overflow: 'auto', boxShadow: 'none !important' }}>
        <TableContainer style={{ padding: 10 }}>
          <Table
            className="styledTable"
            sx={{ minWidth: 1350 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <CustomTableHead
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
                      <TableCell
                        //scope="row"
                        align="left"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.sns}</TableCell>
                      <TableCell align="left">{row.genre}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.members}</TableCell>
                      <TableCell align="right">{row.createdDate}</TableCell>
                      <TableCell align="right">{row.endDate}</TableCell>
                      <TableCell align="right">{row.numberOfReach}</TableCell>
                      <TableCell align="right">{row.percentOfReach}</TableCell>
                      <TableCell align="right">{row.earnings}</TableCell>
                      <TableCell align="right">{row.roas}</TableCell>
                      <TableCell align="right">
                        <Button
                          component={'a'}
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={(e) => {e.stopPropagation(); handleClickVisible(index)}}
                        >
                          { visible[index] > 0 ? '非表示' : '表示' }
                        </Button>
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