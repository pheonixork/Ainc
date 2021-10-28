/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Switch, Box, Button, Typography, Rating, Paper, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { memberList } from 'mockup/campain_list';
import { ReportTabs, ReportTabSelect } from './ReportTabs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ReportItem = ({row, index, handlePostItemClick}) => {
  const [curType, onSelect] = useState();
  
  const handleSelect = (newType) => {
    handlePostItemClick(index, newType);
    onSelect(newType);
  }

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px 0",
        marginTop: "10px",
      }}              
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginLeft="20px"
      >
        <Box
          component={LazyLoadImage}
          effect="blur"
          src={'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D'}
          height={'3rem'}
          width={'3rem'}
          sx={{margin:'0.5rem', borderRadius:'50%'}}
        />        
      </Box>
      <Box marginLeft="20px">
        <Typography>{row.id}</Typography>
      </Box>
      <Box 
        sx={{
          flex: 'auto',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <ReportTabSelect curType={curType} onSelect={handleSelect}/>
      </Box>
    </Paper>
  )
};

const ReportPage = ({selCampId}) => {
  const [ isCollapse, setCollapse ] = useState(true);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selType, onSelect] = useState('feed');
  const [members, setMembers] = useState(memberList);

  const handleSelectChanged = (index) => {
    setInfluencerCollapsable(false);
    setInfluencerIndex(index);
  };

  const handleCPClicked = (index) => {
    setCollapse(false);
  };

  const handlePostItemClick = (index, status) => {
    if (status === 'feed')
      members[index].status = 1;
    if (status === 'story')
      members[index].status = 2;
    if (status === 'rir')
      members[index].status = 3;
    setMembers([...members]);
    console.log(members);
  }

  return (
    <Box className='report-page'>
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
          sx={{
            position: 'absolute',
            right: 20,
            top: 20
          }}
        >ダウンロード</Button>
        <Box 
          sx={{
            display: 'flex',
            position: 'absolute',
            right: 20,
            top: 50,
            alignItems: 'center',
            marginTop: '10px'
          }}
        >
          <Typography className="text">手動</Typography>
          <Switch defaultChecked />
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
            variant="outlined" 
            size="small"
          />
          <TextField 
            label="売上" 
            variant="outlined" 
            size="small"
          />
          <TextField 
            label="ROAS" 
            variant="outlined" 
            size="small"
          />
          <TextField 
            label="人数" 
            variant="outlined" 
            size="small"
          />
          <TextField 
            label="フォロワー数" 
            variant="outlined" 
            size="small"
          />
          <TextField 
            label="フォロワー単価" 
            variant="outlined" 
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
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="平均リーチ%" 
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="合計保存" 
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="平均保存%" 
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="EG" 
                variant="outlined" 
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
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="平均インプ%" 
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="合計クリック" 
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="平均クリック%" 
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="合計スタンプ" 
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="平均スタンプ%" 
                variant="outlined" 
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
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="平均リーチ%" 
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="合計保存" 
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="平均保存%" 
                variant="outlined" 
                size="small"
              />
              <TextField 
                label="EG" 
                variant="outlined" 
                size="small"
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Box marginTop={4}>
        <ReportTabSelect curType={selType} onSelect={onSelect}/>
      </Box>
      <Box marginTop={4}>
        <ReportTabs members={members} curType={selType} />
      </Box>
      <Box marginTop={4}>
        {members.map((row, index) => {
          if (row.status === 0) {
            return (
              <ReportItem key={index} row={row} index={index} handlePostItemClick={handlePostItemClick}/>
            )
          }          
        })}
      </Box>
    </Box>
  );
};

export default ReportPage;
