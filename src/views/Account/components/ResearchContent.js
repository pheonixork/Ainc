/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import PropTypes from 'prop-types'
import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {SearchItem} from './Contents';
import faker from 'faker';
import Keyword from 'constants/lang';

const names = ['Instagram', 'Cristiano Ronaldo', 'William', 'Hiroto'];

const ResearchContent = ({selType, campaigns}) => {
  const [sortOrder, setSort] = useState(0);
  const [account, setAccounts] = useState([]);
  useEffect(() => {
    let mocks = [...Array(5)].map((_, index) => ({
      id: 'account_' + selType + (faker.datatype.number() % 1000000),
      avatar: 'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D',
      name: names[faker.datatype.number() % 4],
      url: 'https://www.instagram.com/instagram',
      followers: faker.datatype.number(100000000) % 100000000,
      engage: faker.datatype.number() % 1000000,
      per: (faker.datatype.number() % 100) / 100,
    }));

    setAccounts(mocks);
  },[selType]);

  return (
    <Box>
      <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M4 18h4c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm1 6h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1z"></path>
        </svg>
        <span>{Keyword.caption.sort}:</span>
        <Select 
          value={sortOrder}
          onChange={e=>setSort(e.target.value)}
          size="small"
          sx={{width:'200px', marginLeft:'5px'}}
        >
          <MenuItem value={1}>{Keyword.caption.followers}</MenuItem>
          <MenuItem value={2}>{Keyword.caption.engagement}</MenuItem>
        </Select>
      </Box>  
      <Box className='research-content'>
        <Box className='research-content-header research-content-account-grid'>
          <div>{account.length} アカウント</div>
          <div>{Keyword.caption.followers}</div>
          <div>{Keyword.caption.engagement}</div>
          <div></div>
          <div style={{textAlign:'end'}}>リストへ保存</div>
        </Box>
        {_.map(_.orderBy(account, (sortOrder < 2 ? ['followers'] : ['engage']), ['desc']), (itm, idx) => (
          <SearchItem key={itm.id} itm={itm} cattype={selType} campaigns={campaigns} />
        ))}
        <Box className='load-more'>
          <Button className='active'>{Keyword.caption.nextpage}</Button>
        </Box>
      </Box>
    </Box>
  );
};

ResearchContent.propTypes = {
  selType: PropTypes.string,
  campaigns: PropTypes.array,
}

export default ResearchContent;
