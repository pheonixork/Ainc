/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import SaveDlg from './SaveDlg';

export default function SearchItem({itm, idx}) {
  const [showDlg, setShow] = useState(false);

  const evaluateValue = (val) => {
    if (val > 1000 * 1000)
      return (val / (1000 * 1000)).toFixed(1) + 'M'
    else if (val > 1000)
      return (val / 1000).toFixed(1) + 'K'

    return val
  }

  const closeDlg = () => {
    setShow(false);
  }

  return (
    <Box 
      className='research-content-item'>
      <Box
        component={LazyLoadImage}
        effect="blur"
        src={itm.avatar}
        height={'3.125rem'}
        width={'3.125rem'}
        sx={{margin:'1rem', borderRadius:'50%'}}
      />
      <Box className='instagram'>
        <Box>{itm.name}</Box>
        <a className='instagram-link' href={itm.url}>@{itm.name}</a>
      </Box>
      <Box className='followers'>
        <Box className='first'>{evaluateValue(itm.followers)}</Box>
        <Box  className='second'>Followers</Box>
      </Box>
      <Box className='followers'>
        <Box className='first'>
          {evaluateValue(itm.engage)}<span>{`(${itm.per}%)`}</span>
        </Box>
        <Box  className='second'>Engagements(Engagement rate)</Box>
      </Box>
      <Box>
      </Box>
      <Box className='action'>
        <Box>
          <Box className='relative-action'>
            <Button onClick={e=>setShow(true)}>
              <svg fill="none" height="16" width="16" xmlns="http://www.w3.org/2000/svg" >
                <path d="M12.67 12l1.33.67V2c0-.73-.6-1.33-1.33-1.33H5.99c-.73 0-1.32.6-1.32 1.33h6.66c.74 0 1.34.6 1.34 1.33V12zM10 3.33H3.33C2.6 3.33 2 3.93 2 4.67v10.66l4.67-2 4.66 2V4.67c0-.74-.6-1.34-1.33-1.34z"></path>
              </svg>
              <span>保存</span>
            </Button>
            {showDlg === true && 
              <SaveDlg closeDlg={closeDlg} />
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

SearchItem.propTypes = {
  itm: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
};