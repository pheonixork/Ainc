import * as React from 'react';
import Box from '@mui/material/Box';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Rating({ rating }) {
  return (
    <Box className="ratingContainer">
      {
        Array.from({
            length: rating
          }, (_, i) => i + 1
        ).map(i => {
          return (
            <Box
              component={LazyLoadImage}
              effect="blur"
              src={'/images/svgs/star.svg'}
              height={'20px'}
              width={'20px'}
            />
          )
        })
      }      
    </Box>
  );
}