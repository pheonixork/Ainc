import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import {Box, Typography, Button, Paper, TextField, LinearProgress} from '@mui/material';
import {loadService} from 'services';
import toast from 'react-hot-toast';

const LoadInfluencer = () => {
  const [progress, setProgress] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('');
  const [status, setStatus] = useState({type:0, isprogressing: false});
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return loadService.getlastupdated()
      .then((ret) => {
        setLastUpdate(ret.data);
      });
  }, []);

  const influcerBtnClicked = () => {
    if (status.isprogressing === true) {
      if (status.type !== 1) {
        toast.error('計算を中止してください');
        return;
      }
      setStatus({type:0, isprogressing: false});
      setTimer((prevTimer) => {
        clearInterval(prevTimer);
        return null;
      });
    } else {
      setStatus({type:1, isprogressing: true});

       setTimer(setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
      }, 800));
    }
  }

  const hashtagBtnClicked = () => {
    if (status.isprogressing === true) {
      if (status.type !== 2) {
        toast.error('計算を中止してください');
        return;
      }
      setStatus({type:0, isprogressing: false});
    } else {
      setStatus({type:2, isprogressing: true});
    }
  }

  return (
    <Fixed>
      <Container>
        <Box paddingTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
              marginBottom: 4
            }}
          >
            MODASHからインフルエンサーを取得
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              marginBottom: 2
            }}
          >
            最新更新日：{`${lastUpdate === '' ? '更新履歴がありません' : lastUpdate}`}
          </Typography>
        </Box>
        <Box sx={{width: '650px'}}>
          <Box sx={{display: 'flex', justifyContent:'space-between'}} paddingTop={2} paddingBottom={2}>
            <Button 
              className={`${status.type === 1 && status.isprogressing === true ? '' : 'active'}`}
              variant="outlined"
              sx={{paddingTop: '1.5rem !important', width:'300px !important', paddingBottom: '1.5rem !important'}}
              onClick={e=>influcerBtnClicked()}
            >
            {status.type === 1 && status.isprogressing === true ?
              <>
                <Box 
                  component={'img'} 
                  src={'/images/svgs/cancel.svg'} 
                  height={24} width={24} 
                  marginRight={1.5} 
                />
                キャンセル
              </> : 
              <>
                <Box 
                  component={'img'} 
                  src={'/images/svgs/download.svg'} 
                  height={24} width={24} 
                  marginRight={1.5} 
                />
                MODASHからダウンロード
              </>
            }
            </Button>
            <Button 
              sx={{marginLeft: '1rem', width:'300px !important', paddingTop: '1.5rem !important', paddingBottom: '1.5rem !important'}}
              className={`${status.type === 2 && status.isprogressing === true ? '' : 'active'}`}
              variant="outlined"
              onClick={e=>hashtagBtnClicked()}
            >
            {status.type === 2 && status.isprogressing === true ?
              <>
                <Box 
                  component={'img'} 
                  src={'/images/svgs/cancel.svg'} 
                  height={24} width={24} 
                  marginRight={1.5} 
                />
                キャンセル
              </> : 
              <>
                <Box 
                  component={'img'} 
                  src={'/images/svgs/calculate.svg'} 
                  height={24} width={24} 
                  marginRight={1.5} 
                />
                ハッシュタグエンゲージメント計算
              </>
            }
            </Button>
          </Box>
          <Box paddingTop={4}>
            <Typography
              sx={{
                marginBottom: 2
              }}
            >
              進陟状況：{progress}%
            </Typography>
            <LinearProgress variant="determinate" value={progress} />
            <Typography
              sx={{
                color: 'red',
                marginTop: 1
              }}
            >
              取得・計算するとき、他の操作は進まないでください。
            </Typography>
          </Box>
        </Box>
        
      </Container>
    </Fixed>
  );
};

export default LoadInfluencer;
