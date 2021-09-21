import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { Filter, ResearchContent, FilterSelect } from './components';

const Research = () => {
  const [selType, onSelect] = useState('instagram');

  return (
    <Fixed>
      <Container className='research'>
        <Box marginTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            アカウントリサーチ
          </Typography>
          <Typography
            gutterBottom
          >
            Instagram・YouTube・TikTokからアカウントを探してみます。
          </Typography>
        </Box>
        <Box marginTop={4}>
          <FilterSelect curType={selType} onSelect={onSelect}/>
        </Box>
        <Box marginTop={2}>
          <Filter curType={selType}/>
        </Box>  
        <Box marginTop={2}>
          <ResearchContent />
        </Box>  
      </Container>
    </Fixed>
  );
};

export default Research;
