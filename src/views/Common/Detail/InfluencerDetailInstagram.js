import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Box, Dialog, DialogContent} from '@mui/material';
import Header from './Header';
import PopularPosts from './PopularPosts';
import AudienceData from './AudienceData';
import AudienceLikes from './AudienceLikes';
import Notable from './Notable';
import HashTag from './HashTag';
import SponsorPosts from './SponsorPosts';

export default function InfluencerDetailInstagram({data, selectedInfluencer, enthinity, language, ages, agesrange, countries, cities, brand, interest}) {
  return (
    <Box>
      <Header data={data.profile} stats={data.stats} type={selectedInfluencer.type} />
      <PopularPosts 
        data={data.popularPosts ?? []} 
        statHistory={data.statHistory ?? []} 
        recentPosts={data.recentPosts ?? []} 
        hashtags={data.hashtags ?? []}
        brandAffinity={data.brandAffinity ?? []}
        interests={data.interests ?? []}
        lookalikes={data.lookalikes ?? []}
      />
      <AudienceData 
        data={data.audience}
      />
      {data.audienceLikers && 
        <AudienceLikes data={data.audienceLikers} />
      }
      <Notable 
        followers={data.audience ? data.audience.notableUsers : []}
        likers={data.audienceLikers ? data.audienceLikers.notableUsers : []}
        lookalikes={data.lookalikes ?? []}
      />
      <HashTag 
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
      <SponsorPosts data={data.sponsoredPosts} />
    </Box>
  );
};
