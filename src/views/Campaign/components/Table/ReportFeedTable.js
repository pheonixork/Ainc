import React, {useEffect, useState, useRef} from 'react';
import moment from 'moment'
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
import {useMainContext} from 'context/MainContext';
import {CP} from 'views/Common/CP';

const feedHeadCells = [
  {
    id: 'name',
    label: 'アカウント名'
  },
  {
    id: 'postAt',
    label: '投稿日',
  },
  {
    id: 'postLink',
    label: '投稿URL',
  },
  {
    id: 'shopping',
    label: '商品名',
  },
  {
    id: 'amount',
    label: '金額',
  },
  {
    id: 'followers',
    label: 'フォロワー数',
  },
  {
    id: 'rich',
    label: 'リーチ数',
  },
  {
    id: 'percentOfReach',
    label: 'リーチ%',
  },
  {
    id: 'saving',
    label: '保存',
  },
  {
    id: 'savePercent',
    label: '保存%',
  },
  {
    id: 'oks',
    label: 'いいね数',
  },
  {
    id: 'comment',
    label: 'コメント数',
  },
  {
    id: 'normal',
    label: '通常/EG',
  },
  {
    id: 'prs',
    label: 'PR/EG',
  },
  {
    id: 'sell',
    label: '売上',
  },
  {
    id: 'roas',
    label: 'ROAS',
  }
];

const ReportFeedRow = ({row, classes}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpened = Boolean(anchorEl);

  const [selAccountId, setAccountId] = useState('');
  const {setInfluencerCollapsable, setInfluencerIndex} = useMainContext();
  const handleSelectChanged = (index) => {
    setInfluencerCollapsable(false);
    setInfluencerIndex(index);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (type) => {
    switch (type) {
      case 'add':
        break;
      case 'del':
        break;
      case 'cp':
        break;
      case 'save':
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  const postAtRef = useRef();

  return (
    <>
      <TableRow>
        <TableCell className={classes.feedtableCell}>{row.name}</TableCell>
        <TableCell className={classes.feedtableCell} sx={{minWidth: '120px'}}>
          <TextField className={classes.feedtableTextField} defaultValue={row.postAt} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{minWidth: '180px'}}>
          <TextField className={classes.feedtableTextField} defaultValue={row.postLink} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{minWidth: '150px'}}>
          <TextField className={classes.feedtableTextField} defaultValue={row.shopping} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{minWidth: '100px'}}>
          <TextField className={classes.feedtableTextField} defaultValue={row.amount} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} defaultValue={row.followers} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} defaultValue={row.rich} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} value={row.followers === 0 ? '0%' : ((row.rich / row.followers * 100).toFixed(1) + '%')} variant="outlined" inputProps={{disabled: true}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} defaultValue={row.saving} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} value={row.followers === 0 ? '0%' : ((row.saving / row.followers * 100).toFixed(1) + '%')} variant="outlined" inputProps={{readOnly: true}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} defaultValue={row.oks} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} defaultValue={row.comment} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} defaultValue={row.normal} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} defaultValue={row.prs} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} defaultValue={row.sell} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} defaultValue={row.roas} variant="outlined" inputRef={postAtRef} />
        </TableCell>
        <TableCell align="center" className={classes.feedtableCell}>
          <Button aria-haspopup="true" onClick={handleMenuClick} className="active">...</Button>
          <Menu
            anchorEl={anchorEl}
            open={menuOpened}
            onClose={e=>handleMenuClose('')}
            sx={{
              boxShadow: '0 3px 6px 0 rgb(140 152 164 / 25%)'
            }}
          >
            <MenuItem onClick={e=>handleMenuClose('add')}>追加</MenuItem>
            <MenuItem onClick={e=>handleMenuClose('del')}>削除</MenuItem>
            <MenuItem onClick={e=>handleMenuClose('cp')}>CP</MenuItem>
            <MenuItem onClick={e=>handleMenuClose('save')}>SAVE</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <CP accountId={selAccountId} setCollapse={setAccountId}/>
    </>
  )
}

export default function ReportFeedTable({getDatas, classes, ...rest}) {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    let data = getDatas();
    if (data.length < 1)
      return;

    setData(data);
  }, [getDatas]);

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
                {feedHeadCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    padding='normal'
                    align="center"
                    sortDirection={orderBy === headCell.id ? order : false}
                    className={classes.feedtableCell}
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
              {data.map((row, index) => (
                <ReportFeedRow 
                  key={index} 
                  row={row} 
                  classes={classes}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}