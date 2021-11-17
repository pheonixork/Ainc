/* eslint-disable react/no-unescaped-entities */
import clsx from 'clsx';
import React, {useEffect, useRef, useState} from 'react';
import {Skeleton, Switch, Box, Button, Typography, Paper, TextField, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {AlertDlg} from 'views/Common';

const PurpleSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#816BF7',
    '&:hover': {
      backgroundColor: alpha('#816BF7', 0.8),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#816BF7',
  },
}));

export default function TiktokStatic({isLoading, getDatas, classes}) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [staticType, setStaticType] = useState(true);
  const [showAlert, showAlertDlg] = useState(false);
  const [alertcaption, setAlertCaption] = useState('');

  const closeAlertDlg = (status) => {
    showAlertDlg(false);
    if (status === false) {
      return;
    }

    setStaticType(!staticType);
  }

  const switchCustomHandle = (val) => {
    if (staticType === false) {
      setAlertCaption('自動に切り替えると、\r\n今まで手動で入力されたものが全て自動で取得した数字に更新されます。\r\n本当によろしいでしょうか？');
      showAlertDlg(true);
      return;
    }

    setAlertCaption('手動に切り替えると、\r\nレポート数値の自動反映が現時点でストップします。\r\n本当によろしいでしょうか？');
    showAlertDlg(true);
  }
  // const [info, setInfos] = useState({
  //   amount:100, sells:0, roas:0, mems:0, followers:0, folvalue:0,
  //   feed:{mems: 0, rich:0, richper:0, savings:0, per:0, normal:0},
  //   story:{mems: 0, inp:0, inpper:0, clicks:0, clickper:0, staf:0, stafper:0},
  //   ril:{mems: 0, rich:0, richper:0, savings:0, per:0, normal:0}
  // });

  const amountRef = useRef();
  const sellRef = useRef();
  const roasRef = useRef();
  const memsRef = useRef();
  const recycleRef = useRef();
  const recycleVal = useRef();
  const prsRef = useRef();
  const sharePerRef = useRef();

  useEffect(() => {
    let tmp = getDatas();
    if (!tmp || tmp.length < 1)
      return;

    let amount = 0, sells = 0, recycle = 0, recyclevalue = 0;
    let normal = 0, share = 0, sharePer = 0, good = 0, registers = 0;
    let mems = tmp.length;

    if (staticType === true) {
      _.map(tmp, itm => {
        // amount += itm.amount ? parseInt(itm.amount) : 0;
        sells += itm.sell ? parseInt(itm.sell) : 0;
        recycle += itm.recycle ? parseInt(itm.recycle) : 0;
        normal += itm.normal ? parseInt(itm.normal) : 0;
        share += itm.share ? parseInt(itm.share) : 0;
        good += itm.good ? parseInt(itm.good) : 0;
        registers += itm.registers ? parseInt(itm.registers) : 0;
        sharePer += (!itm.share || !itm.recycle) ? 0 : (itm.share / itm.recycle) * 100;
      });

      amount = 0;
      let distinctMems = Array.from(new Set(tmp.map(x => x.accountId)))
        .map(id => {
          amount += parseInt(tmp.find(s => s.accountId === id).amount);
        });

      amountRef.current.value = amount;
      sellRef.current.value = sells;
      roasRef.current.value = amount > 0 && sells > 0 ? (sells / amount * 100).toFixed(1) : 0;
      memsRef.current.value = distinctMems.length;
      recycleRef.current.value = recycle;
      recycleVal.current.value = recyclevalue;
      prsRef.current.value = good > 0 && registers > 0 ? (good / registers * 100).toFixed(1) : 0;
      sharePerRef.current.value = mems > 0 ? (sharePer / mems).toFixed(1) : 0;
    }
  }, [staticType, getDatas]);

  return (
    <Paper
      className="detail-section"
      sx={{
        padding: '10px 0',
        position: 'relative'
      }}
    >
      <Button 
        className="active"
        variant="contained"
        sx={{position: 'absolute', right: 20, top: 20}}
      >
        ダウンロード
      </Button>
      <Box sx={{
        display: 'flex', position: 'absolute', right: 20, top: 50, alignItems: 'center', marginTop: '10px'}}
      >
        <Typography className={clsx("text", !staticType ? "auto-manual-caption" : "")}>手動</Typography>
        <PurpleSwitch 
          checked={staticType}
          onChange={e=>setStaticType(e.target.checked)}
        />
        <Typography className={clsx("text", staticType ? "auto-manual-caption" : "")}>自動</Typography>
      </Box>
      <Box className="label-container">
        <Typography className="text">計測期間</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="開始日"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            inputFormat={'yyyy/MM/dd'}
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileDatePicker
            label="終了日"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            inputFormat={'yyyy/MM/dd'}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box className="value-container">
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>金額</Typography>
            <TextField variant="standard" size="small" 
              inputProps={{readOnly: staticType}} inputRef={amountRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>売上</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={sellRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>ROAS</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={roasRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>人数</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={memsRef}/>
          </Box>
        )}
      </Box>
      <Box className="value-container">
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>合計再生回数</Typography>
            <TextField variant="standard" size="small" 
              inputProps={{readOnly: staticType}} inputRef={recycleRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>再生単価</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={recycleVal}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>平均EG</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={prsRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>平均シェア率</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={sharePerRef}/>
          </Box>
        )}
      </Box>
      <AlertDlg 
        title={'注意'} 
        caption={alertcaption}
        dlgState={showAlert}
        closeDlg={closeAlertDlg}
      />
    </Paper>
  );
};