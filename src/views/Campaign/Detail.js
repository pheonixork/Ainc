import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { TabSelect, Tabs } from './components';
import { CustomInput } from './components/CustomInput';

const Detail = ({ campaignData }) => {
  const [selType, onSelect] = useState('list');
  
  return (
    <Fixed>
      <Container className='content-wrapper'>
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
          <CustomInput value={campaignData.name}></CustomInput>
        </Box>
        <Box marginTop={4}>
          <TabSelect curType={selType} onSelect={onSelect}/>
        </Box>
        <Box marginTop={4}>
          <Tabs curType={selType} />
        </Box>
      </Container>
    </Fixed>
  );
};

export default Detail;
