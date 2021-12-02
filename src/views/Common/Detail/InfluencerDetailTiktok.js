import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Box, Dialog, DialogContent} from '@mui/material';
import HeaderTiktok from './HeaderTiktok';
import PopularPostsTiktok from './PopularPostsTiktok';
import AudienceDataTiktok from './AudienceDataTiktok';
import AudienceLikes from './AudienceLikes';
import NotableTiktok from './NotableTiktok';
import HashTag from './HashTag';
import SponsorPosts from './SponsorPosts';

export default function InfluencerDetailTiktok({data, selectedInfluencer, enthinity, language, ages, agesrange, countries, cities, brand, interest}) {
  return (
    <Box>
      <HeaderTiktok data={data.profile} stats={data.stats} type={selectedInfluencer.type} />
      <PopularPostsTiktok 
        data={data.popularPosts ?? []} 
        recentPosts={data.recentPosts ?? []} 
      />
      <AudienceDataTiktok 
        data={data.audience}
      />
      <NotableTiktok
        followers={data.audience ? data.audience.notableUsers : []}
      />
    </Box>
  );
};
