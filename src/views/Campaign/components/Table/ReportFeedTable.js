import React, {useEffect, useState, useRef} from 'react';
import moment from 'moment'
import Box from '@mui/material/Box';
import {Menu, MenuItem, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Paper, Button, TextField } from '@mui/material';
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
    label: '保存数',
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
    id: 'engagerate',
    label: '通常EG%',
  },
  {
    id: 'prs',
    label: 'PREG%',
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

const ReportFeedRow = ({catType, row, updateDatas, classes}) => {
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

  const handleMenuClose = (type, memId, accId) => {
    switch (type) {
      case 'add':
        updateDatas(memId, 'add', 1);
        break;
      case 'del':
        updateDatas(memId, 'del', 1, accId);
        break;
      case 'cp':
        setAccountId(memId);
        break;
      case 'save':
        let detail = {
          postAt: postAtRef.current.value, postLink: postLinkRef.current.value, 
          shopping: shoppingRef.current.value,
          rich: richRef.current.value, saving: savingRef.current.value, 
          oks: oksRef.current.value, comment: commentRef.current.value, 
          sell: sellRef.current.value,
        };
        updateDatas(memId, 'update', 1, detail);
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  const postAtRef = useRef();
  const postLinkRef = useRef();
  const shoppingRef = useRef();
  const richRef = useRef();
  const richPerRef = useRef();
  const savingRef = useRef();
  const savingPerRef = useRef();
  const oksRef = useRef();
  const commentRef = useRef();
  const prsRef = useRef();
  const sellRef = useRef();
  const roasRef = useRef();

  useEffect(() => {
    if (!row)
      return;

    postAtRef.current.value = row.postAt ? row.postAt : '';
    postLinkRef.current.value = row.postLink ? row.postLink : '';
    shoppingRef.current.value = row.shopping ? row.shopping : '';
    richRef.current.value = row.rich ? row.rich : 0;
    savingRef.current.value = row.saving ? row.saving : 0;
    oksRef.current.value = row.oks ? row.oks : 0;
    commentRef.current.value = row.comment ? row.comment : 0;
    sellRef.current.value = row.sell ? row.sell : 0;

    savingPerRef.current.value = (!row.saving || !row.rich) ? 0 : (row.saving / row.rich * 100).toFixed(1);
    richPerRef.current.value = (!row.rich || !row.followers || row.followers === 0) ? 0 : (row.rich / row.followers * 100).toFixed(1);
    prsRef.current.value = (!row.oks || !row.rich || !row.comment || row.rich === 0) ? 0 : ((row.oks + row.comment)/ row.rich * 100).toFixed(1);
    roasRef.current.value = (!row.sell || !row.amount || row.amount === 0) ? 0 : (row.sell / row.amount * 100).toFixed(1);

    setPostDate(row.postAt ? row.postAt : null);
  }, [row]);

  const richValueChanged = (evt) => {
    let oksVal = parseInt(oksRef.current.value);
    let richVal = parseInt(richRef.current.value);
    let savingVal = parseInt(savingRef.current.value);
    let commentVal = parseInt(commentRef.current.value);

    if (isNaN(richVal))
      return;

    richPerRef.current.value = (!richVal || !row.followers || row.followers === 0) ? 0 : (richVal / row.followers * 100).toFixed(1);

    if (!isNaN(savingVal)) {
      savingPerRef.current.value = (!richVal) ? 0 : (savingVal / richVal * 100).toFixed(1);
    }

    if (!isNaN(commentVal) && !isNaN(oksVal)) {
      prsRef.current.value = (!richVal) ? 0 : ((commentVal + oksVal) / richVal * 100).toFixed(1); 
    }
  }

  const amountValueChanged = (evt) => {
    let amountVal = parseInt(row.amount);
    let sellVal = parseInt(sellRef.current.value);
    if (isNaN(amountVal) || isNaN(sellVal))
      return;

    roasRef.current.value = (!amountVal || !sellVal || sellVal === 0) ? 0 : (sellVal / amountVal * 100).toFixed(1);
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
        <TableCell className={classes.feedtableCell} sx={{minWidth: '100px'}}>
          {formatterInt.format(row.amount)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          {formatterInt.format(row.followers)}
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={richRef } onChange={richValueChanged} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputProps={{disabled: true}} inputRef={richPerRef} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={savingRef } onChange={richValueChanged} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputProps={{readOnly: true}} inputRef={savingPerRef} />
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={oksRef } onChange={richValueChanged} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={commentRef } onChange={richValueChanged} type="Number" sx={{width: '100px'}}/>
        </TableCell>
        <TableCell className={classes.feedtableCell}>{formatter.format(row.engagerate * 100)}</TableCell>
        <TableCell className={classes.feedtableCell}>
          <TextField className={classes.feedtableTextField} variant="outlined" inputRef={prsRef } type="Number" sx={{width: '100px'}}/>
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

export default function ReportFeedTable({catType, getDatas, updateDatas, classes, ...rest}) {
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
                <ReportFeedRow 
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