/* eslint-disable react/no-unescaped-entities */
import React, {useEffect, useState} from 'react';
import {Switch, Box, Button, Typography, Paper, TextField, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function InstagramStatic({}) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [staticType, setStaticType] = useState(true);

  const [info, setInfos] = useState({
    amount:0, sells:0, roas:0, mems:0, followers:0, folvalue:0,
    feed:{rich:0, richper:0, savings:0, per:0, eg:0},
    story:{inp:0, inpper:0, clicks:0, clickper:0, staf:0, stafper:0},
    ril:{rich:0, richper:0, savings:0, per:0, eg:0}
  });

  useEffect(() => {
    if (staticType === true) {

    }
  }, [staticType])

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
        <Typography className="text">手動</Typography>
        <Switch 
          checked={staticType}
          onChange={e=>setStaticType(e.target.checked)}
        />
        <Typography className="text">自動</Typography>
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
        <TextField 
          label="金額" 
          variant="standard" 
          size="small"
        />
        <TextField 
          label="売上" 
          variant="standard" 
          size="small"
        />
        <TextField 
          label="ROAS" 
          variant="standard" 
          size="small"
        />
        <TextField 
          label="人数" 
          variant="standard" 
          size="small"
        />
        <TextField 
          label="フォロワー数" 
          variant="standard" 
          size="small"
        />
        <TextField 
          label="フォロワー単価" 
          variant="standard" 
          size="small"
        />
      </Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className="label-container label-container-nested">
            <Typography className="text">フィード</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="value-container">
            <TextField 
              label="合計リーチ" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="平均リーチ%" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="合計保存" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="平均保存%" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="EG" 
              variant="standard" 
              size="small"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className="label-container label-container-nested">
            <Typography className="text">ストーリー</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="value-container">
            <TextField 
              label="合計インプ" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="平均インプ%" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="合計クリック" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="平均クリック%" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="合計スタンプ" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="平均スタンプ%" 
              variant="standard" 
              size="small"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className="label-container label-container-nested">
            <Typography className="text">りール</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="value-container">
            <TextField 
              label="合計リーチ" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="平均リーチ%" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="合計保存" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="平均保存%" 
              variant="standard" 
              size="small"
            />
            <TextField 
              label="EG" 
              variant="standard" 
              size="small"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};