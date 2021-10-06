/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import campaignList from 'mockup/campain_list';
import { ListPageTable } from '../Table'

const headCells = [
  {
    id: 'star',
    numeric: true,
    label: ''
  },
  {
    id: 'id',
    numeric: true,
    label: 'ジャンル',
  },
  {
    id: 'followers',
    numeric: true,
    label: 'フォロワー数',
  },
  {
    id: 'eg',
    numeric: true,
    label: 'EG',
  },
  {
    id: 'action',
    numeric: true,
    label: '',
  },
  {
    id: 'status',
    numeric: true,
    label: 'ステータス',
  },
];

const ListPage = ({...rest}) => {
  const handleSelectChanged = (index) => {
    console.log(index);
  };

  return (
    <Box className='list-page' {...rest}>
      <Paper
        sx={{
          padding: '10px 0'
        }}
      >
        <Box className='valueItemContainer'>
          <Box className='valueItem'>
            <p className='value'>5</p>
            <p className='title'>人数</p>
          </Box>
          <Box className='valueItem'>
            <p className='value'>500000</p>
            <p className='title'>リストフォロワー</p>
          </Box>
          <Box className='valueItem'>
            <p className='value'>3</p>
            <p className='title'>OK人数</p>
          </Box>
          <Box className='valueItem'>
            <p className='value'>300000</p>
            <p className='title'>OKフォロワー</p>
          </Box>
        </Box>
        <Box className='valueItemContainer'>
          <Box className='valueItem'>
            <p className='value'>1</p>
            <p className='title'>社内確認中</p>
          </Box>
          <Box className='valueItem'>
            <p className='value'>1</p>
            <p className='title'>インフルエンサー交渉中</p>
          </Box>
          <Box className='valueItem'>
            <p className='value'>0</p>
            <p className='title'>NG</p>
          </Box>
          <Box className='valueItem'>
            <p className='value'>3</p>
            <p className='title'>OK</p>
          </Box>
        </Box>
      </Paper>
      <ListPageTable headCells={headCells} data={campaignList} handleSelectChanged={handleSelectChanged}/>
    </Box>
  );
};

export default ListPage;
