import clsx from 'clsx';
import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Box, Button, Paper, Typography} from '@mui/material';
import {planService} from 'services';
import HistoryDlg from './HistoryDlg';

const strPeriod = ['2週間', '単月', '1年', 'カスタム'];
const strPay = ['-', 'クレジットカード', 'カスタム'];
const strStatus = ['開始', '継続', '終了'];

const History = ({getDatas, getHistory, isreload, setDone, classes}) => {
  const [userInfo, setUserInfo] = useState({});
  const [history, setHistory] = useState(getHistory());
  const [showDlg, setShowStatus] = useState(false);
  const [selected, setSelected] = useState(null);

  const closeDlg = () => {
    setShowStatus(false);
  }

  const saveHistory = (data) => {
    return planService.saveCustomHistory(
      userInfo._id, data, 
    )
    .then((response) => {
      setHistory([...history, 
        {
          _id: response.data, 
          historydate: data.historyDate,
          periodtype: data.period,
          status: data.status,
          paytype: data.pay,
          memo: 'A操作',
          plantype: 'カスタム'
        }
      ])
    });
  }

  useEffect(() => {
    setUserInfo({...getDatas()});
  }, [getDatas]);

  useEffect(() => {
    if (!isreload)
      return;

      return planService.getHistory(
        userInfo._id, 
      )
      .then((response) => {
        setHistory([...response.data]);
        setShowStatus(false);
      });
  }, [isreload]);

  return (
    <Paper className="user-wrapper user-padding-small" sx={{marginTop: '30px !important'}}>
      <Typography className={classes.userdetailwrappertitle}>履歴</Typography>
      <TableContainer style={{ padding: 10 }}>
        <Table
          className="styledTable"
          aria-labelledby="tableTitle"
        >
          <TableHead>
            <TableRow>
              <TableCell padding='normal'>日付</TableCell>
              <TableCell padding='normal'>金額</TableCell>
              <TableCell padding='normal'>期間</TableCell>
              <TableCell padding='normal'>詳細</TableCell>
              <TableCell padding='normal'>決済</TableCell>
              <TableCell padding='normal'>編考</TableCell>
              <TableCell padding='normal'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.length > 0 ? 
              (_.map(_.orderBy(history, ['_id'], ['desc']), (row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.historydate}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{strPeriod[row.periodtype]}</TableCell>
                  <TableCell>{strStatus[row.status]}</TableCell>
                  <TableCell>{strPay[row.paytype]}</TableCell>
                  <TableCell>{row.memo}</TableCell>
                  <TableCell>
                    {row.plantype === 'カスタム' &&
                      <Button onClick={e=>{setSelected(row), setShowStatus(true)}}>編集</Button>
                    }
                  </TableCell>
                </TableRow>
            ))) : 
            (
              <TableRow>
                <TableCell colSpan={7}>履歴がありません</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {userInfo.plantype === 'カスタム' && 
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Button className="active" onClick={e=>{setSelected(null), setShowStatus(true)}}>入力</Button>
        </Box>
      }
      <HistoryDlg 
        dlgState={showDlg} 
        closeDlg={closeDlg} 
        saveHistory={saveHistory} 
        selRow={selected}
      />
    </Paper>
  );
};

export default History;
