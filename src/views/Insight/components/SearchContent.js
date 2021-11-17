/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useState } from 'react';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Box, Select, Button, MenuItem, Typography} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {AccountItem} from './Contents';
import Lang from 'constants/lang';

const SearchContent = ({accounts}) => {
  const [sortOrder, setSortOrder] = useState('followers');
  const [sortDirection, setSortDirection] = useState('desc');

  const changeSort = (order) => {
    if (order === sortOrder) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
      return;
    }

    setSortOrder(order);
    setSortDirection('desc');
  }
  
  return (
    <Box>
      {/* <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
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
      </Box>   */}
      <Box className='research-content' sx={{marginTop: '32px !important'}}>
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
          <Box style={{display: 'flex', cursor: 'pointer'}} onClick={e=>changeSort('followers')}>
            {Lang.caption.followers}
            {sortOrder === 'followers' && (
                <>
                  {sortDirection === 'desc' ? <ArrowDownwardIcon fontSize="small"/> : <ArrowUpwardIcon fontSize="small" />}
                </>
              )
            }
          </Box>
          <Box style={{display: 'flex', cursor: 'pointer'}} onClick={e=>changeSort('engage')}>
            {Lang.caption.engagement}
            {sortOrder === 'engage' && (
                <>
                  {sortDirection === 'desc' ? <ArrowDownwardIcon fontSize="small" /> : <ArrowUpwardIcon fontSize="small" />}
                </>
              )
            }
          </Box>
          <Box></Box>
          <Box></Box>
        </Box>
        {accounts.length < 1 ? (
          <Typography>検察結果がありません</Typography>
        ) : (
        _.map(_.orderBy(accounts, ([sortOrder]), [sortDirection]), itm => (
          <AccountItem itm={itm} key={itm._id}/>
        )))}
        <Box className='load-more'>
          <Button className='active'>{Lang.caption.nextpage}</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchContent;
