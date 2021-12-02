import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Footer = () => {
  return (
    <Box 
      display={'flex'}
      alignItems={'center'}
    >
      <Box
        display={'flex'} 
        component={'img'}
        src={'/images/logo/logo_footer.svg'}
        width={70}
        height={90}
      />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexDirection={'column'}
        width={'100%'}
        marginLeft={4}
        marginRight={5}
      >
        <Typography
          color='black'
          fontWeight={'500'}
          variant={'subtitle2'}
        >
          株式会社A / A Inc.
        </Typography>
        <Typography
          color='black'
          fontWeight={'500'}
          variant={'subtitle2'}
        >
          〒150-6139 東京都渋谷区渋谷2-24-12渋谷スクランブルスクエア39F
        </Typography>
        <Typography
          color='black'
          fontWeight={'500'}
          variant={'subtitle2'}
        >
          Website
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
