/* eslint-disable react/no-unescaped-entities */
import clsx from 'clsx';
import React, {useRef, useState} from 'react';
import {Box, Button, Paper, TextField, Typography} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {planService} from 'services';
import toast from 'react-hot-toast';

const UsageCustom = ({getDatas, classes}) => {
  const [userInfo, setUserInfo] = useState(getDatas());

  const searchRef = useRef();
  const profileRef = useRef();
  const reportRef = useRef();
  const csvRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const modeRef = useRef();
  const useSearchRef = useRef();
  const useProfileRef = useRef();
  const useReportRef = useRef();
  const useCsvRef = useRef();

  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const saveClicked = (e) => {
    if (searchRef.current.value === '' || searchRef.current.value === '0') {
      toast.error('検察数を入力してください。');
      searchRef.current.focus();
      return;
    }
    if (profileRef.current.value === '' || profileRef.current.value === '0') {
      toast.error('プロフィールを入力してください。');
      profileRef.current.focus();
      return;
    }
    if (reportRef.current.value === '' || reportRef.current.value === '0') {
      toast.error('レポートを入力してください。');
      reportRef.current.focus();
      return;
    }
    if (csvRef.current.value === '' || csvRef.current.value === '0') {
      toast.error('CSVを入力してください。');
      csvRef.current.focus();
      return;
    }
    if (startRef.current.value.trim() === '') {
      toast.error('プラン開始日を入力してください。');
      startRef.current.focus();
      return;
    }
    if (endRef.current.value.trim() === '') {
      toast.error('プラン終了日を入力してください。');
      endRef.current.focus();
      return;
    }

    return planService.switchToCustom(
      userInfo._id, 
      searchRef.current.value,
      profileRef.current.value,
      reportRef.current.value,
      csvRef.current.value,
      startRef.current.value,
      endRef.current.value,
      useSearchRef.current.value,
      useProfileRef.current.value,
      useReportRef.current.value,
      useCsvRef.current.value
      )
      .then((response) => {
      });
  }

  return (
    <Box>
      <Typography className={classes.userdetailwrappertitle}>プラン</Typography>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>現在のプラン</Typography>
        <Typography>カスタム</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>検察数</Typography>
        <TextField inputRef={searchRef} sx={{width: '200px'}} type="number" inputProps={{style:{padding:'.5rem'}}}/>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>プロフィール</Typography>
        <TextField inputRef={profileRef} sx={{width: '200px'}} type="number" inputProps={{style:{padding:'.5rem'}}}/>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>レポート</Typography>
        <TextField inputRef={reportRef} sx={{width: '200px'}} type="number" inputProps={{style:{padding:'.5rem'}}}/>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>CSV</Typography>
        <TextField inputRef={csvRef} sx={{width: '200px'}} type="number" inputProps={{style:{padding:'.5rem'}}}/>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>プラン開始日</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            inputFormat={'yyyy/MM/dd'}
            renderInput={(params) => 
              <TextField 
                {...params} 
                sx={{width: '200px'}}
                className={classes.feedtableTextField} 
                variant="outlined" 
                inputRef={startRef}
              />
            }
          />
        </LocalizationProvider>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>プラン終了日</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            inputFormat={'yyyy/MM/dd'}
            renderInput={(params) => 
              <TextField 
                {...params} 
                sx={{width: '200px'}}
                className={classes.feedtableTextField} 
                variant="outlined" 
                inputRef={endRef}
              />
            }
          />
        </LocalizationProvider>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>更新モード</Typography>
        <TextField inputRef={modeRef} sx={{width: '200px'}} inputProps={{style:{padding:'.5rem'}}}/>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>現在の検察数</Typography>
        <TextField inputRef={useSearchRef} sx={{width: '200px'}} type="number" inputProps={{style:{padding:'.5rem'}}}/>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>現在のプロフィール数</Typography>
        <TextField inputRef={useProfileRef} sx={{width: '200px'}} type="number" inputProps={{style:{padding:'.5rem'}}}/>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>現在のレポート数</Typography>
        <TextField inputRef={useReportRef} sx={{width: '200px'}} type="number" inputProps={{style:{padding:'.5rem'}}}/>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>現在のCSV数</Typography>
        <TextField inputRef={useCsvRef} sx={{width: '200px'}} type="number" inputProps={{style:{padding:'.5rem'}}}/>
      </Box>
      <Button className="active" onClick={saveClicked} sx={{marginLeft: '100px'}}>
        保存
      </Button>
    </Box>
  );
};

export default UsageCustom;