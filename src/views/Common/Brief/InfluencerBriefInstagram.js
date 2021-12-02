import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AudienceDetails from './AudienceDetails';
import LastUpdates from './LastUpdates';
import MostPosts from './MostPosts';

const InfluencerBriefInstagram = ({data}) => {
  return (
    <Box>
      <LastUpdates data={data} />

      <AudienceDetails data={data.audience} lookalikes={data.lookalikes} hashtags={data.hashtags}/>

      <MostPosts data={data.popularPosts}/>
    </Box>
  );
};

export default InfluencerBriefInstagram;
