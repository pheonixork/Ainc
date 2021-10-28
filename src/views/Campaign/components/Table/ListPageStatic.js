/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from 'react';
import {Box, Paper, Skeleton} from '@mui/material';

const ListPageStatic = ({isloading, datas}) => {
  const [staticInfo, setStaticInfo] = useState({oks: 0, okfols: 0, memfols: 0, imems: 0, cmems: 0, nmems:0});

  useEffect(() => {
    if (!datas || datas.length < 1)
      return;

    let oks = 0, okfols = 0, cmems = 0, imems = 0, nmems = 0, fols = 0;
    _.map(datas, itm => {
      if (itm.status === 1) { //社内確認中
        cmems ++;
      } else if (itm.status === 2) { //インフルエンサー交渉中
        imems ++;
      } else if (itm.status === 3) { //NG
        nmems ++;
      } else { //OK
        oks ++;
        okfols += itm.followers;
      }

      fols += itm.followers;
    });

    setStaticInfo({oks: oks, okfols: okfols, memfols: fols, imems: imems, cmems: cmems, nmems: nmems});
  }, [datas]);

  return (
    <Paper
      sx={{
        padding: '10px 0'
      }}
    >
      <Box className='valueItemContainer'>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{datas.length}</p>
          )}
          <p className='title'>人数</p>
        </Box>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{staticInfo.memfols}</p>
          )}
          <p className='title'>リストフォロワー</p>
        </Box>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{staticInfo.oks}</p>
          )}
          <p className='title'>OK人数</p>
        </Box>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{staticInfo.okfols}</p>
          )}
          <p className='title'>OKフォロワー</p>
        </Box>
      </Box>
      <Box className='valueItemContainer'>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{staticInfo.cmems}</p>
          )}
          <p className='title'>社内確認中</p>
        </Box>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{staticInfo.imems}</p>
          )}
          <p className='title'>インフルエンサー交渉中</p>
        </Box>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{staticInfo.nmems}</p>
          )}
          <p className='title'>NG</p>
        </Box>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{staticInfo.oks}</p>
          )}
          <p className='title'>OK</p>
        </Box>
      </Box>
    </Paper>
  );
};

export default ListPageStatic;
