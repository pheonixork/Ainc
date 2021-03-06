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
    id: 'registers',
    label: '登録者数',
  },
  {
    id: 'recycle',
    label: '平均再生',
  },
  {
    id: 'prs',
    label: 'PR再生',
  },
  {
    id: 'oks',
    label: 'いいね',
  },
  {
    id: 'comment',
    label: 'コメント数',
  },
  {
    id: 'normal',
    label: '通常EG%',
  },
  {
    id: 'prper',
    label: 'PREG%',
  },
  {
    id: 'share',
    label: 'シェア',
  },
  {
    id: 'shareper',
    label: 'シェア率',
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

const ReportTiktokRow = ({row, catType, updateDatas, classes}) => {
  const formatterInt = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0});
  const formatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2});
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

  const postAtRef = useRef();
  const postLinkRef = useRef();
  const shoppingRef = useRef();
  const oksRef = useRef();
  const prsRef = useRef();
  const commentRef = useRef();
  const shareRef = useRef();
  const sharePerRef = useRef();
  const prPerRef = useRef();
  const sellRef = useRef();
  const roasRef = useRef();

  const handleMenuClose = (type, memId, accId) => {
    switch (type) {
      case 'add':
        updateDatas(type, memId);
        break;
      case 'del':
        updateDatas(type, memId, accId);
        break;
      case 'cp':
        setAccountId(memId);
        break;
      case 'save':
        let detail = {
          postAt: postAtRef.current.value, postLink: postLinkRef.current.value, 
          shopping: shoppingRef.current.value, 
          prs: prsRef.current.value, oks: oksRef.current.value,
          comment: commentRef.current.value, share: shareRef.current.value, 
          sell: sellRef.current.value
        };
        updateDatas(type, memId, detail);
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!row)
      return;

    postAtRef.current.value = row.postAt ? row.postAt : '';
    postLinkRef.current.value = row.postLink ? row.postLink : '';
    shoppingRef.current.value = row.shopping ? row.shopping : '';
    prsRef.current.value = row.prs ? row.prs : 0;
    oksRef.current.value = row.oks ? row.oks : 0;
    commentRef.current.value = row.comment ? row.comment : 0;
    shareRef.current.value = row.share ? row.share : 0;
    sellRef.current.value = row.sell ? row.sell : 0;
    prPerRef.current.value = (!row.registers || !row.good || row.registers === 0) ? 0 : (row.good / row.registers * 100).toFixed(1);
    sharePerRef.current.value = (!row.share || !row.click || row.click === 0) ? 0 : (row.share / row.click * 100).toFixed(1);
    roasRef.current.value = (!row.amount || !row.sell || row.amount === 0) ? 0 : (row.sell / row.amount * 100).toFixed(1);

    setPostDate(row.postAt ? row.postAt : null);
  }, [row]);

  const amountValueChanged = (evt) => {
    let amountVal = parseInt(row.amount);
    let sellVal = parseInt(sellRef.current.value);
    if (isNaN(sellVal) || isNaN(amountVal))
      return;

    roasRef.current.value = (!amountVal || !sellVal || amountVal === 0) ? 0 : (sellVal / amountVal * 100).toFixed(1);
  }

  const shareValueChanged = (evt) => {
    let shareVal = parseInt(evt.target.value);
    if (!row.recycle || isNaN(shareVal) || row.recycle === 0)
      return;

    sharePerRef.current.value = (shareVal / row.recycle * 100).toFixed(1);
  }

  const okValueChanged = (evt) => {
    let okVal = parseInt(evt.target.value);
    if (!row.registers || isNaN(okVal) || row.registers === 0)
      return;

    prPerRef.current.value = (okVal / row.registers * 100).toFixed(1);
  }

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
        <TableCell className={classes.feedtableCell}>{formatterInt.format(row.registers)}</TableCell>
        <TableCell className={classes.feedtableCell}>{formatterInt.format(row.recycle)}</TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={prsRef } type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={oksRef } onChange={okValueChanged} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={commentRef } type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>{formatter.format(row.engagerate * 100)}</TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputProps={{disabled: true}} inputRef={prPerRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={shareRef } onChange={shareValueChanged} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputProps={{readOnly: true}} inputRef={sharePerRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={sellRef } onChange={amountValueChanged} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputProps={{readOnly: true}} inputRef={roasRef} />
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
            <MenuItem onClick={e=>handleMenuClose('save', row._id)}>SAVE</MenuItem>
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

export default function ReportTiktokTable({getDatas, catType, updateDatas, classes, ...rest}) {

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
                {feedHeadCells.map((headCell) => (
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
                <ReportTiktokRow 
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