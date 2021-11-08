import React, {useState, useRef, useEffect} from 'react';
import {Skeleton, Box, Typography, TextField, Button} from '@mui/material';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import {keyaccountService} from 'services';

const KeyAccount = () => {
  const [isLoading, setLoadingStatus] = useState(true);
  const [isRequested, changeRequestStatus] = useState(false);

  useEffect(() => {
    return keyaccountService.getStatus()
      .then(res => {
        changeRequestStatus(res.isNew);
        setLoadingStatus(false);
      });
  }, [])

  let refObjects = [];
  for (let i = 0; i < 10; i ++) {
    refObjects.push(useRef());
  }

  const focusOtherInput = (idx) => {
    if (idx === 9)
      refObjects[0].current.focus();
    else
      refObjects[idx + 1].current.focus();
  }

  const newRequest = (e) => {
    let newIDS = [];
    for (let i = 0; i < 10; i ++) {
      newIDS[i] = refObjects[i].current.value.trim();
    }

    return keyaccountService.newRequest(newIDS)
      .then(res => {
        changeRequestStatus(true);
      });
  }

  return (
    <Fixed>
      <Container className='research content-wrapper'>
        {isLoading ? 
          <>
            <Box marginTop={2}>
              <Skeleton width={240} height={40} sx={{transform:'unset'}}/>
              <Skeleton width={360} height={40} sx={{transform:'unset', marginTop: '.5rem'}}/>
            </Box>
          </>
          :
          <>
            {!isRequested && 
              <>
                <Box marginTop={2}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    キーアカウント調査
                  </Typography>
                  <Typography gutterBottom>
                    現在、Instagramのみ利用が可能
                  </Typography>
                  <Typography gutterBottom>
                    PRのターゲットとなるベルソナのアカウントを2名以上ご入力ください
                  </Typography>
                  <Typography gutterBottom>
                    ベルソナが”共通してフォローしているインフルエンサー”を見つけることにより
                  </Typography>
                  <Typography gutterBottom>
                    より効果的なPRが期待できます。
                  </Typography>
                </Box>
                <Box 
                  marginTop={4} 
                  sx={{display: 'flex', flexDirection: 'column', rowGap: '.5rem'}}
                >
                  {Array.from({length: 10}, (_, i) => i).map((itm, idx) => (
                    <TextField 
                      key={idx}
                      variant="outlined" 
                      size="medium"
                      inputRef={refObjects[idx]}
                      sx={{width: '350px', '& input': {padding: '.5rem'}}}
                      onKeyDown={e=>e.keyCode === 13 ? focusOtherInput(idx) : ''}
                    />
                  ))}
                  <Button 
                    className="active"
                    variant="contained"
                    sx={{width: '50px', marginLeft: '125px'}}
                    onClick={newRequest}
                  >
                    申請
                  </Button>
                </Box>
              </>
            }
            {isRequested && 
              <>
                <Box marginTop={2}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    申請を承りました。
                  </Typography>
                  <Typography
                    gutterBottom
                  >
                    ３営業日以内にキーアカウントをメールにお知らせします。
                  </Typography>
                </Box>
              </>
            }
          </>
        }
      </Container>
    </Fixed>
  );
};

export default KeyAccount;
