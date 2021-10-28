import React, {useState} from 'react';
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import {InfluencerBrief} from '../Common';
import {FilterSelect, PlanContent} from './components';

import Keyword from 'constants/lang';

const Setting = ({user}) => {
  const [selType, onSelect] = useState('plan');

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
        <Box marginTop={2} data-aos={'fade-up'}>
          <PlanContent user={user} selType={selType} />
        </Box> 
        <InfluencerBrief /> 
      </Container>
    </Fixed>
  );
};

Setting.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
  }),
}

export default Setting;
