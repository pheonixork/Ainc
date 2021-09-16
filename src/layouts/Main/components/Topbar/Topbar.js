import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { NavItem, ThemeModeToggler } from './components';

const Topbar = ({ onSidebarOpen, pages }) => {
  const theme = useTheme();
  const { mode } = theme.palette;
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
      <Box
        display={'flex'}
        component="a"
        href="/"
        title="theFront"
        width={{ xs: 100, md: 120 }}
      >
        <Box
          component={'img'}
          src={
            mode === 'light'
              ? 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e97bda30ead14b24c69f2_Modash_logo_horizontal%20lockup_color-neutral.svg'
              : 'https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e97bda30ead14b24c69f2_Modash_logo_horizontal%20lockup_color-neutral.svg'
          }
          height={1}
          width={1}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box>
          <Link
            underline="none"
            component="a"
            href="/"
            color="text.primary"
            className='menuItem'
          >
            Blog
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
          <Link
            underline="none"
            component="a"
            href="/"
            color="text.primary"
            className='menuItem'
          >
            Pricing
          </Link>
        </Box>

        <Box marginLeft={5}>
          <Link
            underline="none"
            component="a"
            href="/signin-cover"
            color="text.primary"
            className='menuItem'
          >
            LOG IN
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
        <Box marginRight={2}>
          <ThemeModeToggler />
        </Box>
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
