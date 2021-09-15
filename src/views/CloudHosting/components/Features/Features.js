/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { alpha } from '@mui/material/styles';
import { colors } from '@mui/material';

const mock = [
  {
    color: colors.lightBlue[500],
    title: 'Web Design',
    subtitle: 'Choose thousands of web design online course.',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    color: colors.yellow[500],
    title: 'Photography',
    subtitle: 'Choose thousands of photography online course.',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    color: colors.indigo[500],
    title: 'Video Creating',
    subtitle: 'Choose thousands of video creating online course.',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    color: colors.deepPurple[500],
    title: 'Graphic Design',
    subtitle: 'Choose thousands of graphic design online course.',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
      </svg>
    ),
  },
];

const Features = () => {
  const theme = useTheme();

  const LeftSide = () => (
    <Grid container spacing={4}>
      {mock.map((item, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          key={index}
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <Box
            display={'block'}
            width={1}
            sx={{
              transform: index % 2 === 1 ? { md: 'translateY(80px)' } : 'none',
            }}
          >
            <Box component={Card} padding={4} borderRadius={4} width={1}>
              <Box display={'flex'} flexDirection={'column'}>
                <Box
                  component={Avatar}
                  width={60}
                  height={60}
                  marginBottom={2}
                  bgcolor={alpha(item.color, 0.1)}
                  color={item.color}
                  variant={'rounded'}
                  borderRadius={3}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant={'h6'}
                  gutterBottom
                  sx={{ fontWeight: 700 }}
                >
                  {item.title}
                </Typography>
                <Typography color="text.secondary">{item.subtitle}</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box marginTop={2} display={'flex'} justifyContent={'flex-end'}>
                  <Button
                    endIcon={
                      <Box
                        component={'svg'}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={24}
                        height={24}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </Box>
                    }
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  const RightSide = () => (
    <Box data-aos={'zoom-in'}>
      <Box marginBottom={2}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'primary'}
        >
          SEAMLESS INTEGRATION
        </Typography>
      </Box>
      <Box marginBottom={2}>
        <Typography variant={'h4'} sx={{ fontWeight: 700 }} gutterBottom>
          The powerful and flexible theme for all kinds of businesses
        </Typography>
        <Typography color="text.secondary" variant={'h6'}>
          Send one-off and automated email, push, and in-app messages to people.
          <br />
          Create better stories.
        </Typography>
      </Box>
      <Grid container spacing={1}>
        {[
          'Lifetime Updates & Introduction and Working',
          'Tech support & Mutual Funds',
          'Tons of assets & Lifetime Updates',
          'Integration ready & Tech support',
        ].map((item, i) => (
          <Grid item xs={12} key={i}>
            <Box component={ListItem} disableGutters width={'auto'} padding={0}>
              <Box
                component={ListItemAvatar}
                minWidth={'auto !important'}
                marginRight={2}
              >
                <Box
                  component={Avatar}
                  bgcolor={theme.palette.secondary.main}
                  width={20}
                  height={20}
                >
                  <svg
                    width={12}
                    height={12}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Box>
              </Box>
              <ListItemText primary={item} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box marginTop={4}>
        <Button
          variant={'contained'}
          size={'large'}
          endIcon={
            <Box
              component={'svg'}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width={24}
              height={24}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </Box>
          }
        >
          Get started
        </Button>
      </Box>
    </Box>
  );

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
        <LeftSide />
      </Grid>
      <Grid item container alignItems={'center'} xs={12} md={6}>
        <RightSide />
      </Grid>
    </Grid>
  );
};

export default Features;
