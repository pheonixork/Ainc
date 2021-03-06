import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';

import Container from 'components/Container';
import { Topbar, Sidebar, Footer } from './components';
import pages from '../navigation';

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

const Main = ({ children }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

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
      <AppBar
        position={'fixed'}
        sx={{
          backgroundColor: 'white', //theme.palette.mode === 'light' ? '#d6daff' : '#3b4972',
          boxShadow: 'none !important'
        }}
        elevation={1}
      >
        <Box paddingY={{ xs: 1, sm: 1.5 }}>
          <Topbar onSidebarOpen={handleSidebarOpen} pages={pages} />
        </Box>
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant="temporary"
        pages={pages}
      />
      <main>
        <Box height={{ xs: 58, sm: 66 }} />
        {children}
        <Divider />
      </main>
      <Box
        backgroundColor={'#F7F8FA'}
      >
        <Container paddingY={8} >
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
