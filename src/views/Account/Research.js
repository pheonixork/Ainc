import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import {FilterSelect, InfluencerBrief} from '../Common';
import {Filter, ResearchContent} from './components';

import Keyword from 'constants/lang';
import Constants from 'constants/constants';

const Research = ({campaigns}) => {
  const [selType, onSelect] = useState(Constants.snsInstagram);
  const [selCampaigns, setCurrentCampaigns] = useState([]);

  useEffect(() => {
    let results = _.filter(campaigns, itm => itm.sns === selType);
    setCurrentCampaigns([...results]);
  }, [campaigns, selType]);

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
          <Filter curType={selType}/>
        </Box>  
        <Box marginTop={2} data-aos={'fade-up'}>
          <ResearchContent selType={selType} campaigns={selCampaigns} />
        </Box> 
        <InfluencerBrief /> 
      </Container>
    </Fixed>
  );
};

Research.propTypes = {
  campaigns: PropTypes.array
}

export default Research;
