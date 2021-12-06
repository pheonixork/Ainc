import _ from 'lodash';
import clsx from 'clsx';
import React, {useEffect, useMemo, useState} from 'react';
import {Typography, Box, Button, FormControlLabel, Switch} from '@mui/material';
import {useTheme, styled} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import styles from './styles';
import DiscoveryTable from './DiscoveryTable';
import MonitorTable from './MonitorTable';
import RecommendTable from './RecommendTable';
import NextLink from 'next/link';

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function PlanSelect({enterprise, advanced, performance, essentials, trial}) {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();
  const [isAnnualy, setMonth] = useState(false);
  const formatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });
  return (
    <Box>
      <Box>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography>月額</Typography>
          <Android12Switch 
            checked={isAnnualy}
            onChange={e=>setMonth(e.target.checked)}
          />
          <Typography>年額(20%OFF)</Typography>
        </Box>
        <Box className={clsx(classes.upgradeselect, classes.mt30, classes.mb40)}>
          <Box className={clsx(classes.upgradeplanitem)}>
            <Typography className={clsx(classes.upgradeplantitle, classes.upgradeenterprise)}>Enterprise</Typography>
            <Typography 
              className={classes.upgradeplandetail}
              style={{
                marginTop: '5.2rem',
                marginBottom: 0,
                whiteSpace: 'pre-wrap'
              }}
            >
              {'大規模な検索プランも\r\n用意できます\r\n気軽にお問合せください'}
            </Typography>
            <Box className={classes.upgradeplanbutton}>
              <Button
                className={classes.upgradeenterprisebtn}
                variant={'outlined'}
                size='medium'
              >
                Book a call
              </Button>
            </Box>
          </Box>
          <Box className={clsx(classes.upgradeplanitem)}>
            <Typography className={clsx(classes.upgradeplantitle, classes.upgradeadvanced)}>Advanced</Typography>
            <Typography className={classes.upgradeplandetail} style={{whiteSpace: 'pre-wrap'}}>
              {'ブランドの急速な進化を\r\n(DB機能搭載・代理店向け)'}
            </Typography>
            <Box>
              <Box className={classes.upgradeplanmoney}>
                <span>
                  {formatter.format(!isAnnualy ? (advanced.monthval ?? 0) : (advanced.monthval ? advanced.monthval * 0.8 : 0))}
                  <span className={classes.upgradelabel}>/月</span>
                </span> 
              </Box>
              {isAnnualy && 
                <Box className={classes.upgradeplandivide}>
                  {`年間で${formatter.format(advanced.monthval ? (Math.floor(advanced.monthval * 0.8)) * 12 : 0)}の請求になります`}
                </Box>
              }
            </Box>
            <Box className={classes.upgradeplanbutton}>
              <Button
                className={classes.upgradeadvancedbtn}
                variant={'outlined'}
                size='medium'
              >
                My plan
              </Button>
            </Box>
          </Box>
          <Box className={clsx(classes.upgradeplanitem)}>
            <Typography className={clsx(classes.upgradeplantitle, classes.upgradeperformance)}>Performance</Typography>
            <Typography className={classes.upgradeplandetail} style={{whiteSpace: 'pre-wrap'}}>
              {'ブランドの確かな成長を\r\n(DB機能搭載・ブランド向け)'}
            </Typography>
            <Box>
              <Box className={classes.upgradeplanmoney}>
                <span>
                  {formatter.format(!isAnnualy ? (performance.monthval ?? 0) : (performance.monthval ? performance.monthval * 0.8 : 0))}
                  <span className={classes.upgradelabel}>/月</span>
                </span>
              </Box>
              {isAnnualy && 
                <Box className={classes.upgradeplandivide}>
                  {`年間で${formatter.format(performance.monthval ? (Math.floor(performance.monthval * 0.8)) * 12 : 0)}の請求になります`}
                </Box>
              }
            </Box>
            <Box className={classes.upgradeplanbutton}>
              <Button
                className={classes.upgradeperformancebtn}
                variant={'outlined'}
                size='medium'
              >
                Down grade
              </Button>
            </Box>
          </Box>
          <Box className={clsx(classes.upgradeplanitem, 'upgradeselected')}>
            <Typography className={clsx(classes.upgradeplantitle, classes.upgradeessentials)}>Essentials</Typography>
            <Typography className={classes.upgradeplandetail} style={{whiteSpace: 'pre-wrap'}}>
              {'マーケティングに必須\r\n(個人向け)'}
            </Typography>
            <Box>
              <Box className={classes.upgradeplanmoney}>
                <span>
                  {formatter.format(!isAnnualy ? (essentials.monthval ?? 0) : (essentials.monthval ? essentials.monthval * 0.8 : 0))}
                  <span className={classes.upgradelabel}>/月</span>
                </span>
              </Box>
              {isAnnualy && 
                <Box className={classes.upgradeplandivide}>
                  {`年間で${formatter.format(essentials.monthval ? (Math.floor(essentials.monthval * 0.8) * 12) : 0)}の請求になります`}
                </Box>
              }
            </Box>
            <Box className={classes.upgradeplanbutton}>
              <Button
                className={classes.upgradeessentialsbtn}
                variant={'outlined'}
                size='medium'
              >
                Down grade
              </Button>
            </Box>
          </Box>
          <Box className={clsx(classes.upgradeplanitem)}>
            <Typography className={clsx(classes.upgradeplantitle, classes.upgradetrial)}>Free trial</Typography>
            <Typography 
              className={classes.upgradeplandetail}
              style={{
                marginTop: '5.2rem',
                marginBottom: 0,
                whiteSpace: 'pre-wrap'
              }}
            >
              {'最初の14日間限定の\r\nフリートライアルプラン'}
            </Typography>
            <Box className={classes.upgradeplanbutton}>
              <Button
                className={classes.upgradetrialbtn}
                variant={'outlined'}
                size='medium'
              >
                Downgrade
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>  
      <Box className={clsx(classes.contentWrapper, classes.smallShadow)} sx={{textAlign: 'center'}}>
        <Typography>
          If you're looking for something special, <NextLink href="#">book a call</NextLink> with us.
        </Typography>
      </Box>
      <Box className={classes.mt30} data-aos={'fade-up'}>
        <DiscoveryTable isAnnualy={isAnnualy} enterprise={enterprise} advanced={advanced} performance={performance} essentials={essentials} trial={trial}/>
        <RecommendTable />
      </Box>
    </Box>
  );
}