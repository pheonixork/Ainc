import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  Hero,
  Services,
  Tools,
  Plugins,
  Sponsors,
  Recruiting
} from './components';

const IndexView = () => {
  const theme = useTheme();
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Main>
        <Hero />
        <Services/>
        <Tools/>
        <Plugins/>
        <Sponsors/>
        <Recruiting/>
      </Main>
    </Box>
  );
};

export default IndexView;
