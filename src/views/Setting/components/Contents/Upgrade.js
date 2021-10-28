/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import clsx from 'clsx';
import NextLink from 'next/link';
import React, {useMemo} from 'react';
import {Box, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import styles from './styles';
import DiscoveryTable from './DiscoveryTable';
import MonitorTable from './MonitorTable';
import RecommendTable from './RecommendTable';
import QABrief from './QABrief';
import PlanSelect from './PlanSelect';

const Upgrade = ({...rest}) => {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();

  return (
    <Box className="upgradeWrapper" {...rest}>
      <PlanSelect />
      <Box className={clsx(classes.contentWrapper, classes.smallShadow)} sx={{textAlign: 'center'}}>
        <Typography>
          If you're looking for something special, <NextLink href="#">book a call</NextLink> with us.
        </Typography>
      </Box>
      <Box className={classes.mt30} data-aos={'fade-up'}>
        <DiscoveryTable />
        <MonitorTable />
        <RecommendTable />
      </Box>
      <Box className={clsx(classes.mt50, classes.fontBold)} sx={{textAlign: 'center', color: '#555'}} data-aos={'fade-up'}>
        <Typography>Trusted by results-driven marketers at growth-focused companies</Typography>
      </Box>
      <Box className={classes.mt50} data-aos={'fade-up'}>
        <Box
          className={classes.mb30}
          component={'img'}
          src={'/images/svgs/billbanner.svg'}
          marginRight={1.5}
        />
      </Box>
      <QABrief />
    </Box>
  );
};

export default Upgrade;
