import _ from 'lodash';
import React, {useState, useEffect} from 'react';
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
import Constants from 'constants/constants';

const headCells = [
  {
    id: 'name',
    numeric: false,
    label: 'キャンペーン名'
  },
  {
    id: 'genre',
    numeric: false,
    label: 'ジャンル',
  },
  {
    id: 'sns',
    numeric: false,
    label: 'SNS',
  },
  {
    id: 'price',
    numeric: true,
    label: '金額',
  },
  {
    id: 'members',
    numeric: true,
    label: '人数',
  },
  {
    id: 'createdDate',
    numeric: true,
    label: '作成日',
  },
  {
    id: 'endDate',
    numeric: true,
    label: '終了日',
  },
  {
    id: 'numberOfReach',
    numeric: true,
    label: 'リーチ数',
  },
  {
    id: 'percentOfReach',
    numeric: true,
    label: 'リーチ%',
  },
  {
    id: 'earnings',
    numeric: true,
    label: '売上',
  },
  {
    id: 'roas',
    numeric: true,
    label: 'ROAS',
  },
  {
    id: 'temp',
    numeric: true,
    label: ' ',
  }
];

export default function CampaignListTable({data, handleSelectChanged}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState('');
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    setVisible(new Array(data.length).fill(0));
  }, [data]);
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (rowId) => {
    setSelected(rowId);
    handleSelectChanged(rowId);    
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
              {data.length > 0 ? (
                stableSort(data, getComparator(order, orderBy))
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={() => handleClick(row.id)}
                        tabIndex={-1}
                        key={index}
                        selected={selected === row.id}
                      >
                        <TableCell
                          //scope="row"
                          align="left"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.genre}</TableCell>
                        <TableCell align="left">{_.get(Constants.snsTypes, row.sns)}</TableCell>
                        <TableCell align="right">{row.amount ?? row.amount}</TableCell>
                        <TableCell align="right">{row.mems ?? row.mems}</TableCell>
                        <TableCell align="center">{row.cdate ?? row.cdate}</TableCell>
                        <TableCell align="center">{row.edate ?? row.edate}</TableCell>
                        <TableCell align="right">{row.rich ?? row.rich}</TableCell>
                        <TableCell align="right">{row.richper ?? row.richper}</TableCell>
                        <TableCell align="right">{row.sell ?? row.sell}</TableCell>
                        <TableCell align="right">{row.roas ?? row.roas}</TableCell>
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
                  }))
                : (
                  <TableRow>
                    <TableCell colSpan={12}>検察結果がありません</TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}