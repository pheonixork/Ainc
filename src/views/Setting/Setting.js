import React, {useState} from 'react';
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import {InfluencerBrief} from '../Common';
import {FilterSelect, PlanContent} from './components';

import Keyword from 'constants/lang';

const Setting = ({user, usage}) => {
  const [selType, onSelect] = useState('plan');

  const switchToUpgrade = () => {
    onSelect('upgrade');
  }

  return (
    <Fixed>
      <Container className='research content-wrapper'>
        <Box marginTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            {Keyword.nav.plan}
          </Typography>
        </Box>
        <Box marginTop={4}>
          <FilterSelect curType={selType} onSelect={onSelect}/>
        </Box>
        <Box marginTop={2} data-aos={'fade-up'}>
          <PlanContent user={user} selType={selType} switchToUpgrade={switchToUpgrade} />
        </Box> 
        <InfluencerBrief /> 
      </Container>
    </Fixed>
  );
};

export default Setting;
