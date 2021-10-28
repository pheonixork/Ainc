import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';

export default function ReportFeedTable({ headCells, data, status, ...rest }) {
  const [selected, setSelected] = useState(-1);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpened = Boolean(anchorEl);

  const handleClick = (index) => {
    setSelected(index);
    //handleSelectChanged(index);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: '100%' }} {...rest}>
      <Paper sx={{ width: '140%', mt: 2, mb: 2, overflow: 'auto', padding: 1 }}>
        <TableContainer style={{ padding: 10 }}>
          <Table
            className="styledTable"
            sx={{ minWidth: 1350 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    padding='normal'
                    align="center"
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={e=>handleRequestSort(headCell.id)}
                      sx={{ fontWeight: 'bold', whiteSpace: 'pre' }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.filter((n) => (n.status == status)).map((row, index) => {
                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(index)}
                    tabIndex={-1}
                    key={index}
                    selected={selected === index}
                  >
                    {headCells.map((item, index) => {
                      return (
                        <TableCell align="right" sx={{ padding: '8px', minWidth: '100px'}}>
                          <TextField 
                            value={row[item.id]}
                            variant="outlined" 
                            size="small"
                            sx={{
                              '& input': {
                                textAlign: 'right'
                              }                              
                            }}
                          />
                        </TableCell>
                      )
                    })}
                    <TableCell align="center">
                      <Button
                        aria-haspopup="true"
                        onClick={handleMenuClick}
                        className="active"
                      >
                        ...
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={menuOpened}
                        onClose={handleMenuClose}
                        sx={{
                          boxShadow: '0 3px 6px 0 rgb(140 152 164 / 25%)'
                        }}
                      >
                        <MenuItem onClick={handleMenuClose}>追加</MenuItem>
                        <MenuItem onClick={handleMenuClose}>削除</MenuItem>
                        <MenuItem onClick={handleMenuClose}>CP</MenuItem>
                        <MenuItem onClick={handleMenuClose}>SAVE</MenuItem>
                      </Menu>
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