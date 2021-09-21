/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {SearchItem} from './Contents';

const mocks = [{'avatar':'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D', 
              'name':'Instagram', 'url':'https://www.instagram.com/instagram', 'followers':422504930, 'engage':515432, 'per':'0.12'},
              {'avatar':'https://imgigp.modash.io/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDY9ylLT5c6L8M5YYtkm82Y2DDgAk%2BlFE0f8CghKo5%2FCKHnrwHpFJsVwOsLT2HHY58qvvB2REevWri5e5dDWGq%2BUrC4M4BvvnB6Aeuo02N6AJw%3D%3D', 
              'name':'Instagram', 'url':'https://www.instagram.com/instagram', 'followers':22504930, 'engage':615432, 'per':'0.12'},
              {'avatar':'https://imgigp.modash.io/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDbrEEwrWumIvR20xZeZXa0LDeIrcniqZeG9S%2F1a5s2Rx3FZdXrWpY%2BmSBJp1l%2FmBGon3rcHA4EfuatZqMhVBzAT', 
              'name':'Instagram', 'url':'https://www.instagram.com/instagram', 'followers':222504930, 'engage':15432, 'per':'0.12'},
              {'avatar':'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D', 
              'name':'Instagram', 'url':'https://www.instagram.com/instagram', 'followers':122504930, 'engage':81432, 'per':'0.12'},
              {'avatar':'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D', 
              'name':'Instagram', 'url':'https://www.instagram.com/instagram', 'followers':52504930, 'engage':5432, 'per':'0.02'},
              {'avatar':'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D', 
              'name':'Instagram', 'url':'https://www.instagram.com/instagram', 'followers':504930, 'engage':25432, 'per':'0.12'},
              {'avatar':'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D', 
              'name':'Instagram', 'url':'https://www.instagram.com/instagram', 'followers':504930, 'engage':5943, 'per':'0.12'},
              {'avatar':'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D', 
              'name':'Instagram', 'url':'https://www.instagram.com/instagram', 'followers':4930, 'engage':547, 'per':'0.12'},
              {'avatar':'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D', 
              'name':'Instagram', 'url':'https://www.instagram.com/instagram', 'followers':904930, 'engage':2344, 'per':'0.12'},
              {'avatar':'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D', 
              'name':'Instagram', 'url':'https://www.instagram.com/instagram', 'followers':402504, 'engage':65245, 'per':'0.12'},
              {'avatar':'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D', 
              'name':'Instagram', 'url':'https://www.instagram.com/instagram', 'followers':12250493, 'engage':127, 'per':'0.12'},
              {'avatar':'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D', 
              'name':'Instagram', 'url':'https://www.instagram.com/instagram', 'followers':8220430, 'engage':864, 'per':'0.12'}];

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
