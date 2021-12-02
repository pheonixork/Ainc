/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import clsx from 'clsx';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useMainContext } from 'context/MainContext';
import {SaveDlg} from 'views/Common';
import Keyword from 'constants/lang';
import RelativeImage from 'components/RelativeImage';
import {evaluateValue} from 'constants/constants';

export default function SearchItem({itm, cattype}) {
  const formatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2});

  const [anchorEl, setAnchorEl] = useState(null);
  const {setInfluencerCollapsable, setSelectedInfluencer, selectedInfluencer} = useMainContext();

  const closeDlg = () => {
    setAnchorEl(null);
  }
  
  return (
    <Box 
      className={clsx('research-content-item', 'research-content-account-grid', 'box-wrapper-shadow', `${selectedInfluencer && selectedInfluencer.id === itm.userId ? 'influencer-detail-active' : ''}`)}
      onClick={e=>{setInfluencerCollapsable(false); setSelectedInfluencer({id:itm.userId, username:itm.profile.username, type:cattype});}}
      >
      <Box className='profile'>
        <RelativeImage
          isRound
          imgSrc={itm.profile.picture}
          sx={{width: '3.125rem !important', height: '3.125rem !important', margin: '1rem'}}
        />
        <Box className='instagram'>
          <Box>{itm.profile.fullname}</Box>
          <a className='instagram-link' href={itm.profile.url}>@{itm.profile.username}</a>
        </Box>
      </Box>
      <Box className='followers'>
        <Box className='first'>{evaluateValue(itm.profile.followers)}</Box>
        <Box className='second'>{Keyword.caption.follower}</Box>
      </Box>
      <Box className='followers'>
        <Box className='first'>
          {evaluateValue(itm.profile.engagements)}<span>{`(${formatter.format(itm.profile.engagementRate * 100)}%)`}</span>
        </Box>
        <Box  className='second'>{Keyword.caption.engagement}</Box>
      </Box>
      <Box>
      </Box>
      <Box className='action'>
        <Box className='relative-action'>
          <Button 
            onClick={e=>{e.stopPropagation();setAnchorEl(e.currentTarget)}}
          >
            <svg fill="none" height="16" width="16" xmlns="http://www.w3.org/2000/svg" >
              <path d="M12.67 12l1.33.67V2c0-.73-.6-1.33-1.33-1.33H5.99c-.73 0-1.32.6-1.32 1.33h6.66c.74 0 1.34.6 1.34 1.33V12zM10 3.33H3.33C2.6 3.33 2 3.93 2 4.67v10.66l4.67-2 4.66 2V4.67c0-.74-.6-1.34-1.33-1.34z"></path>
            </svg>
            <span>{Keyword.btn.register}</span>
          </Button>
        </Box>
      </Box>
      
      <SaveDlg 
        anchorEl={anchorEl}
        closeDlg={closeDlg} 
        infId={itm.userId}
        info={itm.profile}
        catType={cattype}
      />
    </Box>
  );
};

SearchItem.propTypes = {
  itm: PropTypes.object.isRequired,
  cattype: PropTypes.string,
};