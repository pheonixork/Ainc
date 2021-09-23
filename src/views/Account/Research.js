import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { Filter, ResearchContent, FilterSelect, InfluencerBrief } from './components';
import { RightSideWrapper } from 'context/rightsideshow';

const Research = () => {
  const [selType, onSelect] = useState('instagram');

  return (
    <Fixed>
      <RightSideWrapper>
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
          <InfluencerBrief /> 
        </Container>
      </RightSideWrapper>
    </Fixed>
  );
};

export default Research;
