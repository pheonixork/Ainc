import moment from 'moment';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import dynamic from 'next/dynamic'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import RelativeImage from 'components/RelativeImage';
import {evaluateValue} from 'constants/constants';

const Chart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
)

const useStyles = makeStyles({
  sponsorposts: {
    marginTop: '2rem'
  },

  ellipseCaption: {
    padding: '.5rem',
    fontSize: '12px',
    display: '-webkit-box',
    overflow: 'hidden',
    lineHeight: 1.4,
    textOverflow: 'ellipsis',
    '-webkitBoxOrient': 'vertical',
    '-webkitLineClamp': 4,
  },
});

const SponsorPosts = ({data}) => {
  const classes = useStyles();

  return (
    <Box className={classes.sponsorposts}>
      <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
        <span>PR投稿</span>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '1fr 1fr 1fr'}}>
        {_.map(data, (itm, idx) => (
          <Box key={idx} className='box-wrapper-shadow grid-item nopadding' sx={{width:'200px'}}>
            <Box className='subtitle1 mgl5 mgt5'>{`${moment(itm.created).format('YYYY年M月D日')}`}</Box>
            <Box 
              component='a'
              href={`${itm.url}`}
              target='_blank'
            >
              <RelativeImage 
                sx={{height:'150px !important'}}
                imgSrc={`${itm.thumbnail}`}
              />
            </Box>
            <Box display={'flex'} className='mgb5 mgt5'>
              <Box className='mgr5 mgl5' sx={{fontSize:'12px', display: 'flex', alignItems: 'center'}}>
                <svg height="12" width="12" fill="none" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" className='mgr10'>
                  <path d="M10.2143 15.5319C9.53055 16.1575 8.47795 16.1575 7.79422 15.5229L7.69526 15.4322C2.97207 11.1255 -0.113742 8.30573 0.00321271 4.78783C0.057192 3.24649 0.839891 1.76861 2.1084 0.8982C4.48349 -0.733813 7.41636 0.0277934 8.99975 1.89554C10.5831 0.0277934 13.516 -0.74288 15.8911 0.8982C17.1596 1.76861 17.9423 3.24649 17.9963 4.78783C18.1222 8.30573 15.0274 11.1255 10.3043 15.4503L10.2143 15.5319Z" fill="#e88585"></path>
                </svg>
                {evaluateValue(itm.likes)}
              </Box>
              <Box className='mgr5 mgl5' sx={{fontSize:'12px', display: 'flex', alignItems: 'center'}}>
                <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg" className='mgr10'>
                  <path d="M10.8 0H1.2C0.54 0 0 0.54 0 1.2V8.4C0 9.06 0.54 9.6 1.2 9.6H9.6L12 12V1.2C12 0.54 11.46 0 10.8 0ZM9 7.2H3C2.67 7.2 2.4 6.93 2.4 6.6C2.4 6.27 2.67 6 3 6H9C9.33 6 9.6 6.27 9.6 6.6C9.6 6.93 9.33 7.2 9 7.2ZM9 5.4H3C2.67 5.4 2.4 5.13 2.4 4.8C2.4 4.47 2.67 4.2 3 4.2H9C9.33 4.2 9.6 4.47 9.6 4.8C9.6 5.13 9.33 5.4 9 5.4ZM9 3.6H3C2.67 3.6 2.4 3.33 2.4 3C2.4 2.67 2.67 2.4 3 2.4H9C9.33 2.4 9.6 2.67 9.6 3C9.6 3.33 9.33 3.6 9 3.6Z" fill="#4aabed"></path>
                </svg>
                {evaluateValue(itm.comments)}
              </Box>
            </Box>
            <Box className={classes.ellipseCaption}>
              {itm.text}
            </Box>
          </Box>
        ))}
        
      </Box>
    </Box>
  );
};

export default SponsorPosts;