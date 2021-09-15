import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Fluid from 'layouts/Fluid';
import Container from 'components/Container';
import { Gallery, Headline, Numbers, Story, Team } from './components';

const AboutSideCover = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const Sidebar = () => (
    <Box
      flex={'1 1 30%'}
      maxWidth={'30%'}
      maxHeight={'100vh'}
      position={'sticky'}
      top={0}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        height={1}
        width={1}
        maxWidth={500}
        sx={{
          '& .lazy-load-image-loaded': {
            height: 1,
            width: 1,
          },
        }}
      >
        <Box
          component={LazyLoadImage}
          height={1}
          width={1}
          src={'https://assets.maccarianagency.com/backgrounds/img23.jpg'}
          alt="..."
          effect="blur"
          sx={{
            objectFit: 'cover',
            filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
            '& .lazy-load-image-loaded': {
              height: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
  return (
    <Fluid>
      <Box position={'relative'} minHeight={'100vh'} display={'flex'}>
        {isMd ? <Sidebar /> : null}
        <Box
          flex={{ xs: '1 1 100%', md: '1 1 70%' }}
          maxWidth={{ xs: '100%', md: '70%' }}
        >
          <Box height={1}>
            <Container>
              <Headline />
            </Container>
            <Container paddingY={'0 !important'}>
              <Gallery />
            </Container>
            <Container maxWidth={'800px !important'}>
              <Numbers />
            </Container>
            <Container maxWidth={'800px !important'}>
              <Divider />
            </Container>
            <Container>
              <Story />
            </Container>
            <Container maxWidth={'800px !important'}>
              <Divider />
            </Container>
            <Container>
              <Team />
            </Container>
          </Box>
        </Box>
      </Box>
    </Fluid>
  );
};

export default AboutSideCover;
