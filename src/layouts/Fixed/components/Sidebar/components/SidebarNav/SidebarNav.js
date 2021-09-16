import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const SidebarNav = ({ pages, onClose }) => {
  const theme = useTheme();
  const [activeLink, setActiveLink] = useState('');
  useEffect(() => {
    setActiveLink(window && window.location ? window.location.pathname : '');
  }, []);

  return (
    <Box 
      className='sidebar-nav'
      paddingBottom={2}
      >
      <Box
        component="a"
        href="/"
        title="Modash"
        marginLeft={2.5}
        width={{ xs: 100, md: 120 }}
        height={ 42 }
      >
        <Image
          priority
          src={'/images/logo/logo-negative.svg'}
          width={100}
          height={34}
        />
      </Box>
      <Box
        justifyContent={'flex-end'}
        onClick={() => onClose()}
        display={{ xs: 'flex', md: 'none' }}
      >
        <CloseIcon fontSize="small" />
      </Box>
      <Box marginTop={4}>
        {pages.navigation.map((item, i) => (
          <Box key={i} 
            paddingTop={1}
            paddingBottom={1}>
            <Button
              component={'a'}
              href={item.href}
              target={item.target}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                color: 'white',
                backgroundColor: 'transparent',
                fontWeight: activeLink === item.href ? 600 : 400,
              }}
            >
              <Box
                component={'img'}
                src={item.icon}
                height={24}
                width={50}
                paddingRight={1}
                paddingLeft={0.5}
              />
              {item.title}
            </Button>
          </Box>
        ))}
      </Box>
      <Box 
        sx={{
          marginTop: 'auto'
        }} >
        {pages.settings.map((item, i) => (
          <Box key={i} 
            paddingTop={1}
            paddingBottom={1}>
            <Button
              component={'a'}
              href={item.href}
              target={item.target}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                color: 'white',
                backgroundColor: 'transparent',
                fontWeight: activeLink === item.href ? 600 : 400,
              }}
            >
              <Box
                component={'img'}
                src={item.icon}
                height={24}
                width={50}
                paddingRight={1}
                paddingLeft={0.5}
              />
              {item.title}
            </Button>
          </Box>
        ))}  
      </Box>
    </Box>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default SidebarNav;
