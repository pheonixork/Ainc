import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

const SidebarNav = ({ pages, variant, collapsed, onClose, setCollapse }) => {
  const [activeLink, setActiveLink] = useState('');
  useEffect(() => {
    let pathname = window && window.location ? window.location.pathname : '';
    let splitPath = pathname.split('/');

    setActiveLink(splitPath.length > 1 ? splitPath[1] : '');
  }, []);

  return (
    <Box 
      className='sidebar-nav'
      paddingBottom={2}
      >
      <Box marginLeft={0.5}>
        <Box className='logo'>
          {(variant !== 'permanent' || !collapsed) && 
          <Box
            marginLeft={2}
            component="a"
            href="/"
            title="Modash"
          >
            <Box
              component={'img'}
              src={'/images/logo/logo.svg'}
              height={34}
              width={100}
            />
          </Box>
          }
          <Button
            aria-label="Menu"
            variant={'outlined'}
            sx={{
              borderRadius: 2,
              minWidth: 'auto',
              padding: 1,
              border: '1px solid transparent',
              marginRight: '12px',
              color: '#C48BFF',
              '&:hover': {
                borderColor: '#C48BFF'
              }
            }}
            onClick={evt=>variant === 'permanent' ? setCollapse(!collapsed) : onClose()}
          >
            {variant === 'permanent' ? <MenuIcon /> : <CloseIcon fontSize="small" />}
          </Button>
        </Box>
      </Box>
      {/* <Box
        justifyContent={'flex-end'}
        onClick={() => onClose()}
        display={{ xs: 'flex', md: 'none' }}
      >
        <CloseIcon fontSize="small" />
      </Box> */}
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
              className='nav-itm'
              sx={{
                fontWeight: item.href.startsWith('/' + activeLink) ? 600 : 400,
                backgroundColor: item.href.startsWith('/' + activeLink) ? '#816BF7' : 'transparent',
                '&:Hover': {
                  backgroundColor: '#6883E4'
                }
              }}
            >
              <Box
                component={'img'}
                src={item.icon}
                height={24}
                width={24}
                marginRight={1.5}
              />
              {(variant !== 'permanent' || !collapsed) && item.title}
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
              className='nav-itm'
              sx={{
                fontWeight: activeLink === item.href ? 600 : 400,
                backgroundColor: activeLink === item.href ? '#ffffff35' : 'transparent',
                '&:Hover': {
                  backgroundColor: '#ffffff35'
                }
              }}
            >
              <Box
                component={'img'}
                src={item.icon}
                height={24}
                width={24}
                marginRight={1.5}
              />
              {(variant !== 'permanent' || !collapsed) && item.title}
            </Button>
          </Box>
        ))}  
      </Box>
    </Box>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.object.isRequired,
  collapsed: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  setCollapse: PropTypes.func,
};

export default SidebarNav;
