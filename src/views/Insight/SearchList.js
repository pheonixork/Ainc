import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { Filter, SearchContent } from './components';
import { FilterSelect, InfluencerBrief } from '../Common';
import Lang from 'constants/lang';
import Constant from 'constants/constants'

const SearchList = () => {
  const [selType, onSelect] = useState(Constant.snsInstagram);

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
            {Lang.nav.insightlist}
          </Typography>
          <Typography
            gutterBottom
          >
            {Lang.caption.searchfromsite}
          </Typography>
        </Box>
        <Box marginTop={4}>
          <FilterSelect curType={selType} onSelect={onSelect}/>
        </Box>
        <Box marginTop={2}>
          <Filter curType={selType}/>
        </Box>  
        <Box marginTop={2} data-aos={'fade-up'}>
          <SearchContent />
        </Box> 
        <InfluencerBrief /> 
      </Container>
    </Fixed>
  );
};

export default SearchList;
