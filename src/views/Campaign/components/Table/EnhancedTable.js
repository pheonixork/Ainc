import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EnhancedTableHead from './EnhancedTableHead';
import faker from 'faker';

const snsValues = ['Instagram', 'Youtube', 'TikTok'];
const genreValues = ['ファッション', 'ビューティー', 'グルメ', 'インテリア', '電化製品', '不動産', '動物', '旅行', '日用品', 'エンタメ', '旅行・ホテル', 'ゲーム', 'キッズ', '乗り物', 'アート(音楽・映画)', 'ビジネス', 'スポーツ・アクティブ', 'その他'];

function getDateString(date) {
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
}

const rows = [...Array(23)].map((_, index) => ({
  campaignName: faker.datatype.string(6),
  sns: snsValues[faker.datatype.number() % 3],
  genre: genreValues[faker.datatype.number() % 18],
  price: faker.datatype.number() % 100000 / 5,
  members: faker.datatype.number() % 10000,
  createdDate: getDateString(faker.date.past()),
  endDate: getDateString(faker.date.past()),
  numberOfReach: faker.datatype.number() % 1000,
  percentOfReach: faker.datatype.number() % 100,
  earnings: faker.datatype.number() % 1000000,
  roas: faker.datatype.number() % 1000,
}));

const headCells = [
  {
    id: 'campaignName',
    numeric: false,
    label: 'キャンペー\r\nン名'
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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState(-1);
  const [visible, setVisible] = React.useState(new Array(rows.length).fill(0));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (index) => {
    console.log(index);
    setSelected(index);
  };

  const handleClickVisible = (index) => {
    console.log("handleClickVisible");
    visible[index] = 1 - visible[index];
    setVisible([...visible]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mt: 2, mb: 2, overflow: 'auto', boxShadow: '0 0px 6px 0 rgb(140 152 164 / 53%)' }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 1350 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
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
                        {row.campaignName}
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