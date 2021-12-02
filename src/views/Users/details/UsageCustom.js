/* eslint-disable react/no-unescaped-entities */
import clsx from 'clsx';
import React, {useEffect, useRef, useState} from 'react';
import {Skeleton, Box, Button, Paper, TextField, Typography, Switch} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {planService} from 'services';
import toast from 'react-hot-toast';

const UsageCustom = ({getDatas, classes}) => {
  const [userInfo, setUserInfo] = useState(getDatas());
  const [updatemode, setUpdatemode] = useState(false);

  const searchRef = useRef();
  const profileRef = useRef();
  const reportRef = useRef();
  const csvRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const useSearchRef = useRef();
  const useProfileRef = useRef();
  const useReportRef = useRef();
  const useCsvRef = useRef();

  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    return planService.getCustomInfo(
      userInfo._id, 
      )
      .then((response) => {
        searchRef.current.value = response.data.search;
        profileRef.current.value = response.data.profile;
        reportRef.current.value = response.data.report;
        csvRef.current.value = response.data.csv;
        useSearchRef.current.value = response.data.usesearch;
        useProfileRef.current.value = response.data.useprofile;
        useReportRef.current.value = response.data.usereport;
        useCsvRef.current.value = response.data.usecsv;

        setStartDate(response.data.startdate);
        setEndDate(response.data.enddate);
        setUpdatemode(response.data.updatemode);

        setLoading(false);
      });
  }, []);

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

    return planService.saveToCustom(
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
      useCsvRef.current.value,
      updatemode
      )
      .then((response) => {
        toast.success('更新しました。');
      });
  }

  return (
    <Box>
      <Typography className={classes.userdetailwrappertitle}>プラン</Typography>
      {isloading && 
        <Skeleton width={'100%'} height={600} sx={{transform:'unset'}}/>
      }
      <Box sx={{display: `${isloading ? 'none' : 'relative'}`}}>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>現在のプラン</Typography>
          <Typography>カスタム</Typography>
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>検索数</Typography>
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
                  sx={{
                    width: '200px',
                    '& input': {
                      padding: '4px'
                    }
                  }}
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
                  sx={{
                    width: '200px',
                    '& input': {
                      padding: '4px'
                    }
                  }}
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
          <Box sx={{display:'flex', alignItems:'center'}}>
            <Typography className={clsx("text", !updatemode ? "auto-manual-caption" : "")}>OFF</Typography>
            <Switch 
              checked={updatemode}
              onChange={e=>setUpdatemode(e.target.checked)}
            />
            <Typography className={clsx("text", updatemode ? "auto-manual-caption" : "")}>1カ月</Typography>
          </Box>
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>現在の検索数</Typography>
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
    </Box>
  );
};

export default UsageCustom;