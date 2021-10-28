import _ from 'lodash';
import clsx from 'clsx';
import React, {useMemo} from 'react';

import {Typography, Box, Button, FormControlLabel, Switch} from '@mui/material';
import {useTheme, styled} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import styles from './styles';

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

export default function PlanSelect() {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography>Monthly</Typography>
        <Android12Switch defaultChecked />
        <Typography>Annually (save 10%)</Typography>
      </Box>
      <Box className={clsx(classes.upgradeselect, classes.mt30, classes.mb40)}>
        <Box className={clsx(classes.upgradeplanitem)}>
          <Typography className={clsx(classes.upgradeplantitle, classes.upgradeenterprise)}>Enterprise</Typography>
          <Typography 
            className={classes.upgradeplandetail}
            style={{
              marginTop: '5.2rem',
              marginBottom: 0
            }}
          >
            Need to go bigger? Book a call
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
          <Typography className={classes.upgradeplandetail}>
            Ideal for larger teams
          </Typography>
          <Box>
            <Box className={classes.upgradeplanmoney}>
              $498
              <span className={classes.upgradeplanperiod}>/month</span>
            </Box>
            <Box className={classes.upgradeplandivide} />
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
          <Typography className={classes.upgradeplandetail}>
            Ideal for scaling brands
          </Typography>
          <Box>
            <Box className={classes.upgradeplanmoney}>
              $274
              <span className={classes.upgradeplanperiod}>/month</span>
            </Box>
            <Box className={classes.upgradeplandivide} />
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
          <Typography className={classes.upgradeplandetail}>
            Ideal for getting serious
          </Typography>
          <Box>
            <Box className={classes.upgradeplanmoney}>
              $109
              <span className={classes.upgradeplanperiod}>/month</span>
            </Box>
            <Box className={classes.upgradeplandivide} />
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
              marginBottom: 0
            }}
          >
            Your first 14 days on a limited trial plan
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
  );
}