/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchItem from './SearchItem';
import SearchItemLoading from './SearchItemLoading';
import YoutubeFilter from './YoutubeFilter';
import Constants from 'constants/constants';
import Keyword from 'constants/lang';
import {modashService} from 'services';
import toast from 'react-hot-toast';

export default function Youtube({selected, interests, languages, locations, ...rest}) {
  const [isLoading, setLoading] = useState(false);
  const [curpage, setPageNum] = useState(0);

  const [sortOrder, setSortOrder] = useState('followers');
  const [sortDirection, setSortDirection] = useState('desc');
  const changeSort = (order) => {
    if (order === sortOrder) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortOrder(order);
      setSortDirection('desc');  
    }
    
    setAccounts([]);
    loadFromServer(0, order, 'desc');
  }

  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    if (selected === false)
      return;

    if (accounts.length === 0) {
      loadFromServer(0, sortOrder, setSortDirection);
    }
  }, [selected]);

  const loadFromServer = (pageNum, sortField, sortDir) => {
    setLoading(true);
    setPageNum(pageNum);

    return modashService.getAccounts(
      Constants.snsYoutube,
      pageNum, 
      {field: sortField, direction: sortDir},
      ''
    ).then((response) => {
      if (response.status !== 'ok' || response.data.error !== false)
        return;
        
      const data = response.data;
      
      if (pageNum === 0)
        setAccounts([...data.lookalikes]);
      else
        setAccounts([...accounts, ...data.lookalikes]);
      setLoading(false);
    }).catch(msg => {
      setLoading(false);
      toast.error(msg);
    });
  }

  return (
    <Box {...rest}>
      <YoutubeFilter interests={interests}
            languages={languages}
            locations={locations}
            />
      <Box marginTop={2} data-aos={'fade-up'}>
        <Box className='research-content' sx={{marginTop: '32px !important'}}>
          <Box className='research-content-header research-content-account-grid'>
            <div>{accounts.length} アカウント</div>
            <div style={{display: 'flex', cursor: 'pointer'}} onClick={e=>changeSort('followers')}>
              {Keyword.caption.followers}
              {sortOrder === 'followers' && (
                  <>
                    {sortDirection === 'desc' ? <ArrowDownwardIcon fontSize="small"/> : <ArrowUpwardIcon fontSize="small" />}
                  </>
                )
              }
            </div>
            <div style={{display: 'flex', cursor: 'pointer'}} onClick={e=>changeSort('engagements')}>
              {Keyword.caption.engagement}
              {sortOrder === 'engagements' && (
                  <>
                    {sortDirection === 'desc' ? <ArrowDownwardIcon fontSize="small" /> : <ArrowUpwardIcon fontSize="small" />}
                  </>
                )
              }
            </div>
            <div></div>
            <div style={{textAlign:'end'}}>リストへ保存</div>
          </Box>
          {_.map(accounts, (itm) => (
            <SearchItem 
              key={itm.userId} 
              itm={itm} 
              cattype={Constants.snsYoutube} 
            />
          ))}
          <Box className='load-more'>
            <Button className='active' onClick={e=>loadFromServer(curpage + 1)}>{Keyword.caption.nextpage}</Button>
          </Box>
          {isLoading && 
            Array.from({length: 10}, (_, i) => i).map(itm => (
              <SearchItemLoading key={itm} />
            ))
          }
        </Box>
      </Box> 
    </Box>
  );
};