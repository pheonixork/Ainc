import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RoundInfo from 'components/RoundInfo';
import RelativeImage from 'components/RelativeImage';
import Constants from 'constants/constants';

const useStyles = makeStyles({
  lazyBorderRound: {
    borderRadius: '50%',
  },
});

const Header = ({data, type, handleOpen}) => {
  const classes = useStyles();
  return (
    <Box className='header'>
      <RelativeImage
        isRound
        imgSrc={data.picture}
        sx={{width: '150px !important', height: '150px !important'}}
      />
      <Box className='mgt10'>
        <span style={{fontSize:'20px', fontWeight:600}}>{data.fullname}</span>
      </Box>
      <Box className='mgt10' sx={{display:'flex', alignItems:'center'}} >
        <svg height="10" width="14" fill="none" viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg">
          <path fill="#000" d="M21 5V4L18 6L15 4V5L17.72 6.82C17.89 6.93 18.11 6.93 18.27 6.82L21 5ZM22 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H22C23.1 18 23.99 17.1 23.99 16L24 2C24 0.9 23.1 0 22 0ZM8 3C9.66 3 11 4.34 11 6C11 7.66 9.66 9 8 9C6.34 9 5 7.66 5 6C5 4.34 6.34 3 8 3ZM14 15H2V14C2 12 6 10.9 8 10.9C10 10.9 14 12 14 14V15ZM21.5 9H14.5C14.22 9 14 8.78 14 8.5V3.5C14 3.22 14.22 3 14.5 3H21.5C21.78 3 22 3.22 22 3.5V8.5C22 8.78 21.78 9 21.5 9Z"></path>
        </svg>
        <span className='mgl5'>Contact info available (CSV export)</span>
        <RoundInfo className='mgl5' />
      </Box>
      {type === Constants.snsInstagram && 
        <a href={data.url} rel="noopener noreferrer" target="_blank">
          <Box
            className='mgt10'
            component={LazyLoadImage}
            effect="blur"
            src={'/images/svgs/instagram.svg'}
            width={'12px'}
            height={'15px'}
          />
          <span className="influencer-header-name">@{data.username}</span>
        </a>
      }
      {type === Constants.snsYoutube && 
        <a href={data.url} rel="noopener noreferrer" target="_blank">
          <Box
            className='mgr5'
            component={LazyLoadImage}
            effect="blur"
            src={'/images/svgs/youtube.svg'}
            width={'12px'}
            height={'15px'}
          />
          <span className="influencer-header-name">@{data.username}</span>
        </a>
      }
      {type === Constants.snsTiktok && 
        <a href={data.url} rel="noopener noreferrer" target="_blank">
          <Box
            className='mgr5'
            component={LazyLoadImage}
            effect="blur"
            src={'/images/svgs/tiktok.svg'}
            width={'12px'}
            height={'15px'}
          />
          <span className="influencer-header-name">@{data.username}</span>
        </a>
      }
      <Button 
        onClick={e=>handleOpen()}
        className='manager active mgt20' 
        variant={'outlined'}>
        フルレポートを表示
      </Button>
      <Box 
        className='mgt20' 
        sx={{
          display: 'flex', 
          justifyContent: 'space-between',
          width: '100%',
          paddingLeft: '1rem',
          paddingRight: '1rem'
        }}
      >
        <span>
          更新日：
        </span>
        <Button 
          variant={'outlined'}>
          更新
        </Button>
      </Box>
    </Box>
  );
};

Header.propTypes = {
  data: PropTypes.object.isRequired,
  handleOpen: PropTypes.func,
};

export default Header;