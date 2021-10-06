import clsx from 'clsx';
import React from 'react';
import Link from 'next/Link';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { NavItem } from './components';

const useStyles = makeStyles({
  nodecoration: {
    color: '#2d3748',
    textDecoration: 'none'
  },
});

const Topbar = ({ onSidebarOpen, pages }) => {
  const theme = useTheme();
  const classes = useStyles();
  const {
    features: features,
  } = pages;

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Link href="/" replace >
        <a>
          <Box
            display={'flex'} 
            component={'img'}
            src={'/images/logo/logo.png'}
            width={{ xs: 180, md: 220 }}
            height={1}
          />
        </a>
      </Link>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box>
          <Link href="/" replace >
            <a className={clsx(classes.nodecoration, 'menuItem')} >Blog</a>
          </Link>
        </Box>
        <Box marginLeft={5}>
          <NavItem
            title={'Features'}
            id={'features'}
            items={features}
          />
        </Box>
        <Box marginLeft={5}>
          <Link href="/" replace >
            <a className={clsx(classes.nodecoration, 'menuItem')} >Pricing</a>
          </Link>
        </Box>

        <Box marginLeft={5}>
          <Link href="/signin-cover" replace >
            <a className={clsx(classes.nodecoration, 'menuItem')} >LOG IN</a>
          </Link>
        </Box>
        <Box marginLeft={5}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth={true}
          >
            TRY FOR FREE
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
};

export default Topbar;
