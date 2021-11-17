/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import moment from 'moment';
import clsx from 'clsx';
import NextLink from 'next/link';
import React, {useState, useEffect, useMemo} from 'react';
import {Skeleton, Box, Button, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import RoundInfo from 'components/RoundInfo';
import {planService} from 'services';
import styles from './styles';
const Plan = ({user, switchToUpgrade, ...rest}) => {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();

  const [isLoading, setLoadingStatus] = useState(false);
  const [usage, setUsage] = useState({});
  useEffect(() => {
    setLoadingStatus(true);
    return planService.getUsage(user.id)
      .then((response) => {
        setUsage({...response.data, payend: response.enddate});
        setLoadingStatus(false);
      });
  }, []);

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
            onClick={e=>switchToUpgrade()}
          >
            プラン変更
          </Button>
        </Box>
        <Box className={clsx(classes.contentWrapper, classes.smallShadow)}>
          <Typography className={clsx(classes.boldFont, classes.mb30)}>Plan usage</Typography>
          <Box>
            <Box className={clsx(classes.planGrid, classes.mb20)}>
              <Box className={classes.planDetail}>
                <span>Search pages </span>
                {/* <RoundInfo marginLeft={1} /> */}
              </Box>
              {isLoading ? (
                <Skeleton width={'100%'} height={20} sx={{transform:'unset'}}/>
              ) : (
                <>
                  <Typography className={classes.planUsageText}>{`${usage.pagesuse} of ${usage.pagesplan}`}</Typography>
                  <Box 
                    className={classes.planUsageWrapper}
                  >
                    <Box 
                      className={classes.planUsage}
                      sx={{width: `${usage.pagesplan > 0 ? usage.pagesuse / usage.pagesplan * 100 : 100}%`}}
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box className={clsx(classes.planGrid, classes.mb20)}>
              <Box className={classes.planDetail}>
                <span>Profile summaries </span>
                {/* <RoundInfo marginLeft={1} /> */}
              </Box>
              {isLoading ? (
                <Skeleton width={'100%'} height={20} sx={{transform:'unset'}}/>
              ) : (
                <>
                  <Typography className={classes.planUsageText}>{`${usage.profiesuse} of ${usage.profiesplan}`}</Typography>
                  <Box 
                    className={classes.planUsageWrapper}
                  >
                    <Box 
                      className={classes.planUsage}
                      sx={{width: `${usage.profiesplan > 0 ? usage.profiesuse / usage.profiesplan * 100 : 100}%`}}
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box className={clsx(classes.planGrid, classes.mb20)}>
              <Box className={classes.planDetail}>
                <span>Full reports </span>
                {/* <RoundInfo marginLeft={1} /> */}
              </Box>
              {isLoading ? (
                <Skeleton width={'100%'} height={20} sx={{transform:'unset'}}/>
              ) : (
                <>
                  <Typography className={classes.planUsageText}>{`${usage.reportsuse} of ${usage.reportsplan}`}</Typography>
                  <Box 
                    className={classes.planUsageWrapper}
                  >
                    <Box 
                      className={classes.planUsage}
                      sx={{width: `${usage.reportsplan > 0 ? usage.reportsuse / usage.reportsplan * 100 : 100}%`}}
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box className={clsx(classes.planGrid, classes.mb20)}>
              <Box className={classes.planDetail}>
                <span>Profiles in CSV export </span>
                {/* <RoundInfo marginLeft={1} /> */}
              </Box>
              {isLoading ? (
                <Skeleton width={'100%'} height={20} sx={{transform:'unset'}}/>
              ) : (
                <>
                  <Typography className={classes.planUsageText}>{`${usage.csvuse} of ${usage.csvplan}`}</Typography>
                  <Box 
                    className={classes.planUsageWrapper}
                  >
                    <Box 
                      className={classes.planUsage}
                      sx={{width: `${usage.csvplan > 0 ? usage.csvuse / usage.csvplan * 100 : 100}%`}}
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box className={clsx(classes.planGrid)}>
              <Box className={classes.planDetail}>
                <span>{`月間使用可能量は${moment(usage.payend).diff(moment(), 'days')}日後の${moment(usage.payend).format('YYYY年MM月DD日')}にリセットされます`} </span>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* <Typography
          sx={{
            marginTop: '20px',
            fontSize: '0.8rem'
          }}
        >
          To temporarily pause your subscription for up to 3 months, click <NextLink href="#">here</NextLink>. This is best for service providers with an unpredictable project timeline.
        </Typography> */}
      </Box>
    </Box>
  );
};

export default Plan;
