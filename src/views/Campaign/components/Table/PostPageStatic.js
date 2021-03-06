/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from 'react';
import {Box, Paper, Skeleton} from '@mui/material';

const PostPageStatic = ({isloading, getMembers}) => {
  const formatterInt = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0});
  const [staticInfo, setStaticInfo] = useState({mems: 0, followers: 0, amount:0, stops: 0, sells: 0, writings: 0, posts:0, insights:0, completes:0});

  useEffect(() => {
    let datas = getMembers();
    if (!datas || datas.length < 1)
      return;

    let followers = 0, amount = 0, stops = 0, sells = 0;
    let writings = 0, posts = 0, insights = 0, completes = 0;

    _.map(datas, itm => {
      if (itm.pstatus === 1) { //中止,
        stops ++;
      } else if (itm.pstatus === 2) { //商品発送済み
        sells ++;
      } else if (itm.pstatus === 3) { //下書き待ち
        writings ++;
      } else if (itm.pstatus === 4) { //本投稿待ち
        posts ++;
      } else if (itm.pstatus === 5) { //インサイト待ち
        insights ++;
      } else { //終了
        completes ++;
      }

      followers += itm.followers;
      amount += itm.amount;
    });

    setStaticInfo({
      mems: datas.length,
      followers: followers, amount: amount, 
      stops: stops, sells: sells, writings: writings, 
      posts: posts, insights: insights, completes: completes
    });
  }, [getMembers]);

  return (
    <Paper
        sx={{
          padding: '10px 0',
        }}
      >
        <Box className='valueItemContainer'>
          <Box className='valueItem'>
            {isloading ? (
              <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
            ) : (
              <p className='value'>{formatterInt.format(staticInfo.mems)}</p>
            )}
            <p className='title'>人数</p>
          </Box>
          <Box className='valueItem'>
            {isloading ? (
              <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
            ) : (
              <p className='value'>{formatterInt.format(staticInfo.followers)}</p>
            )}
            <p className='title'>フォロワー</p>
          </Box>
          <Box className='valueItem'>
            {isloading ? (
              <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
            ) : (
              <p className='value'>{formatterInt.format(staticInfo.amount)}</p>
            )}
            <p className='title'>金額</p>
          </Box>
        </Box>
        <Box className='valueItemContainer'>
          <Box className='valueItem'>
            {isloading ? (
              <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
            ) : (
              <p className='value'>{formatterInt.format(staticInfo.stops)}</p>
            )}
            <p className='title'>中止</p>
          </Box>
          <Box className='valueItem'>
            {isloading ? (
              <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
            ) : (
              <p className='value'>{formatterInt.format(staticInfo.sells)}</p>
            )}
            <p className='title'>商品発送済み</p>
          </Box>
          <Box className='valueItem'>
            {isloading ? (
              <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
            ) : (
              <p className='value'>{formatterInt.format(staticInfo.writings)}</p>
            )}
            <p className='title'>下書き待ち</p>
          </Box>
          <Box className='valueItem'>
            {isloading ? (
              <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
            ) : (
              <p className='value'>{formatterInt.format(staticInfo.posts)}</p>
            )}
            <p className='title'>本投稿待ち</p>
          </Box>
          <Box className='valueItem'>
            {isloading ? (
              <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
            ) : (
              <p className='value'>{formatterInt.format(staticInfo.insights)}</p>
            )}
            <p className='title'>インサイト待ち</p>
          </Box>
          <Box className='valueItem'>
            {isloading ? (
              <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
            ) : (
              <p className='value'>{formatterInt.format(staticInfo.completes)}</p>
            )}
            <p className='title'>終了</p>
          </Box>          
        </Box>
      </Paper>
  );
};

export default PostPageStatic;
