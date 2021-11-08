import clsx from 'clsx';
import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import RoundInfo from 'components/RoundInfo';

const UsageInfo = ({getUsages, classes}) => {
  const [usage, setUsage] = useState(getUsages());
  return (
    <Box>
      <Box className="user-wrapper-shadow user-padding-small" sx={{margin: '10px'}}>
        <Typography className={classes.userdetailwrappertitle} sx={{fontSize: '16px !important'}}>Plan usage</Typography>
        <Box className={clsx(classes.displayflex, classes.justifybetween)} sx={{margin: '20px 10px'}}>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>Search pages</Typography>
            <RoundInfo marginLeft={1}/>
          </Box>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>{`${usage.pagesuse} of ${usage.pagesplan}`}</Typography>
            <Box className={classes.barcandle}>
              <Box className={classes.barcandleprogress} sx={{width: `${usage.pagesplan > 0 ? usage.pagesuse / usage.pagesplan * 100 : 100}%`}}></Box>
            </Box>
          </Box>
        </Box>
        <Box className={clsx(classes.displayflex, classes.justifybetween)} sx={{margin: '20px 10px'}}>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>Profile summaries</Typography>
            <RoundInfo marginLeft={1}/>
          </Box>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>{`${usage.profiesuse} of ${usage.profiesplan}`}</Typography>
            <Box className={classes.barcandle}>
              <Box className={classes.barcandleprogress} sx={{width: `${usage.profiesplan > 0 ? usage.profiesuse / usage.profiesplan * 100 : 100}%`}}></Box>
            </Box>
          </Box>
        </Box>
        <Box className={clsx(classes.displayflex, classes.justifybetween)} sx={{margin: '20px 10px'}}>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>Full reports</Typography>
            <RoundInfo marginLeft={1}/>
          </Box>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>{`${usage.reportsuse} of ${usage.reportsplan}`}</Typography>
            <Box className={classes.barcandle}>
              <Box className={classes.barcandleprogress} sx={{width: `${usage.reportsplan > 0 ? usage.reportsuse / usage.reportsplan * 100 : 100}%`}}></Box>
            </Box>
          </Box>
        </Box>
        <Box className={clsx(classes.displayflex, classes.justifybetween)} sx={{margin: '20px 10px'}}>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>Profiles in CSV exports</Typography>
            <RoundInfo marginLeft={1}/>
          </Box>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>{`${usage.csvuse} of ${usage.csvplan}`}</Typography>
            <Box className={classes.barcandle}>
              <Box className={classes.barcandleprogress} sx={{width: `${usage.csvplan > 0 ? usage.csvuse / usage.csvplan * 100 : 100}%`}}></Box>
            </Box>
          </Box>
        </Box>
        <Box className={clsx(classes.displayflex, classes.justifybetween)} sx={{margin: '20px 10px'}}>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>Monthly usage resets in 24 days, on 12 Oct 2021.</Typography>
          </Box>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
          </Box>
        </Box>
      </Box>
      <Typography sx={{margin: '10px'}}>
        To temporarily pause your subscription for up to 3 months, click here. This is best for service providers with an unpredictable project timeline.
      </Typography>
    </Box>
  );
};

export default UsageInfo;