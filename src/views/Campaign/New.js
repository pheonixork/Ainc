import _ from 'lodash';
import React, { useState } from 'react';
import {useRouter} from 'next/router';

import { Box, Typography, Button, Paper, TextField, MenuItem } from '@mui/material';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {campaignService} from 'services';

const New = () => {
  const router = useRouter();
  const [err, setError] = useState('');
  const [title, setTitle] = useState('');
  const [sns, setSNS] = useState();
  const [genre, setGenre] = useState();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleSNSChange = (event) => {
    setSNS(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const campaignCreate = () => {
    return campaignService.createCampaign(title, sns, genre)
      .then((ret) => {
        if (ret.status === 'ok') {
          const returnUrl = `/campaign/detail/${ret.id}`;
          router.push(returnUrl);
        } else {
          setError(ret.msg);
        }
      })
      .catch(error => {
          setError(error);
      });
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
            キャンペーン作成
          </Typography>
          
        </Box>
        <Paper 
          sx={{ 
            width: '60%', 
            marginLeft: 'auto', 
            marginRight: 'auto',
            maxWidth: '800px',
            mt: 10, 
            mb: 2, 
            boxShadow: '0 0px 6px 0 rgb(140 152 164 / 53%)',
            padding: '60px 0px 40px'
          }}
        >
          <Box
            display='block'
            sx={{
              width: '60%',
              margin: '20px auto',
            }}
          >
            <TextField 
              label="キャンペーン名" 
              variant="outlined" 
              sx={{
                width: '100%'
              }}
              value={title}
              onChange={handleTitleChange}
            />
          </Box>
          <Box
            display='block'
            sx={{
              width: '60%',
              margin: '20px auto',
            }}
          >
            <TextField
              select
              label="SNS"
              variant="outlined" 
              sx={{
                width: '100%'
              }}
              value={sns}
              onChange={handleSNSChange}
            >
              {_.map(Constants.snsTypes, (typeVal, typeKey) => (
                <MenuItem key={typeKey} value={typeKey}>
                  {typeVal}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box
            display='block'
            sx={{
              width: '60%',
              margin: '20px auto',
            }}
          >
            <TextField
              select
              label={Lang.caption.type}
              variant="outlined" 
              sx={{
                width: '100%'
              }}
              value={genre}
              onChange={handleGenreChange}
            >
              {Constants.campaignTypes.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{textAlign: 'center'}}>
            <Button
              className="active"
              variant={'outlined'}
              onClick={e => campaignCreate()}
            >
              {Lang.btn.create}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Fixed>
  );
};

export default New;
