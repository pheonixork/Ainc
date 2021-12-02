import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Box, Dialog, DialogContent} from '@mui/material';
import HeaderYoutube from './HeaderYoutube';
import PopularPostsYoutube from './PopularPostsYoutube';
import AudienceDataYoutube from './AudienceDataYoutube';
import AudienceLikesYoutube from './AudienceLikesYoutube';
import NotableYoutube from './NotableYoutube';
import HashTagYoutube from './HashTagYoutube';
import SponsorPostsYoutube from './SponsorPostsYoutube';

export default function InfluencerDetailYoutube({data, selectedInfluencer, enthinity, language, ages, agesrange, countries, cities, brand, interest}) {
  return (
    <Box>
      <HeaderYoutube data={data.profile} stats={data.stats} type={selectedInfluencer.type} />
      <PopularPostsYoutube 
        data={data.recentPosts ?? []} 
        statHistory={data.statHistory ?? []} 
        recentPosts={data.recentPosts ?? []} 
        hashtags={data.hashtags ?? []}
        brandAffinity={data.brandAffinity ?? []}
        interests={data.interests ?? []}
        lookalikes={data.lookalikes ?? []}
      />
      <AudienceDataYoutube 
        data={data.audience}
      />
      {data.audienceLikers && 
        <AudienceLikesYoutube data={data.audienceLikers} />
      }
      <NotableYoutube
        followers={data.audience ? data.audience.notableUsers : []}
        likers={data.audienceLikers ? data.audienceLikers.notableUsers : []}
        lookalikes={data.lookalikes ?? []}
      />
      <HashTagYoutube 
        followers={data.profile.followers}
        avgs={data.stats ? data.stats.avgLikes.value : 0}
        data={data.hashtags} 
        mentions={data.mentions} 
        genderlikers={data.audienceLikers ? data.audienceLikers.genders : []}
        genderfollowers={data.audience ? data.audience.genders : []}
        enthinity={enthinity}
        language={language}
        agesrange={agesrange}
        ages={ages}
        countries={countries}
        cities={cities}
        brand={brand}
        interest={interest}
      />
      <SponsorPostsYoutube data={data.popularPosts} />
    </Box>
  );
};
