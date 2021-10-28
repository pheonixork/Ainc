/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import clsx from 'clsx';
import NextLink from 'next/link';
import React, {useState, useEffect, useMemo} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import RoundInfo from 'components/RoundInfo';
import styles from './styles';
const Plan = ({...rest}) => {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();

  return (
    <Box className="planWrapper" {...rest}>
      <Box className={clsx(classes.contentWrapper, classes.bigShadow)}>
        <Typography className={classes.boldFont} variant={'h5'}>My Plan: Advanced Monthly</Typography>
        <Box className={classes.planSubtitle}>
          <Typography>
            Your plan will automatically renew on <span style={{fontWeight:'900'}}>27 Oct 2021</span> and you'll be <span style={{fontWeight:'900'}}>charged 498 USD + Vat (if applied).</span>
          </Typography>
          <Button
            className={'active'}
            variant={'outlined'}
            size='medium'
          >
            Switch Plan
          </Button>
        </Box>
        <Box className={clsx(classes.contentWrapper, classes.smallShadow)}>
          <Typography className={clsx(classes.boldFont, classes.mb30)}>Plan usage</Typography>
          <Box>
            <Box className={clsx(classes.planGrid, classes.mb20)}>
              <Box className={classes.planDetail}>
                <span>Search pages </span>
                <RoundInfo marginLeft={1} />
              </Box>
              <Typography className={classes.planUsageText}>958 of 8000</Typography>
              <Box 
                className={classes.planUsageWrapper}
              >
                <Box 
                  className={classes.planUsage}
                  sx={{
                    width: '5%',
                  }}
                />
              </Box>
            </Box>
            <Box className={clsx(classes.planGrid, classes.mb20)}>
              <Box className={classes.planDetail}>
                <span>Profile summaries </span>
                <RoundInfo marginLeft={1} />
              </Box>
              <Typography className={classes.planUsageText}>700 of 700</Typography>
              <Box 
                className={classes.planUsageWrapper}
              >
                <Box 
                  className={classes.planUsage}
                  sx={{
                    width: '100%',
                  }}
                />
              </Box>
            </Box>
            <Box className={clsx(classes.planGrid, classes.mb20)}>
              <Box className={classes.planDetail}>
                <span>Full reports </span>
                <RoundInfo marginLeft={1} />
              </Box>
              <Typography className={classes.planUsageText}>300 of 300</Typography>
              <Box 
                className={classes.planUsageWrapper}
              >
                <Box 
                  className={classes.planUsage}
                  sx={{
                    width: '100%',
                  }}
                />
              </Box>
            </Box>
            <Box className={clsx(classes.planGrid, classes.mb20)}>
              <Box className={classes.planDetail}>
                <span>Profiles in CSV export </span>
                <RoundInfo marginLeft={1} />
              </Box>
              <Typography className={classes.planUsageText}>0 of 700</Typography>
              <Box 
                className={classes.planUsageWrapper}
              >
                <Box 
                  className={classes.planUsage}
                  sx={{
                    width: '0%',
                  }}
                />
              </Box>
            </Box>
            <Box className={clsx(classes.planGrid, classes.mb20)}>
              <Box className={classes.planDetail}>
                <span>Influencers in Monitoring campaigns </span>
                <RoundInfo marginLeft={1} />
              </Box>
              <Typography className={classes.planUsageText}>0 of 500</Typography>
              <Box 
                className={classes.planUsageWrapper}
              >
                <Box 
                  className={classes.planUsage}
                  sx={{
                    width: '0%',
                  }}
                />
              </Box>
            </Box>
            <Box className={clsx(classes.planGrid)}>
              <Box className={classes.planDetail}>
                <span>Monthly usage resets in 13 days, on 27 Oct 2021. </span>
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{
            marginTop: '20px',
            fontSize: '0.8rem'
          }}
        >
          To temporarily pause your subscription for up to 3 months, click <NextLink href="#">here</NextLink>. This is best for service providers with an unpredictable project timeline.
        </Typography>
      </Box>
    </Box>
  );
};

export default Plan;
