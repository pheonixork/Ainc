import React, { useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Typography, Button, Paper, TextField, MenuItem, FormControl, OutlinedInput } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';

const snsValues = ['Instagram', 'Youtube', 'TikTok'];
const genreValues = ['ファッション', 'ビューティー', 'グルメ', 'インテリア', '電化製品', '不動産', '動物', '旅行', '日用品', 'エンタメ', '旅行・ホテル', 'ゲーム', 'キッズ', '乗り物', 'アート(音楽・映画)', 'ビジネス', 'スポーツ・アクティブ', 'その他'];

const Detail = () => {
  const [sns, setSNS] = useState();
  const [genre, setGenre] = useState();

  const handleSNSChange = (event) => {
    setSNS(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  return (
    <Fixed>
      <Container>
        <Box 
          display='flex'
          paddingTop={2}
        >
          <Button
            component="a"
            size="small"
            href={'/campaign/list'}
            sx={{
              width: 36,
              height: 36,
              minWidth: 'unset'
            }}
          >
            <ArrowBackIcon 
              sx={{
                width: 24,
                height: 24,
                color: '#2d3748'
              }}
            />
          </Button>
          <input type="text" className="campaignName"></input>
          
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
              {snsValues.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
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
              label="ジャンル"
              variant="outlined" 
              sx={{
                width: '100%'
              }}
              value={genre}
              onClick={handleGenreChange}
            >
              {genreValues.map((option, index) => (
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
              component={'a'}
              variant="contained"
              color="primary"
              size="large"
              href={'/campaign/detail'}
              sx={{
                width: '100%'
              }}
            >
              作成
            </Button>
          </Box>
        </Paper>
      </Container>
    </Fixed>
  );
};

export default Detail;
