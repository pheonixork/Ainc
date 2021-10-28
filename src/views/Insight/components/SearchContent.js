/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Box, Select, Button, MenuItem, Typography} from '@mui/material';
import {AccountItem} from './Contents';
import Lang from 'constants/lang';
import {CP} from 'views/Common/CP';

const SearchContent = ({accounts}) => {
  const [sortOrder, setSort] = useState(0);
  const [selId, setAccountId] = useState('');

  return (
    <Box>
      <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M4 18h4c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm1 6h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1z"></path>
        </svg>
        <span>{Lang.caption.sort}:</span>
        <Select 
          value={sortOrder}
          onChange={e=>setSort(e.target.value)}
          size="small"
          sx={{width:'200px', marginLeft:'5px'}}
        >
          <MenuItem value={1}>{Lang.caption.followers}</MenuItem>
          <MenuItem value={2}>{Lang.caption.engagement}</MenuItem>
        </Select>
      </Box>  
      <Box className='research-content'>
        <Box className='research-content-header research-content-insight-grid'>
          <Box sx={{textAlign: 'center'}}>
            <Box
              component={LazyLoadImage}
              effect="blur"
              src={'/images/svgs/star.svg'}
              width={'20px'}
              height={'20px'}
            />
          </Box>
          <Box>ID</Box>
          <Box>{Lang.caption.followers}</Box>
          <Box>{Lang.caption.engagement}</Box>
          <Box></Box>
          <Box></Box>
        </Box>
        {accounts.length < 1 ? (
          <Typography>検察結果がありません</Typography>
        ) : (
        _.map(_.orderBy(accounts, (sortOrder < 2 ? ['followers'] : ['engage']), ['desc']), itm => (
          <AccountItem itm={itm} key={itm._id} showCPDetail={setAccountId} />
        )))}
        <Box className='load-more'>
          <Button className='active'>{Lang.caption.nextpage}</Button>
        </Box>
      </Box>
      <CP accountId={selId} setCollapse={setAccountId}/>
    </Box>
  );
};

SearchContent.propTypes = {
  accounts: PropTypes.array
}

export default SearchContent;
