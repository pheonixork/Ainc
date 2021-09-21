import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import Container from './components/Container';
import { Topbar, Sidebar } from './components';
import pages from '../navigation-manager';

const Fixed = ({ children }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [collapsed, setCollapse] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  return (
    <Box>
      {!isMd && 
      <AppBar
        position={'fixed'}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
        elevation={0}
      >
        <Container maxWidth={1} paddingY={{ xs: 1, sm: 1.5 }}>
          <Topbar onSidebarOpen={handleSidebarOpen} />
        </Container>
      </AppBar>
      }
      <Sidebar
        setCollapse={setCollapse}
        onClose={handleSidebarClose}
        open={open}
        variant={isMd ? 'permanent' : 'temporary'}
        pages={pages}
        collapsed={collapsed}
      />
      <main className='manager'>
        <Box height={{ xs: 58, sm: 66, md: 0 }} />
        <Box
          display="flex"
          flex="1 1 auto"
          overflow="hidden"
          paddingLeft={{ md: collapsed ? '50px' : '256px' }}
        >
          <Box display="flex" flex="1 1 auto" overflow="hidden">
            <Box flex="1 1 auto" height="100%" overflow="auto">
              {children}
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
};

Fixed.propTypes = {
  children: PropTypes.node,
};

export default Fixed;
