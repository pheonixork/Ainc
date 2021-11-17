import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import dynamic from 'next/dynamic'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import RoundInfo from 'components/RoundInfo';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import {styled} from '@mui/material/styles';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(0, 0, 0, 0.8)'
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
}));

const Chart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
)

const useStyles = makeStyles({
  popularposts: {
    marginTop: '2rem'
  },

  ellipseCaption: {
    padding: '.5rem',
    fontSize: '12px',
    display: '-webkit-box',
    overflow: 'hidden',
    lineHeight: 1.4,
    textOverflow: 'ellipsis',
    '-webkitBoxOrient': 'vertical',
    '-webkitLineClamp': 4,
    height: '69px'
  },

  lookname: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '0.7'
  },

  lookshortname: {
    fontSize: '12px',
    textDecoration: 'none',
    color: 'black'
  },

  fontsize12: {
    fontSize: '12px'
  }
});

const chartOptions1 = {
  chart: {
    background: 'transparent',
    toolbar: {
      show: false
    }
  },
  colors: ['#300086'],
  dataLabels: {
    enabled: false
  },
  fill: {
    type: 'solid',
    opacity: 0
  },
  grid: {
    borderColor: '#eee'
  },
  markers: {
    strokeColors: '#300086',
    size: 2,
    hover: {
      sizeOffset: 1
    }
  },
  stroke: {
    curve: 'straight',
    width: 2
  },
  tooltip: {
    custom: function({series, seriesIndex, dataPointIndex, w}) {
        return '<div class="arrow_box">' +
              '<span>Followers: ' + series[seriesIndex][dataPointIndex] + '</span>' +
              '</div>';
      },
  },
  yaxis: {
    tickAmount: 3,
    labels: {
      formatter: (value) => {
        return (value / 10) + 'M';
      }
    }
  },
  xaxis: {
    tooltip: {
      enabled: false,
    },
    categories: [
      '2021-03',
      '2021-04',
      '2021-05',
      '2021-06',
      '2021-07',
      '2021-08',
      '2021-09',
    ]
  }
};

const chartSeries1 = [
  {
    name: 'Followers',
    data: [31, 40, 28, 51, 42, 109, 100]
  }
];

const chartOptions2 = {
  chart: {
    background: 'transparent',
    toolbar: {
      show: false
    }
  },
  colors: ['#300086'],
  dataLabels: {
    enabled: false
  },
  fill: {
    type: 'solid',
    opacity: 0
  },
  grid: {
    borderColor: '#eee'
  },
  markers: {
    strokeColors: '#300086',
    size: 2,
    hover: {
      sizeOffset: 1
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  tooltip: {
    custom: function({series, seriesIndex, dataPointIndex, w}) {
        return '<div class="arrow_box">' +
              '<span>Followings: ' + series[seriesIndex][dataPointIndex] + '</span>' +
              '</div>';
      },
  },
  yaxis: {
    tickAmount: 3,
    labels: {
      formatter: (value) => {
        return (value / 10) + 'K';
      }
    }
  },
  xaxis: {
    tooltip: {
      enabled: false,
    },
    categories: [
      '2021-03',
      '2021-04',
      '2021-05',
      '2021-06',
      '2021-07',
      '2021-08',
      '2021-09',
    ]
  }
};

const chartSeries2 = [
  {
    name: 'Followings',
    data: [31, 40, 28, 51, 42, 109, 100]
  }
];

const chartOptions3 = {
  chart: {
    background: 'transparent',
    stacked: true,
    toolbar: {
      show: false
    }
  },
  colors: ['#300086', '#4aabed'],
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: '#eee',
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  states: {
    active: {
      filter: {
        type: 'none'
      }
    },
    hover: {
      filter: {
        type: 'none'
      }
    }
  },
  legend: {
    show: false
  },
  stroke: {
    colors: ['transparent'],
    show: true,
    width: 2
  },
  xaxis: {
    tooltip: {
      enabled: false,
    },
    categories: [
      'Sep 17,2021',
      'Sep 16,2021',
      'Sep 15,2021',
      'Sep 14,2021',
      'Sep 13,2021',
      'Sep 12,2021',
      'Sep 11,2021',
    ],
    labels: {
      rotate: 0,
      formatter: function(value, timestamp, opts) {
        return value;
      }
    }
  },
  yaxis: {
    tickAmount: 3,
    labels: {
      offsetX: -12,
      formatter: (value) => {
        return (value / 10) + 'M';
      }
    }
  },
  tooltip: {
    custom: function({series, seriesIndex, dataPointIndex, w}) {
        return '<div class="arrow_box">' +
              '<span>Likes: ' + series[seriesIndex][dataPointIndex] + '</span>' +
              '</div>';
      },
  },
};

const chartSereise3 = [
    {
      data: [12, 24, 36, 48, 60, 72, 84]
    },
    {
      data: [12, 24, 36, 48, 60, 72, 84]
    },
  ];

const PopularPosts = () => {
  const classes = useStyles();

  return (
    <Box className={classes.popularposts}>
      <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
        <span>人気投稿</span>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '1fr 1fr 1fr'}}>
        <Box className='box-wrapper-shadow grid-item nopadding'>
          <Box className='subtitle1 mgl5 mgt5'>Sep 12, 2021</Box>
          <Box 
            component='a'
            href='https://www.instagram.com/p/CTsAYzRolo-/'
            target='_blank'
          >
            <Box
              className='mgr5'
              component={LazyLoadImage}
              effect="blur"
              src={'https://imgigp.modash.io/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDYElzQ8azFJzmu%2FFSX2Dbh4IgMotO%2Fr3qoQg8ER303otSdJjHkZL1tYoNYNB3wZfOhNhXHQbsxyx2qO2VwkeouGWGfbnU6kynMhxBzdUwrN0g%3D%3D'}
              width={'100%'}
              height={'100%'}
            />
          </Box>
          <Box display={'flex'} className='mgb5'>
            <Box className='mgr5 mgl5' sx={{fontSize:'12px'}}>
              <svg height="12" width="12" fill="none" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" className='mgr10'>
                <path d="M10.2143 15.5319C9.53055 16.1575 8.47795 16.1575 7.79422 15.5229L7.69526 15.4322C2.97207 11.1255 -0.113742 8.30573 0.00321271 4.78783C0.057192 3.24649 0.839891 1.76861 2.1084 0.8982C4.48349 -0.733813 7.41636 0.0277934 8.99975 1.89554C10.5831 0.0277934 13.516 -0.74288 15.8911 0.8982C17.1596 1.76861 17.9423 3.24649 17.9963 4.78783C18.1222 8.30573 15.0274 11.1255 10.3043 15.4503L10.2143 15.5319Z" fill="#e88585"></path>
              </svg>
              19.1M
            </Box>
            <Box className='mgr5 mgl5' sx={{fontSize:'12px'}}>
              <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg" className='mgr10'>
                <path d="M10.8 0H1.2C0.54 0 0 0.54 0 1.2V8.4C0 9.06 0.54 9.6 1.2 9.6H9.6L12 12V1.2C12 0.54 11.46 0 10.8 0ZM9 7.2H3C2.67 7.2 2.4 6.93 2.4 6.6C2.4 6.27 2.67 6 3 6H9C9.33 6 9.6 6.27 9.6 6.6C9.6 6.93 9.33 7.2 9 7.2ZM9 5.4H3C2.67 5.4 2.4 5.13 2.4 4.8C2.4 4.47 2.67 4.2 3 4.2H9C9.33 4.2 9.6 4.47 9.6 4.8C9.6 5.13 9.33 5.4 9 5.4ZM9 3.6H3C2.67 3.6 2.4 3.33 2.4 3C2.4 2.67 2.67 2.4 3 2.4H9C9.33 2.4 9.6 2.67 9.6 3C9.6 3.33 9.33 3.6 9 3.6Z" fill="#4aabed"></path>
              </svg>
              263.5K
            </Box>
          </Box>
          <Box className={classes.ellipseCaption}>
            Thank you to the Guiness World Records. Always good to be recognized as a world record breaker. Let’s keep trying to set the numbers even higher!💪🏽
          </Box>
        </Box>
        <Box className='box-wrapper-shadow grid-item nopadding'>
          <Box className='subtitle1 mgl5 mgt5'>Sep 12, 2021</Box>
          <Box 
            component='a'
            href='https://www.instagram.com/p/CTsAYzRolo-/'
            target='_blank'
          >
            <Box
              className='mgr5'
              component={LazyLoadImage}
              effect="blur"
              src={'https://imgigp.modash.io/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDYElzQ8azFJzmu%2FFSX2Dbh4IgMotO%2Fr3qoQg8ER303otSdJjHkZL1tYoNYNB3wZfOhNhXHQbsxyx2qO2VwkeouGWGfbnU6kynMhxBzdUwrN0g%3D%3D'}
              width={'100%'}
              height={'100%'}
            />
          </Box>
          <Box display={'flex'} className='mgb5'>
            <Box className='mgr5 mgl5' sx={{fontSize:'12px'}}>
              <svg height="12" width="12" fill="none" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" className='mgr10'>
                <path d="M10.2143 15.5319C9.53055 16.1575 8.47795 16.1575 7.79422 15.5229L7.69526 15.4322C2.97207 11.1255 -0.113742 8.30573 0.00321271 4.78783C0.057192 3.24649 0.839891 1.76861 2.1084 0.8982C4.48349 -0.733813 7.41636 0.0277934 8.99975 1.89554C10.5831 0.0277934 13.516 -0.74288 15.8911 0.8982C17.1596 1.76861 17.9423 3.24649 17.9963 4.78783C18.1222 8.30573 15.0274 11.1255 10.3043 15.4503L10.2143 15.5319Z" fill="#e88585"></path>
              </svg>
              19.1M
            </Box>
            <Box className='mgr5 mgl5' sx={{fontSize:'12px'}}>
              <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg" className='mgr10'>
                <path d="M10.8 0H1.2C0.54 0 0 0.54 0 1.2V8.4C0 9.06 0.54 9.6 1.2 9.6H9.6L12 12V1.2C12 0.54 11.46 0 10.8 0ZM9 7.2H3C2.67 7.2 2.4 6.93 2.4 6.6C2.4 6.27 2.67 6 3 6H9C9.33 6 9.6 6.27 9.6 6.6C9.6 6.93 9.33 7.2 9 7.2ZM9 5.4H3C2.67 5.4 2.4 5.13 2.4 4.8C2.4 4.47 2.67 4.2 3 4.2H9C9.33 4.2 9.6 4.47 9.6 4.8C9.6 5.13 9.33 5.4 9 5.4ZM9 3.6H3C2.67 3.6 2.4 3.33 2.4 3C2.4 2.67 2.67 2.4 3 2.4H9C9.33 2.4 9.6 2.67 9.6 3C9.6 3.33 9.33 3.6 9 3.6Z" fill="#4aabed"></path>
              </svg>
              263.5K
            </Box>
          </Box>
          <Box className={classes.ellipseCaption}>
            Thank you to the Guiness World Records. Always good to be recognized as a world record breaker. Let’s keep trying to set the numbers even higher!💪🏽
          </Box>
        </Box>
        <Box className='box-wrapper-shadow grid-item nopadding'>
          <Box className='subtitle1 mgl5 mgt5'>Sep 12, 2021</Box>
          <Box 
            component='a'
            href='https://www.instagram.com/p/CTsAYzRolo-/'
            target='_blank'
          >
            <Box
              className='mgr5'
              component={LazyLoadImage}
              effect="blur"
              src={'https://imgigp.modash.io/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDYElzQ8azFJzmu%2FFSX2Dbh4IgMotO%2Fr3qoQg8ER303otSdJjHkZL1tYoNYNB3wZfOhNhXHQbsxyx2qO2VwkeouGWGfbnU6kynMhxBzdUwrN0g%3D%3D'}
              width={'100%'}
              height={'100%'}
            />
          </Box>
          <Box display={'flex'} className='mgb5'>
            <Box className='mgr5 mgl5' sx={{fontSize:'12px'}}>
              <svg height="12" width="12" fill="none" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" className='mgr10'>
                <path d="M10.2143 15.5319C9.53055 16.1575 8.47795 16.1575 7.79422 15.5229L7.69526 15.4322C2.97207 11.1255 -0.113742 8.30573 0.00321271 4.78783C0.057192 3.24649 0.839891 1.76861 2.1084 0.8982C4.48349 -0.733813 7.41636 0.0277934 8.99975 1.89554C10.5831 0.0277934 13.516 -0.74288 15.8911 0.8982C17.1596 1.76861 17.9423 3.24649 17.9963 4.78783C18.1222 8.30573 15.0274 11.1255 10.3043 15.4503L10.2143 15.5319Z" fill="#e88585"></path>
              </svg>
              19.1M
            </Box>
            <Box className='mgr5 mgl5' sx={{fontSize:'12px'}}>
              <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg" className='mgr10'>
                <path d="M10.8 0H1.2C0.54 0 0 0.54 0 1.2V8.4C0 9.06 0.54 9.6 1.2 9.6H9.6L12 12V1.2C12 0.54 11.46 0 10.8 0ZM9 7.2H3C2.67 7.2 2.4 6.93 2.4 6.6C2.4 6.27 2.67 6 3 6H9C9.33 6 9.6 6.27 9.6 6.6C9.6 6.93 9.33 7.2 9 7.2ZM9 5.4H3C2.67 5.4 2.4 5.13 2.4 4.8C2.4 4.47 2.67 4.2 3 4.2H9C9.33 4.2 9.6 4.47 9.6 4.8C9.6 5.13 9.33 5.4 9 5.4ZM9 3.6H3C2.67 3.6 2.4 3.33 2.4 3C2.4 2.67 2.67 2.4 3 2.4H9C9.33 2.4 9.6 2.67 9.6 3C9.6 3.33 9.33 3.6 9 3.6Z" fill="#4aabed"></path>
              </svg>
              263.5K
            </Box>
          </Box>
          <Box className={classes.ellipseCaption}>
            Thank you to the Guiness World Records. Always good to be recognized as a world record breaker. Let’s keep trying to set the numbers even higher!💪🏽
          </Box>
        </Box>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '1fr 1fr', marginTop:'.5rem'}}>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex', alignItems: 'flex-end'}}>
            フォロワー推移
            {/* <RoundInfo className='mgl5' /> */}
            <ArrowDropDownIcon fontSize="small" style={{color:'rgb(255,0,0)'}}/>
            <span style={{color:'#ff0000'}}>0.53% </span>&nbsp;
            <BootstrapTooltip title={'過去半年のフォロワー増減の推移'} placement="top">
              <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
            </BootstrapTooltip>
          </Box>
          <Box>
            <Chart
              height="250"
              options={chartOptions1}
              series={chartSeries1}
              type="area"
            />
          </Box>
        </Box>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
            フォロー推移
            <BootstrapTooltip title={'過去半年のフォロー増減の推移'} placement="top">
              <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
            </BootstrapTooltip>
          </Box>
          <Box>
            <Chart
              height="250"
              options={chartOptions2}
              series={chartSeries2}
              type="area"
            />
          </Box>
        </Box>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '2fr 1fr', marginTop:'.5rem'}}>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              エンゲージメント推移
              <BootstrapTooltip title={'直近投稿のエンゲージメントの推移'} placement="top">
                <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
              </BootstrapTooltip>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <svg height="12" width="12" fill="none" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" className='mgr10'>
                <path d="M10.2143 15.5319C9.53055 16.1575 8.47795 16.1575 7.79422 15.5229L7.69526 15.4322C2.97207 11.1255 -0.113742 8.30573 0.00321271 4.78783C0.057192 3.24649 0.839891 1.76861 2.1084 0.8982C4.48349 -0.733813 7.41636 0.0277934 8.99975 1.89554C10.5831 0.0277934 13.516 -0.74288 15.8911 0.8982C17.1596 1.76861 17.9423 3.24649 17.9963 4.78783C18.1222 8.30573 15.0274 11.1255 10.3043 15.4503L10.2143 15.5319Z" fill="#e88585"></path>
              </svg>
              <span style={{marginRight:'.5em'}}>Likes&nbsp;</span>
              <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg" className='mgr10'>
                <path d="M10.8 0H1.2C0.54 0 0 0.54 0 1.2V8.4C0 9.06 0.54 9.6 1.2 9.6H9.6L12 12V1.2C12 0.54 11.46 0 10.8 0ZM9 7.2H3C2.67 7.2 2.4 6.93 2.4 6.6C2.4 6.27 2.67 6 3 6H9C9.33 6 9.6 6.27 9.6 6.6C9.6 6.93 9.33 7.2 9 7.2ZM9 5.4H3C2.67 5.4 2.4 5.13 2.4 4.8C2.4 4.47 2.67 4.2 3 4.2H9C9.33 4.2 9.6 4.47 9.6 4.8C9.6 5.13 9.33 5.4 9 5.4ZM9 3.6H3C2.67 3.6 2.4 3.33 2.4 3C2.4 2.67 2.67 2.4 3 2.4H9C9.33 2.4 9.6 2.67 9.6 3C9.6 3.33 9.33 3.6 9 3.6Z" fill="#4aabed"></path>
              </svg>
              <span>Comments</span>
            </Box>
          </Box>
          <Box>
            <Chart
              height="200"
              options={chartOptions3}
              series={chartSereise3}
              type="bar"
            />
          </Box>
        </Box>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex', alignItems: 'flex-end'}}>
            類似アカウント  
            <BootstrapTooltip title={'キーワードトピックから類似アカウントを表示しています。'} placement="top">
              <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
            </BootstrapTooltip>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Box
                className='mgr5'
                component={LazyLoadImage}
                effect="blur"
                src={'https://imgigp.modash.io/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDY9ylLT5c6L8M5YYtkm82Y2V5KPwPXcA2WyNRhPMoCHKMdtKG3eSEc5JQ8TgTu0NynllFlelISOb%2Blsdn%2FFsiegkW4xzvOq4WKYeHoY1KFSvw%3D%3D'}
                width={'45px'}
                height={'45px'}
                sx={{borderRadius:'50%', marginTop:'.5rem'}}
              />
              <Box>
                <Box className={classes.lookname}>Alex Android</Box>
                <Box 
                  className={classes.lookshortname}
                  component="a"
                  href="https://www.instagram.com/alxsndro12"
                >
                  @alxsndro12
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    
      <Box className='wrapper-grid' sx={{gridTemplateColumns: '2fr 1fr', marginTop:'.5rem'}}>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex', justifyContent: 'normal', alignItems: 'flex-end'}}>
            いいね推移
            <ArrowDropDownIcon fontSize="small"  style={{color:'rgb(255,0,0)'}} />
            <span style={{color:'#ff0000'}}>0.53% </span>&nbsp;
            <BootstrapTooltip title={'過去半年のいいね増減の推移'} placement="top">
              <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
            </BootstrapTooltip>
          </Box>
          <Box>
            <Chart
              height="200"
              options={chartOptions2}
              series={chartSeries2}
              type="area"
            />
          </Box>
        </Box>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
            人気の#と@
            <BootstrapTooltip title={'投稿に頻繁に使用されている#と@'} placement="top">
              <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
            </BootstrapTooltip>
          </Box>
          <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
            <Box className={`genre-span ${classes.fontsize12}`}>#finaollafine</Box>
            <Box className={`genre-span ${classes.fontsize12}`}>#vamoscomtudo</Box>
            <Box className={`genre-span ${classes.fontsize12}`}>#forzajvue</Box>
            <Box className={`genre-span ${classes.fontsize12}`}>#c7eyewear</Box>
            <Box className={`genre-span ${classes.fontsize12}`}>#clearman</Box>
            <Box className={`genre-span ${classes.fontsize12}`}>#portugual</Box>
            <Box className={`genre-span ${classes.fontsize12}`}>#nikefootball</Box>
            <Box className={`genre-span ${classes.fontsize12}`}>#gerginoago</Box>
          </Box>
        </Box>
      </Box>

      <Box className='box-wrapper-shadow grid-item leftalign'>
        <Box className='subtitle1' sx={{display: 'flex'}}>
          ハッシュタグエンゲージメント
        </Box>
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
          <Box className={`genre-span ${classes.fontsize12}`}>#finaollafine</Box>
          <Box className={`genre-span ${classes.fontsize12}`}>#vamoscomtudo</Box>
          <Box className={`genre-span ${classes.fontsize12}`}>#forzajvue</Box>
          <Box className={`genre-span ${classes.fontsize12}`}>#c7eyewear</Box>
          <Box className={`genre-span ${classes.fontsize12}`}>#clearman</Box>
          <Box className={`genre-span ${classes.fontsize12}`}>#portugual</Box>
          <Box className={`genre-span ${classes.fontsize12}`}>#nikefootball</Box>
          <Box className={`genre-span ${classes.fontsize12}`}>#gerginoago</Box>
        </Box>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '1fr 1fr', marginTop:'.5rem'}}>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
            ブランド属性
           <BootstrapTooltip title={'例えば「Gucci」のようなハイブランドが多くランクインしていた場合は、ハイブランドに興味をもちやすい傾向にあります。'} placement="top">
              <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
            </BootstrapTooltip>
          </Box>
          <Box className='interest-span'>{'Friends, Family & Relationship'}</Box>
          <Box className='interest-span'>{'Sports'}</Box>
          <Box className='interest-span'>{'Clothes, Shoes, Handbags'}</Box>
          <Box className='interest-span'>{'Travel, Tourism & Aviation'}</Box>
          <Box className='interest-span'>{'Camera & Photography'}</Box>
        </Box>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
            興味
            <BootstrapTooltip title={'どんな投稿に興味をもちやすいか、独自のアルゴリズムで計測。'} placement="top">
              <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
            </BootstrapTooltip>
          </Box>
          <Box className='interest-span'>{'Friends, Family & Relationship'}</Box>
          <Box className='interest-span'>{'Sports'}</Box>
          <Box className='interest-span'>{'Clothes, Shoes, Handbags'}</Box>
          <Box className='interest-span'>{'Travel, Tourism & Aviation'}</Box>
          <Box className='interest-span'>{'Camera & Photography'}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularPosts;