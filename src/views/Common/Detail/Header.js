import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import RoundInfo from 'components/RoundInfo';

const useStyles = makeStyles({
  showFront: {
    zIndex: 2,
  },
  profileBackground: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    zIndex: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gridwrapper: {
    gridTemplateColumns: '1fr 1fr 1fr',
    marginTop: '1rem'
  }
});

const Header = ({data}) => {
  const classes = useStyles();

  return (
    <Box sx={{marginTop:'3rem'}}>
      {/* <svg fill="none" height="445" viewBox="0 0 595 445" width="595" xmlns="http://www.w3.org/2000/svg" className={classes.profileBackground}>
        <path d="M398.594 -95.3898C369.085 -87.1341 342.711 -70.2265 322.803 -46.8037C302.895 -23.3808 290.348 5.50609 286.747 36.2068C283.146 66.9074 288.653 98.044 302.571 125.682C316.49 153.32 338.195 176.219 364.945 191.485C391.695 206.751 422.289 213.699 452.86 211.451C483.431 209.204 512.609 197.861 536.704 178.857C560.8 159.852 578.733 134.039 588.238 104.679C597.742 75.3193 598.391 43.7302 590.102 13.9036C584.576 -5.92074 575.239 -24.4734 562.624 -40.695C550.008 -56.9166 534.362 -70.4894 516.579 -80.6384C498.795 -90.7873 479.223 -97.3137 458.979 -99.8447C438.735 -102.376 418.216 -100.862 398.594 -95.3898ZM468.495 156.152C448.785 161.576 427.892 160.978 408.456 154.431C389.02 147.885 371.913 135.685 359.296 119.372C346.679 103.058 339.118 83.3642 337.568 62.7772C336.018 42.1901 340.55 21.6337 350.589 3.70489C360.629 -14.224 375.726 -28.7209 393.974 -37.9545C412.222 -47.1882 432.802 -50.7443 453.115 -48.1736C473.427 -45.6028 492.56 -37.0207 508.097 -23.5112C523.634 -10.0018 534.878 7.82887 540.407 27.7282C544.071 40.9685 545.118 54.7936 543.487 68.4137C541.855 82.0338 537.579 95.1822 530.901 107.108C524.223 119.034 515.274 129.503 504.567 137.918C493.859 146.333 481.602 152.529 468.495 156.152Z" fill="white"></path>
        <path d="M201.259 67.423C194.647 69.2438 189.02 73.6086 185.594 79.5749L108.486 217.582L-28.7698 139.145C-34.7843 135.806 -41.8544 134.97 -48.4587 136.817C-55.035 138.578 -60.6386 142.893 -64.0384 148.816C-67.4381 154.739 -68.3559 161.784 -66.5901 168.404L3.30014 419.907C5.27665 426.428 9.70964 431.922 15.6514 435.213C21.5931 438.504 28.572 439.332 35.096 437.519C41.62 435.706 47.1713 431.396 50.5631 425.511C53.9549 419.626 54.918 412.633 53.2464 406.027L0.183608 215.078L105.516 275.366C111.527 278.703 118.591 279.544 125.195 277.709C131.798 275.874 137.415 271.509 140.843 265.549L199.969 159.56L253.032 350.509C255.008 357.03 259.441 362.524 265.383 365.815C271.325 369.106 278.304 369.934 284.828 368.121C291.352 366.308 296.903 361.998 300.295 356.113C303.686 350.228 304.649 343.235 302.978 336.629L233.088 85.1261C231.182 78.5466 226.76 72.9874 220.793 69.6685C214.826 66.3497 207.801 65.5421 201.259 67.423Z" fill="white"></path>
      </svg> */}
      <Box className={classes.header}>
        <Box
          className={classes.showFront}
          component={LazyLoadImage}
          effect="blur"
          src={data.avatar ?? data.avatar}
          sx={{width:'175px', height:'175px', borderRadius:'50%'}}
        />
        <Box className={`mgt10 ${classes.showFront}`}>
          <span style={{fontSize:'20px', fontWeight:600}}>{data.name ?? data.name}</span>
        </Box>
        {data.instagram && 
          <a className={classes.showFront} href={data.instagram} rel="noopener noreferrer" target="_blank">
            <span>@{data.name ?? data.name}</span>
          </a>
        }
        {data.youtube && 
          <a className={classes.showFront} href={data.youtube} rel="noopener noreferrer" target="_blank">
            <span>@{data.name ?? data.name}</span>
          </a>
        }
        {data.tiktok && 
          <a className={classes.showFront} href={data.tiktok} rel="noopener noreferrer" target="_blank">
            <span>@{data.name ?? data.name}</span>
          </a>
        }
      </Box>
      <Box className={`wrapper-grid ${classes.gridwrapper}`}>
        <Box className={`box-wrapper-shadow grid-item ${classes.showFront}`}>
          <svg height="16" width="18" fill="none" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2143 15.5319C9.53055 16.1575 8.47795 16.1575 7.79422 15.5229L7.69526 15.4322C2.97207 11.1255 -0.113742 8.30573 0.00321271 4.78783C0.057192 3.24649 0.839891 1.76861 2.1084 0.8982C4.48349 -0.733813 7.41636 0.0277934 8.99975 1.89554C10.5831 0.0277934 13.516 -0.74288 15.8911 0.8982C17.1596 1.76861 17.9423 3.24649 17.9963 4.78783C18.1222 8.30573 15.0274 11.1255 10.3043 15.4503L10.2143 15.5319Z" fill="#e88585"></path>
          </svg>
          <Box className='subtitle'>9.9M</Box>
          <span>AVG LIKES</span>
          <RoundInfo />
        </Box>
        <Box className={`box-wrapper-shadow grid-item ${classes.showFront}`}>
          <svg fill="none" height="14" viewBox="0 0 22 14" width="22" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V13C0 13.55 0.45 14 1 14H13C13.55 14 14 13.55 14 13V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C14.05 8.06 14.06 8.08 14.07 8.09C15.21 8.92 16 10.03 16 11.5V13C16 13.35 15.93 13.69 15.82 14H21C21.55 14 22 13.55 22 13V11.5C22 9.17 17.33 8 15 8Z" fill="#447D91"></path>
          </svg>
          <Box className='subtitle'>383.2M</Box>
          <span>FOLLOWERS</span>
          <RoundInfo />
        </Box>
        <Box className={`box-wrapper-shadow grid-item ${classes.showFront}`}>
          <svg fill="none" height="11" width="24" viewBox="0 0 24 11" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.22.24c-2-.6-4.06-.04-5.39 1.29L12 4.04l-1.52 1.34h.01L7.8 7.77c-.81.81-1.95 1.15-3.12.92A3.354 3.354 0 012.11 6.2 3.39 3.39 0 015.4 2c.91 0 1.76.35 2.44 1.03l.47.41c.38.34.95.34 1.33 0 .45-.4.45-1.1 0-1.5l-.42-.36A5.37 5.37 0 005.4 0C2.42 0 0 2.42 0 5.38s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53L12 6.73l.01.01 1.51-1.36h-.01l2.69-2.39c.81-.81 1.95-1.15 3.12-.92 1.25.25 2.28 1.25 2.57 2.49a3.39 3.39 0 01-3.29 4.2c-.9 0-1.76-.35-2.44-1.03l-.48-.42a.995.995 0 00-1.33 0c-.45.4-.45 1.1 0 1.5l.42.37a5.386 5.386 0 003.82 1.57c3.27 0 5.86-2.9 5.33-6.25-.3-1.99-1.77-3.69-3.7-4.26z" fill="#61339C"></path>
          </svg>
          <Box className='subtitle'>2.87%</Box>
          <span>ENGAGEMENT RATES</span>
          <RoundInfo />
        </Box>
      </Box>
    </Box>
  );
};

Header.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Header;