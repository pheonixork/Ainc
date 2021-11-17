import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import {FilterSelect, InfluencerBrief} from '../Common';
import {Instagram, Youtube, Tiktok} from './components';

import Keyword from 'constants/lang';
import Constants from 'constants/constants';

const Research = () => {
  const [selType, onSelect] = useState(Constants.snsInstagram);

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
            {Keyword.nav.accountresearch}
          </Typography>
          <Typography
            gutterBottom
          >
            {Keyword.label.searchfromsite}
          </Typography>
        </Box>
        <Box marginTop={4}>
          <FilterSelect curType={selType} onSelect={onSelect}/>
        </Box>
        <Box marginTop={2}>
          <Instagram selected={selType === Constants.snsInstagram} display={`${selType === Constants.snsInstagram ? 'block' : 'none'}`} />
          <Youtube selected={selType === Constants.snsYoutube} display={`${selType === 'youtube' ? 'block' : 'none'}`} />
          <Tiktok selected={selType === Constants.snsTiktok} display={`${selType === 'tiktok' ? 'block' : 'none'}`} />
        </Box>  
        <InfluencerBrief /> 
      </Container>
    </Fixed>
  );
};

export default Research;
