/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {SearchItem} from './Contents';
import faker from 'faker';

const names = ['Instagram', 'Cristiano Ronaldo', 'William', 'Hiroto'];

const mocks = [...Array(5)].map((_, index) => ({
  avatar: 'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D',
  name: names[faker.datatype.number() % 4],
  url: 'https://www.instagram.com/instagram',
  followers: faker.datatype.number(100000000) % 100000000,
  engage: faker.datatype.number() % 1000000,
  per: (faker.datatype.number() % 100) / 100,
}));

const ResearchContent = () => {
  const [sortOrder, setSort] = useState(0);

  return (
    <Box>
      <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M4 18h4c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm1 6h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1z"></path>
        </svg>
        <span>整列:</span>
        <Select 
          value={sortOrder}
          onChange={e=>setSort(e.target.value)}
          size="small"
          sx={{width:'200px', marginLeft:'5px'}}
        >
          <MenuItem value={1}>Follower range</MenuItem>
          <MenuItem value={2}>Engagements</MenuItem>
        </Select>
      </Box>  
      <Box className='research-content'>
        <Box className='research-content-header'>
          <div>64 940 480 influencers found</div>
          <div>Follower range</div>
          <div>Engagement (Engagement rate)</div>
          <div></div>
          <div style={{textAlign:'end'}}>Save to list</div>
        </Box>
        {_.map(_.orderBy(mocks, (sortOrder < 2 ? ['followers'] : ['engage']), ['desc']), (itm, idx) => (
          <SearchItem itm={itm} idx={idx} key={idx}/>
        ))}
        <Box className='load-more'>
          <Button className='active'>Load next page</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResearchContent;
