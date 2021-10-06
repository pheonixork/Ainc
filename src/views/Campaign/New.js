import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, MenuItem } from '@mui/material';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';

import Lang from 'constants/lang';
import Constants from 'constants/constants';

const New = () => {
  const [sns, setSNS] = useState();
  const [genre, setGenre] = useState();

  const handleSNSChange = (event) => {
    setSNS(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const campaignCreate = (e) => {

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
              onClick={handleSNSChange}
            >
              {Constants.snsTypes.map((option, index) => (
                <MenuItem key={index} value={option.key}>
                  {option.val}
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
              onClick={handleGenreChange}
            >
              {Constants.campaignTypes.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box
            display='block'
            sx={{
              width: '30%',
              margin: '50px auto',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                width: '100%'
              }}
              onClick={campaignCreate}
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
