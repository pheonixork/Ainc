/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Box, Button} from '@mui/material';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {useMainContext} from 'context/MainContext';
import RelativeImage from 'components/RelativeImage';
import Keyword from 'constants/lang';

export default function AccountItem({itm, showCPDetail}) {
  const {setInfluencerCollapsable, setInfluencerIndex} = useMainContext();

  const itemRowClicked = (e) => {
    setInfluencerCollapsable(false); 
    setInfluencerIndex(itm.infId);
  }

  const cpBtnClicked = (e) => {
    e.stopPropagation();
    showCPDetail(itm._id);
  }

  const evaluateValue = (val) => {
    if (val > 1000 * 1000)
      return (val / (1000 * 1000)).toFixed(1) + 'M'
    else if (val > 1000)
      return (val / 1000).toFixed(1) + 'K'

    return val
  }

  return (
    <Box 
      className='research-content-item research-content-insight-grid box-wrapper-shadow'
      onClick={itemRowClicked}
      >
      <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <RelativeImage
          isRound
          imgSrc={'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D'}
          sx={{width: '3.125rem !important', height: '3.125rem !important', margin: '.5rem 1rem 0'}}
        />
        {/* <Box
          component={LazyLoadImage}
          effect="blur"
          src={'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D'}
          height={'3.125rem'}
          width={'3.125rem'}
          sx={{margin:'.5rem 1rem 0', borderRadius:'50%'}}
        /> */}
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
          {Array.from({length: itm.star}, (_, i) => i).map(starItm => (
            <Box
              key={starItm}
              component={LazyLoadImage}
              effect="blur"
              src={'/images/svgs/star.svg'}
              width={'15px'}
              height={'15px'}
            />
          ))}
        </Box>
      </Box>
      <Box className='instagram'>
        <Box>{itm.name}</Box>
        <a className='instagram-link' href={itm.url}>@{itm.name}</a>
      </Box>
      <Box className='followers'>
        <Box className='first'>{evaluateValue(itm.followers)}</Box>
        <Box  className='second'>{Keyword.caption.follower}</Box>
      </Box>
      <Box className='followers'>
        <Box className='first'>
          {evaluateValue(itm.engage)}<span>{`(0%)`}</span>
        </Box>
        <Box  className='second'>{Keyword.caption.engagement}</Box>
      </Box>
      <Box>
      </Box>
      <Box className='action'>
        <Box className='relative-action'>
          <Button onClick={cpBtnClicked}>
            <span>CP</span>
          </Button>
        </Box>
      </Box>
      
    </Box>
  );
};

AccountItem.propTypes = {
  itm: PropTypes.object.isRequired,
  showCPDetail: PropTypes.func,
};