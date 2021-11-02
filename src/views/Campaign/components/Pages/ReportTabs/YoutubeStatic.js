/* eslint-disable react/no-unescaped-entities */
import clsx from 'clsx';
import React, {useEffect, useRef, useState} from 'react';
import {Skeleton, Switch, Box, Button, Typography, Paper, TextField, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function InstagramStatic({isLoading, getDatas, classes}) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [staticType, setStaticType] = useState(true);

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
  const normalRef = useRef();
  const clickRef = useRef();
  const clickPerRef = useRef();
  const cvRef = useRef();
  const cvPerRef = useRef();

  useEffect(() => {
    let tmp = getDatas();
    if (!tmp || tmp.length < 1)
      return;

    let amount = 0, sells = 0, recycle = 0, recyclevalue = 0;
    let normal = 0, click = 0, clickPer = 0, cv = 0, cvPer = 0;
    let mems = tmp.length;

    if (staticType === true) {
      _.map(tmp, itm => {
        amount += itm.amount ? parseInt(itm.amount) : 0;
        sells += itm.sell ? parseInt(itm.sell) : 0;
        recycle += itm.recycle ? parseInt(itm.recycle) : 0;
        normal += itm.normal ? parseInt(itm.normal) : 0;
        click += itm.click ? parseInt(itm.click) : 0;
        clickPer += (!itm.click || !itm.recycle) ? 0 : (itm.click / itm.recycle) * 100;
        cv += itm.cv ? parseInt(itm.cv) : 0;
        cvPer += (!itm.cv || !itm.recycle) ? 0 : (itm.cv / itm.recycle) * 100;
      });

      amountRef.current.value = amount;
      sellRef.current.value = sells;
      roasRef.current.value = amount > 0 && sells > 0 ? (sells / amount * 100).toFixed(1) : 0;
      memsRef.current.value = mems;
      recycleRef.current.value = recycle;
      recycleVal.current.value = recyclevalue;
      normalRef.current.value = normal;
      clickRef.current.value = click;
      clickPerRef.current.value = mems > 0 ? (clickPer / mems).toFixed(1) : 0;
      cvRef.current.value = cv;
      cvPerRef.current.value = mems > 0 ? (cvPer / mems).toFixed(1) : 0;
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
        <Switch 
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
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileDatePicker
            label="終了日"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
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
      </Box>
      <Box className="value-container">
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>平均EG</Typography>
            <TextField variant="standard" size="small" 
              inputProps={{readOnly: staticType}} inputRef={normalRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>合計クリック</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={clickRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>クリック率</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={clickPerRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>合計CV</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={cvRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>平均CV率</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={cvPerRef}/>
          </Box>
        )}
      </Box>
    </Paper>
  );
};