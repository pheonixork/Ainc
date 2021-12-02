import _ from 'lodash';
import moment from 'moment'
import React, {useEffect, useState} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import dynamic from 'next/dynamic'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import RoundInfo from 'components/RoundInfo';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import {styled} from '@mui/material/styles';
import RelativeImage from 'components/RelativeImage';
import {evaluateValue} from 'constants/constants';

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
  },

  lookname: {
    fontSize: '14px',
    fontWeight: 600,
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

const PopularPosts = ({data, statHistory, recentPosts, hashtags, brandAffinity, interests, lookalikes}) => {
  const classes = useStyles();
  const formatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2});

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
                '<span>フォロワー: ' + series[seriesIndex][dataPointIndex] + '</span>' +
                '</div>';
        },
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        formatter: (value) => {
          return (value / (1000 * 1000)).toFixed(0) + 'M';
        }
      }
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      categories: _.map(statHistory, itm => {return itm.month}),
    }
  };

  const chartSeries1 = [
    {
      name: 'Followers',
      data: _.map(statHistory, itm => {return itm.followers ?? 0})
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
                '<span>フォロー: ' + series[seriesIndex][dataPointIndex] + '</span>' +
                '</div>';
        },
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        formatter: (value) => {
          return value;
        }
      }
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      categories: _.map(statHistory, itm => {return itm.month}),
    }
  };

  const chartSeries2 = [
    {
      name: 'Followings',
      data: _.map(statHistory, itm => {return itm.following ?? 0})
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
      categories: _.map(recentPosts, itm => {return moment(itm.created).format('YYYY年M月D日')}).slice(0, 6),
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
          return (value / (1000 * 1000)).toFixed(1) + 'M';
        }
      }
    },
    tooltip: {
      custom: function({series, seriesIndex, dataPointIndex, w}) {
          return '<div class="arrow_box">' +
                '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
                '</div>';
        },
    },
  };

  const chartSereise3 = [
    {
      data: _.map(recentPosts, itm=>{return itm.likes}).slice(0, 6)
    },
    {
      data: _.map(recentPosts, itm=>{return itm.comments}).slice(0, 6)
    },
  ];

  const chartOptions4 = {
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
                '<span>フォロー: ' + series[seriesIndex][dataPointIndex] + '</span>' +
                '</div>';
        },
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        formatter: (value) => {
          return (value / (1000 * 1000)).toFixed(1) + 'M';
        }
      }
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      categories: _.map(statHistory, itm => {return itm.month}),
    }
  };

  const chartSeries4 = [
    {
      name: 'Followings',
      data: _.map(statHistory, itm => {return itm.avgLikes})
    }
  ];

  return (
    <Box className={classes.popularposts}>
      <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
        <span>人気投稿</span>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '1fr 1fr 1fr'}}>
        {_.map(data, (itm, idx) => (
          idx < 6 && 
          <Box key={idx} className='box-wrapper-shadow grid-item nopadding' sx={{maxWidth: '220px'}}>
            <Box className='subtitle1 mgl5 mgt5'>Sep 12, 2021</Box>
            <Box 
              component='a'
              href={`${itm.url}`}
              target='_blank'
            >
              <RelativeImage 
                sx={{height:'150px !important'}}
                imgSrc={`${itm.thumbnail}`}
              />
            </Box>
            <Box display={'flex'} className='mgb5 mgt5'>
              <Box className='mgr5 mgl5' sx={{fontSize:'12px', display: 'flex', alignItems: 'center'}}>
                <svg height="12" width="12" fill="none" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" className='mgr10'>
                  <path d="M10.2143 15.5319C9.53055 16.1575 8.47795 16.1575 7.79422 15.5229L7.69526 15.4322C2.97207 11.1255 -0.113742 8.30573 0.00321271 4.78783C0.057192 3.24649 0.839891 1.76861 2.1084 0.8982C4.48349 -0.733813 7.41636 0.0277934 8.99975 1.89554C10.5831 0.0277934 13.516 -0.74288 15.8911 0.8982C17.1596 1.76861 17.9423 3.24649 17.9963 4.78783C18.1222 8.30573 15.0274 11.1255 10.3043 15.4503L10.2143 15.5319Z" fill="#e88585"></path>
                </svg>
                {evaluateValue(itm.likes)}
              </Box>
              <Box className='mgr5 mgl5' sx={{fontSize:'12px', display: 'flex', alignItems: 'center'}}>
                <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg" className='mgr10'>
                  <path d="M10.8 0H1.2C0.54 0 0 0.54 0 1.2V8.4C0 9.06 0.54 9.6 1.2 9.6H9.6L12 12V1.2C12 0.54 11.46 0 10.8 0ZM9 7.2H3C2.67 7.2 2.4 6.93 2.4 6.6C2.4 6.27 2.67 6 3 6H9C9.33 6 9.6 6.27 9.6 6.6C9.6 6.93 9.33 7.2 9 7.2ZM9 5.4H3C2.67 5.4 2.4 5.13 2.4 4.8C2.4 4.47 2.67 4.2 3 4.2H9C9.33 4.2 9.6 4.47 9.6 4.8C9.6 5.13 9.33 5.4 9 5.4ZM9 3.6H3C2.67 3.6 2.4 3.33 2.4 3C2.4 2.67 2.67 2.4 3 2.4H9C9.33 2.4 9.6 2.67 9.6 3C9.6 3.33 9.33 3.6 9 3.6Z" fill="#4aabed"></path>
                </svg>
                {evaluateValue(itm.comments)}
              </Box>
            </Box>
            <Box className={classes.ellipseCaption}>
              {itm.text}
            </Box>
          </Box>
        ))}
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '1fr 1fr', marginTop:'.5rem'}}>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex', alignItems: 'flex-end'}}>
            フォロワー推移
            <ArrowDropDownIcon fontSize="small" style={{color:'rgb(255,0,0)'}}/>
            <span style={{color:'#ff0000'}}>0.53% </span>&nbsp;
            <RoundInfo sx={{marginLeft: '.5rem'}} caption='過去半年のフォロワー増減の推移。' />
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
            <RoundInfo sx={{marginLeft: '.5rem'}} caption='過去半年のフォロー増減の推移。' />
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
            <Box sx={{display:'flex', justifyContent:'center'}}>
              エンゲージメント推移
              <RoundInfo sx={{marginLeft: '.5rem'}} caption='直近投稿のエンゲージメントの推移。' />
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
            <RoundInfo sx={{marginLeft: '.5rem'}} caption='キーワードトピックから類似アカウントを表示しています。' />
          </Box>
          {_.map(lookalikes, (itm, idx) => (
            idx < 5 && 
            <Box key={idx} sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box
                  className='mgr5'
                  component={LazyLoadImage}
                  effect="blur"
                  src={itm.profile.picture}
                  width={'45px'}
                  height={'45px'}
                  sx={{borderRadius:'50%', marginTop:'.5rem'}}
                />
                <Box>
                <Box className={classes.lookname}>{itm.profile.fullname}</Box>
                <Box 
                  className={classes.lookshortname}
                  component="a"
                  href={itm.profile.url}
                >
                  @{itm.profile.username}
                </Box>
                </Box>
              </Box>
            </Box>  
          ))}
        </Box>
      </Box>
    
      <Box className='wrapper-grid' sx={{gridTemplateColumns: '2fr 1fr', marginTop:'.5rem'}}>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex', justifyContent: 'normal', alignItems: 'flex-end'}}>
            いいね推移
            <ArrowDropDownIcon fontSize="small"  style={{color:'rgb(255,0,0)'}} />
            <span style={{color:'#ff0000'}}>0.53% </span>&nbsp;
            <RoundInfo sx={{marginLeft: '.5rem'}} caption='過去半年のいいね増減の推移。' />
          </Box>
          <Box>
            <Chart
              height="200"
              options={chartOptions4}
              series={chartSeries4}
              type="area"
            />
          </Box>
        </Box>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
            人気の#と@
            <RoundInfo sx={{marginLeft: '.5rem'}} caption='投稿に頻繁に使用されている。' />
          </Box>
          <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
            {_.map(hashtags, (itm, idx) => (
              idx < 12 && 
              <Box className={`genre-span ${classes.fontsize12}`}>#{itm.tag}</Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className='box-wrapper-shadow grid-item leftalign'>
        <Box className='subtitle1' sx={{display: 'flex'}}>
          ハッシュタグエンゲージメント
        </Box>
        <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
          {_.map(_.orderBy(hashtags, (['weight']), ['asc']), (itm, idx) => (
            idx < 12 &&
            <Box key={idx} sx={{display: 'grid', gridTemplateColumns: '2fr 1fr', alignItems: 'center'}}>
              <Box className={`genre-span ${classes.fontsize12} text-ellipse text-width-120`}>#{itm.tag}</Box>
              <span>{`${formatter.format(itm.weight * 100)}%`}</span>              
            </Box>
          ))}
        </Box>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '1fr 1fr', marginTop:'.5rem'}}>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
            ブランド属性
            <RoundInfo sx={{marginLeft: '.5rem'}} caption='例えば「Gucci」のようなハイブランドが多くランクインしていた場合は、ハイブランドに興味をもちやすい傾向にあります。' />
          </Box>
          {_.map(brandAffinity, itm => (
            <Box className='interest-span'>{itm.name}</Box>
          ))}
        </Box>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
            興味
            <RoundInfo sx={{marginLeft: '.5rem'}} caption='どんな投稿に興味をもちやすいか、独自のアルゴリズムで計測。' />
          </Box>
          {_.map(interests, (itm, idx) => (
            <Box key={idx} className='interest-span'>{itm.name}</Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PopularPosts;