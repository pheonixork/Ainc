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
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {CP} from 'views/Common/CP';

const storyHeadCells = [
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
    id: 'inp',
    label: 'インプ',
  },
  {
    id: 'inpper',
    label: 'インプ%',
  },
  {
    id: 'click',
    label: 'クリック',
  },
  {
    id: 'clickper',
    label: 'クリック%',
  },
  {
    id: 'stamp',
    label: 'スタンプ',
  },
  {
    id: 'stampper',
    label: 'スタンプ%',
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

const ReportStoryRow = ({catType, row, updateDatas, classes}) => {
  const formatterInt = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0});
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpened = Boolean(anchorEl);

  const [selAccountId, setAccountId] = useState('');
  const closeCP = (val) => {
    setAccountId('');
  }

  const [postDate, setPostDate] = useState();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (type, memId, accId) => {
    switch (type) {
      case 'add':
        updateDatas(memId, 'add', 2);
        break;
      case 'del':
        updateDatas(memId, 'del', 2, accId);
        break;
      case 'cp':
        setAccountId(memId);
        break;
      case 'save':
        let detail = {
          postAt: postAtRef.current.value, postLink: postLinkRef.current.value, 
          shopping: shoppingRef.current.value, 
          inp: inpRef.current.value, click: clickRef.current.value, 
          stamp: stampRef.current.value, sell: sellRef.current.value,
        };
        updateDatas(memId, 'update', 2, detail);
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  const postAtRef = useRef();
  const postLinkRef = useRef();
  const shoppingRef = useRef();
  const inpRef = useRef();
  const clickRef = useRef();
  const stampRef = useRef();
  const sellRef = useRef();
  const roasRef = useRef();
  const inpPerRef = useRef();
  const clickPerRef = useRef();
  const stampPerRef = useRef();

  const inpValueChanged = (evt) => {
    let inpVal = parseInt(evt.target.value);
    if (!row.followers || isNaN(inpVal) || row.followers === 0)
      return;

    inpPerRef.current.value = (inpVal / row.followers * 100).toFixed(1);
  }

  const clickValueChanged = (evt) => {
    let clickVal = parseInt(evt.target.value);
    if (!row.followers || isNaN(clickVal) || row.followers === 0)
      return;

    clickPerRef.current.value = (clickVal / row.followers * 100).toFixed(1);
  }

  const stampValueChanged = (evt) => {
    let stampVal = parseInt(evt.target.value);
    if (!row.followers || isNaN(stampVal) || row.followers === 0)
      return;

    stampPerRef.current.value = (stampVal / row.followers * 100).toFixed(1);
  }

  const amountValueChanged = (evt) => {
    let amountVal = parseInt(row.amount);
    let sellVal = parseInt(sellRef.current.value);
    if (isNaN(amountVal) || isNaN(sellVal))
      return;

    roasRef.current.value = (!amountVal || !sellVal || sellVal === 0) ? 0 : (sellVal / amountVal * 100).toFixed(1);
  }

  useEffect(() => {
    if (!row)
      return;

    postAtRef.current.value = row.postAt ? row.postAt : '';
    postLinkRef.current.value = row.postLink ? row.postLink : '';
    shoppingRef.current.value = row.shopping ? row.shopping : '';
    inpRef.current.value = row.inp ? row.inp : 0;
    clickRef.current.value = row.click ? row.click : 0;
    stampRef.current.value = row.stamp ? row.stamp : 0;
    sellRef.current.value = row.sell ? row.sell : 0;

    inpPerRef.current.value = (!row.inp || !row.followers || row.followers === 0) ? 0 : (row.inp / row.followers * 100).toFixed(1);
    clickPerRef.current.value = (!row.click || !row.followers || row.followers === 0) ? 0 : (row.click / row.followers * 100).toFixed(1);
    stampPerRef.current.value = (!row.stamp || !row.followers || row.followers === 0) ? 0 : (row.stamp / row.followers * 100).toFixed(1);
    roasRef.current.value = (!row.sell || !row.amount || row.amount === 0) ? 0 : (row.sell / row.amount * 100).toFixed(1);

    setPostDate(row.postAt ? row.postAt : null);
  }, [row]);

  return (
    <>
      <TableRow>
        <TableCell className={classes.feedtableCell} sx={{minWidth: '150px'}}>{row.name}</TableCell>
        <TableCell className={classes.feedtableCell} sx={{minWidth: '120px'}}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              value={postDate}
              onChange={(newValue) => setPostDate(newValue)}
              inputFormat={'yyyy/MM/dd'}
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  className={classes.feedtableTextField} 
                  variant="outlined" 
                  inputRef={postAtRef}
                />
              }
            />
          </LocalizationProvider>
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{minWidth: '180px'}}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={postLinkRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{minWidth: '150px'}}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={shoppingRef } />
        </TableCell>
        <TableCell className={classes.feedtableCell} sx={{minWidth: '100px'}}>{formatterInt.format(row.amount)}</TableCell>
        <TableCell className={classes.feedtableCell}>{formatterInt.format(row.followers)}</TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={inpRef } onChange={inpValueChanged} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputProps={{disabled: true}} inputRef={inpPerRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={clickRef } onChange={clickValueChanged} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputProps={{readOnly: true}} inputRef={clickPerRef}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={stampRef } onChange={stampValueChanged} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputProps={{readOnly: true}} inputRef={stampPerRef} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={sellRef } onChange={amountValueChanged} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={roasRef } type="Number" sx={{width: '100px'}}/>
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
            <MenuItem onClick={e=>handleMenuClose('add', row._id)}>追加</MenuItem>
            <MenuItem onClick={e=>handleMenuClose('del', row._id, row.accountId)}>削除</MenuItem>
            <MenuItem onClick={e=>handleMenuClose('cp', row.accountId)}>CP</MenuItem>
            <MenuItem onClick={e=>handleMenuClose('save', row._id)}>保存</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <CP 
        accountId={selAccountId} 
        setCollapse={closeCP}
      />
    </>
  )
}

export default function ReportStoryTable({catType, getDatas, updateDatas, classes, ...rest}) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    let data = getDatas();
    if (!data)
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
                {storyHeadCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    padding='normal'
                    align="left"
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
                <ReportStoryRow 
                  key={index} 
                  row={row} 
                  catType={catType}
                  updateDatas={updateDatas}
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