import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {useMainContext} from 'context/MainContext';
import {userService} from 'services';

const SidebarNav = ({pages, variant, collapsed, onClose, setCollapse}) => {
  const {userInfo} = useMainContext();
  const [activeLink, setActiveLink] = useState('');
  const [curLink, setCurrentLink] = useState('');
  useEffect(() => {
    let pathname = window && window.location ? window.location.pathname : '';
    let splitPath = pathname.split('/');

    setCurrentLink(pathname);
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
          <NextLink href="/" passHref replace>
            <Box
              component="a"
              title="Modash"
            >
              <Box
                component={'img'}
                src={'/images/logo/logo_white.png'}
                height={34}
                width={180}
              />
            </Box>
          </NextLink>
          }
          <Button
            aria-label="Menu"
            variant={'outlined'}
            className="side-bar-button"
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
      {userService.userValue.role === Constants.roleInfo.admin ? (
        <>
          <Box marginTop={4}>
            {pages.users.map((item, i) => (
              <Box key={i} >
                <NextLink href={item.href} passHref replace>
                  <Button component={'a'} target={item.target} fullWidth className={`nav-itm nav-itm-wrapper ${item.href === curLink ? 'nav-item-current' : ''}`}>
                    <Box component={'img'} src={item.icon} height={24} width={24} marginRight={1.5} />
                    {(variant !== 'permanent' || !collapsed) && item.title}
                  </Button>
                </NextLink>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              marginTop: 'auto'
            }}
          >
            <Box>
              <NextLink href={'/logout'} passHref replace>
                <Button
                  component={'a'}
                  fullWidth
                  className='nav-itm'
                  sx={{
                    paddingTop: '14px',
                    paddingBottom: '14px',
                    fontWeight: 400,
                    backgroundColor: 'transparent',
                    '&:Hover': {
                      backgroundColor: '#6883E4'
                    }
                  }}
                >
                  <Box
                    component={'img'}
                    src={'/images/svgs/logout.svg'}
                    height={24}
                    width={24}
                    marginRight={1.5}
                  />
                  {(variant !== 'permanent' || !collapsed) && Lang.nav.logout}
                </Button>
              </NextLink>
            </Box>
          </Box>
        </> 
      ) : (
        <>
          <Box marginTop={4}>
            <Box>
              <NextLink href={'/account/research'} passHref replace>
                <Button component={'a'} fullWidth className={`nav-itm nav-itm-wrapper ${'/account/research'.startsWith('/' + activeLink) ? 'nav-item-current' : ''}`}>
                  <Box component={'img'} src={'/images/svgs/search.svg'} height={24} width={24} marginRight={1.5} />
                  {(variant !== 'permanent' || !collapsed) && Lang.nav.accountresearch}
                </Button>
              </NextLink>
            </Box>
            {
              userService.userValue.isInsight && 
              <Box>
                <NextLink href={'/insight/list'} passHref replace>
                  <Button component={'a'} fullWidth className={`nav-itm nav-itm-wrapper ${'/insight/list'.startsWith('/' + activeLink) ? 'nav-item-current' : ''}`}>
                    <Box component={'img'} src={'/images/svgs/bookmark.svg'} height={24} width={24} marginRight={1.5} />
                    {(variant !== 'permanent' || !collapsed) && Lang.nav.insightlist}
                  </Button>
                </NextLink>
              </Box>
            } 
            {
              userService.userValue.isCampaign && 
              <Box>
                <NextLink href={'/campaign/list'} passHref replace>
                  <Button component={'a'} fullWidth className={`nav-itm nav-itm-wrapper ${'/campaign/list'.startsWith('/' + activeLink) ? 'nav-item-current' : ''}`}>
                    <Box component={'img'} src={'/images/svgs/payment.svg'} height={24} width={24} marginRight={1.5} />
                    {(variant !== 'permanent' || !collapsed) && Lang.nav.campaignlist}
                  </Button>
                </NextLink>
              </Box>
            } 
            <Box>
              <NextLink href={'/docs/quick-start-gatsbyjs'} passHref replace>
                <Button component={'a'} fullWidth className={`nav-itm nav-itm-wrapper ${'/docs/quick-start-gatsbyjs'.startsWith('/' + activeLink) ? 'nav-item-current' : ''}`}>
                  <Box component={'img'} src={'/images/svgs/record.svg'} height={24} width={24} marginRight={1.5} />
                  {(variant !== 'permanent' || !collapsed) && Lang.nav.keyaccount}
                </Button>
              </NextLink>
            </Box>
            <Box>
              <NextLink href={'/accademy'} passHref replace>
                <Button component={'a'} fullWidth className={`nav-itm nav-itm-wrapper ${'/accademy'.startsWith('/' + activeLink) ? 'nav-item-current' : ''}`}>
                  <Box component={'img'} src={'/images/svgs/trending-up.svg'} height={24} width={24} marginRight={1.5} />
                  {(variant !== 'permanent' || !collapsed) && Lang.nav.accademy}
                </Button>
              </NextLink>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 'auto'
            }}
          >
            {pages.settings.map((item, i) => (
              <Box key={i} >
                <NextLink href={item.href} passHref replace>
                  <Button component={'a'} target={item.target} fullWidth className={`nav-itm nav-itm-wrapper ${item.href.startsWith('/' + activeLink) ? 'nav-item-current' : ''}`}>
                    <Box component={'img'} src={item.icon} height={24} width={24} marginRight={1.5} />
                    {(variant !== 'permanent' || !collapsed) && item.title}
                  </Button>
                </NextLink>
              </Box>
            ))}  
          </Box>
        </>
      )}  
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
