/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PhoneSkeletonIllustration from 'svg/illustrations/PhoneSkeleton';

const VideoSection = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={4}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: 'transparent',
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1600 900\'%3E%3Cdefs%3E%3ClinearGradient id=\'a\' x1=\'0\' x2=\'0\' y1=\'1\' y2=\'0\' gradientTransform=\'rotate(0,0.5,0.5)\'%3E%3Cstop offset=\'0\' stop-color=\'%230FF\'/%3E%3Cstop offset=\'1\' stop-color=\'%23CF6\'/%3E%3C/linearGradient%3E%3ClinearGradient id=\'b\' x1=\'0\' x2=\'0\' y1=\'0\' y2=\'1\' gradientTransform=\'rotate(0,0.5,0.5)\'%3E%3Cstop offset=\'0\' stop-color=\'%23F00\'/%3E%3Cstop offset=\'1\' stop-color=\'%23FC0\'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill=\'%23FFF\' fill-opacity=\'0\' stroke-miterlimit=\'10\'%3E%3Cg stroke=\'url(%23a)\' stroke-width=\'21.12\'%3E%3Cpath d=\'M1409 581 1450.35 511 1490 581z\'/%3E%3Ccircle stroke-width=\'7.040000000000001\' transform=\'\' cx=\'500\' cy=\'100\' r=\'40\'/%3E%3Cpath transform=\'\' d=\'M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z\'/%3E%3C/g%3E%3Cg stroke=\'url(%23b)\' stroke-width=\'6.4\'%3E%3Cpath transform=\'\' d=\'M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z\'/%3E%3Crect stroke-width=\'14.080000000000002\' transform=\'\' x=\'1039\' y=\'709\' width=\'100\' height=\'100\'/%3E%3Cpath transform=\'\' d=\'M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
          sx={{
            maxWidth: 450,
            position: 'relative',
            marginX: 'auto',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              borderRadius: '2.75rem',
              boxShadow: 1,
              width: '75% !important',
              marginX: 'auto',
            }}
          >
            <Box>
              <Box
                position={'relative'}
                zIndex={2}
                maxWidth={1}
                height={'auto'}
                sx={{ verticalAlign: 'middle' }}
              >
                <PhoneSkeletonIllustration />
              </Box>
              <Box
                position={'absolute'}
                top={'2.4%'}
                left={'4%'}
                width={'92.4%'}
                height={'96%'}
                sx={{
                  '& .lazy-load-image-loaded': {
                    height: 1,
                    width: 1,
                  },
                }}
              >
                <Box
                  component={LazyLoadImage}
                  src={
                    theme.palette.mode === 'light'
                      ? 'https://assets.maccarianagency.com/screenshots/crypto-mobile.png'
                      : 'https://assets.maccarianagency.com/screenshots/crypto-mobile--dark.png'
                  }
                  alt="Image Description"
                  effect="blur"
                  width={1}
                  height={1}
                  sx={{
                    objectFit: 'cover',
                    borderRadius: '2.5rem',
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(0.7)'
                        : 'none',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item container alignItems={'center'} xs={12} md={6}>
        <Box data-aos={'zoom-in'}>
          <Box marginBottom={2}>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{
                fontWeight: 700,
              }}
            >
              Now available on Google Play Market and Apple App Store
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography variant="h6" component="p" color="text.secondary">
              Don't listen to what they say go and see. Travelling with our app
              is easy. Join the biggest community of travellers.
            </Typography>
          </Box>
          <Box
            height={1}
            width={1}
            maxHeight={300}
            maxWidth={{ xs: '100%', sm: 400 }}
            marginTop={3}
          >
            <Box
              component={'iframe'}
              title="video"
              width="100%"
              height="100%"
              minHeight={250}
              src="https://www.youtube.com/embed/ClIbn_IF31U"
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              boxShadow={4}
              borderRadius={3}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default VideoSection;
