import clsx from 'clsx';
import React from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

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
      <NextLink href="/" replace >
        <a style={{marginLeft: '2rem'}}>
          <Box
            display={'flex'} 
            component={'img'}
            src={'/images/logo/logo.png'}
            width={{ xs: 180, md: 220 }}
            height={1}
          />
        </a>
      </NextLink>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box marginLeft={5}>
          <NextLink href="/" replace >
            <a className={clsx(classes.nodecoration, 'menuItem')} >メーカー様向け</a>
          </NextLink>
        </Box>
        <Box marginLeft={5}>
          <NextLink href="/" replace >
            <a className={clsx(classes.nodecoration, 'menuItem')} >代理店様向け</a>
          </NextLink>
        </Box>
        <Box marginLeft={5}>
          <NextLink href="/" replace >
            <a className={clsx(classes.nodecoration, 'menuItem')} >お問い合わせ</a>
          </NextLink>
        </Box>
        <Box marginLeft={5}>
          <NextLink href="/signin-cover" replace >
            <Box 
              style={{
                backgroundColor: 'black',
                width: '140px',
                height: '40px',
                borderRadius: '20px',
                marginRight: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <a 
                style={{
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                ログイン
              </a>
              <ArrowCircleDownIcon fontSize="large" style={{marginLeft: '.5rem', transform: 'rotate(-90deg)'}} />
            </Box>
          </NextLink>
        </Box>
      </Box>
      {/*
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
      */}
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
};

export default Topbar;
