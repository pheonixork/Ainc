/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import clsx from 'clsx';
import React, {useState, useEffect, useMemo} from 'react';
import {Box, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import styles from './styles';
import QABrief from './QABrief';
import PlanSelect from './PlanSelect';
import {planService} from 'services';

const Upgrade = ({...rest}) => {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();

  const [enterprise, setEnterprise] = useState({});
  const [advanced, setAdvanced] = useState({});
  const [performance, setPerformance] = useState({});
  const [essentials, setEssentials] = useState({});
  const [trial, setTrial] = useState({});

  useEffect(() => {
    planService.getAllPlans()
      .then((response) => {
        if (response.status !== 'ok')
          return;

        _.map(response.plans, itm => {
          if (itm.type === 'Enterprise')
            setEnterprise(itm);
          else if (itm.type === 'Advanced')
            setAdvanced(itm);
          else if (itm.type === 'Performance')
            setPerformance(itm);
          else if (itm.type === 'Essentials')
            setEssentials(itm);
          else if (itm.type === 'Free trial')
            setTrial(itm);
        })
      });
  }, []);

  return (
    <Box className="upgradeWrapper" {...rest}>
      <PlanSelect enterprise={enterprise} advanced={advanced} performance={performance} essentials={essentials} trial={trial} />
      <Box className={clsx(classes.mt50, classes.fontBold)} sx={{textAlign: 'center', color: '#555'}} data-aos={'fade-up'}>
        <Typography>結果を重視するマーケターに信頼されています。</Typography>
      </Box>
      <QABrief />
    </Box>
  );
};

export default Upgrade;
