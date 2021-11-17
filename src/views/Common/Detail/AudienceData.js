import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import RoundInfo from 'components/RoundInfo';
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

const useStyles = makeStyles({
  audiencedata: {
    marginTop: '2rem'
  },

  fontsize12: {
    fontSize: '12px'
  }
});

const AudienceData = () => {
  const classes = useStyles();

  return (
    <Box className={classes.audiencedata}>
      <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
        <span style={{fontWeight:'600'}}>フォロワーデータ</span>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '1fr 1fr'}}>
        <Box className='grid-item'>
          <Box
            className='mgr5'
            component={LazyLoadImage}
            effect="blur"
            src={'/images/svgs/detailfollowers.svg'}
            width={'100%'}
            height={'100%'}
          />
        </Box>
        <Box className='box-wrapper-shadow grid-item'>
          <svg fill="none" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.48 11.95c.17.02.34.05.52.05 2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4c0 .18.03.35.05.52l3.43 3.43zm2.21 2.21l5.74 5.74c.33-.17.57-.5.57-.9v-1c0-2.14-3.56-3.5-6.31-3.84zM2.12 2.42A.996.996 0 10.71 3.83L4 7.12V10H2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2.88l2.51 2.51C9.19 15.11 7 16.3 7 18v1c0 .55.45 1 1 1h8.88l3.29 3.29a.996.996 0 101.41-1.41L2.12 2.42zM6 10v-.88l.88.88H6z" fill="#FA8F38"></path>
          </svg>
          <Box className='subtitle'>23.71%</Box>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <span>アクティブ率</span>
            <BootstrapTooltip title={'フォロワーの実在率(もしくはアクティブ率)。75%を下回ると危険な兆候です。'} placement="top">
              <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
            </BootstrapTooltip>
          </Box>
        </Box>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '1fr 1fr', marginTop:'.5rem'}}>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
            国
            <BootstrapTooltip title={'フォロワーがどこの国にいるのか'} placement="top">
              <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
            </BootstrapTooltip>
          </Box>
          <Box sx={{display: 'flex', justifyContent:'space-between', marginTop:'30px'}}>
            <span>Brazil</span>
            <span>11.91%</span>
          </Box>
          <Box className="ui-bar-comp">
            <Box className="ui-bar-progress" sx={{width: '12%'}}></Box>
          </Box>
          <Box sx={{display: 'flex', justifyContent:'space-between'}}>
            <span>Indonesia</span>
            <span>9.44%</span>
          </Box>
          <Box className="ui-bar-comp">
            <Box className="ui-bar-progress" sx={{width: '9.5%'}}></Box>
          </Box>
          <Box sx={{display: 'flex', justifyContent:'space-between'}}>
            <span>India</span>
            <span>8.89%</span>
          </Box>
          <Box className="ui-bar-comp">
            <Box className="ui-bar-progress" sx={{width: '9%'}}></Box>
          </Box>
        </Box>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
          都市
          <BootstrapTooltip title={'フォロワーがどこの都市にいるのか'} placement="top">
              <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
            </BootstrapTooltip>
          </Box>
          <Box sx={{display: 'flex', justifyContent:'space-between', marginTop:'30px'}}>
            <span>Lio De Janeriro</span>
            <span>11.91%</span>
          </Box>
          <Box className="ui-bar-comp">
            <Box className="ui-bar-progress" sx={{width: '12%'}}></Box>
          </Box>
          <Box sx={{display: 'flex', justifyContent:'space-between'}}>
            <span>Jakarta</span>
            <span>9.44%</span>
          </Box>
          <Box className="ui-bar-comp">
            <Box className="ui-bar-progress" sx={{width: '9.5%'}}></Box>
          </Box>
          <Box sx={{display: 'flex', justifyContent:'space-between'}}>
            <span>Mangal</span>
            <span>8.89%</span>
          </Box>
          <Box className="ui-bar-comp">
            <Box className="ui-bar-progress" sx={{width: '9%'}}></Box>
          </Box>
        </Box>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '1fr 2fr', marginTop:'.5rem'}}>
        <Box className='box-wrapper-shadow grid-item'>
          <Box>
            <Box className='subtitle1' sx={{display: 'flex'}}>
              男女比
              <BootstrapTooltip title={'インフルエンサーがリーチできるフォロワーの男女比'} placement="top">
                <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
              </BootstrapTooltip>
            </Box>
            <svg viewBox="0 0 160 160" style={{width:'90px', height:'90px'}}>
              <g>
                <circle style={{strokeWidth: '35', stroke:'rgb(75, 0, 130)'}} cx="80" cy="80" r="60" strokeDasharray="376.99111843077515" strokeDashoffset="112.50131257099349" transform="rotate(-90, 80, 80)" fill="transparent"></circle>
              </g>
              <g>
                <circle style={{strokeWidth: '35', stroke:'rgb(239, 83, 80)'}} cx="80" cy="80" r="60" strokeDasharray="376.99111843077515" strokeDashoffset="264.48980585978165" transform="rotate(162.56916, 80, 80)" fill="transparent"></circle>
              </g>
            </svg>
            <Box sx={{display:'flex', alignItems:'center'}}>
              <Box sx={{width:'8px', height:'8px', borderRadius:'50%', background:'rgb(75, 0, 130)'}}></Box>
              <span style={{marginLeft:'.5rem'}}>Male</span>
              <span style={{marginLeft:'auto'}}>70.16%</span>
            </Box>
            <Box sx={{display:'flex', alignItems:'center'}}>
              <Box sx={{width:'8px', height:'8px', borderRadius:'50%', background:'rgb(239, 83, 80)'}}></Box>
              <span style={{marginLeft:'.5rem'}}>Female</span>
              <span style={{marginLeft:'auto'}}>29.84%</span>
            </Box>
          </Box>
        </Box>
        <Box className='box-wrapper-shadow grid-item'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
          年代別男女比
          <BootstrapTooltip title={'インフルエンサーがリーチできるフォロワーの年代別男女比'} placement="top">
                <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
              </BootstrapTooltip>
          </Box>
          <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
            <Box className='bar-chat-item'>
              <Box sx={{display:'flex'}}>
                <Box className='bar-chat-candle'>
                  <Box className="bar-candle first" sx={{height: '2.54%'}}></Box>
                  <Box className="bar-candle-caption"> 2.54% </Box>
                </Box>
                <Box className='bar-chat-candle'>
                  <Box className="bar-candle second" sx={{height: '4.3%'}}></Box>
                  <Box className="bar-candle-caption"> 4.3% </Box>
                </Box>
              </Box>
              <Box>13-17</Box>
            </Box>
            <Box className='bar-chat-item'>
              <Box sx={{display:'flex'}}>
                <Box className='bar-chat-candle'>
                  <Box className="bar-candle first" sx={{height: '13%'}}></Box>
                  <Box className="bar-candle-caption"> 12.66% </Box>
                </Box>
                <Box className='bar-chat-candle'>
                  <Box className="bar-candle second" sx={{height: '28%'}}></Box>
                  <Box className="bar-candle-caption"> 27.89% </Box>
                </Box>
              </Box>
              <Box>18-24</Box>
            </Box>
            <Box className='bar-chat-item'>
              <Box sx={{display:'flex'}}>
                <Box className='bar-chat-candle'>
                  <Box className="bar-candle first" sx={{height: '13%'}}></Box>
                  <Box className="bar-candle-caption"> 12.66% </Box>
                </Box>
                <Box className='bar-chat-candle'>
                  <Box className="bar-candle second" sx={{height: '28%'}}></Box>
                  <Box className="bar-candle-caption"> 27.89% </Box>
                </Box>
              </Box>
              <Box>25-34</Box>
            </Box>
            <Box className='bar-chat-item'>
              <Box sx={{display:'flex'}}>
                <Box className='bar-chat-candle'>
                  <Box className="bar-candle first" sx={{height: '13%'}}></Box>
                  <Box className="bar-candle-caption"> 12.66% </Box>
                </Box>
                <Box className='bar-chat-candle'>
                  <Box className="bar-candle second" sx={{height: '28%'}}></Box>
                  <Box className="bar-candle-caption"> 27.89% </Box>
                </Box>
              </Box>
              <Box>35-44</Box>
            </Box>
            <Box className='bar-chat-item'>
              <Box sx={{display:'flex'}}>
                <Box className='bar-chat-candle'>
                  <Box className="bar-candle first" sx={{height: '13%'}}></Box>
                  <Box className="bar-candle-caption"> 12.66% </Box>
                </Box>
                <Box className='bar-chat-candle'>
                  <Box className="bar-candle second" sx={{height: '28%'}}></Box>
                  <Box className="bar-candle-caption"> 27.89% </Box>
                </Box>
              </Box>
              <Box>45-64</Box>
            </Box>
          </Box>
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
          <Box className='interest-span' sx={{display:'flex', justifyContent:'space-between'}}>
            <span>{'Friends, Family & Relationship'}</span>
            <span>{'32.57%'}</span>
          </Box>
          <Box className='interest-span' sx={{display:'flex', justifyContent:'space-between'}}><span>{'Sports'}</span><span>{'32.57%'}</span></Box>
          <Box className='interest-span' sx={{display:'flex', justifyContent:'space-between'}}><span>{'Clothes, Shoes, Handbags'}</span><span>{'32.57%'}</span></Box>
          <Box className='interest-span' sx={{display:'flex', justifyContent:'space-between'}}><span>{'Travel, Tourism & Aviation'}</span><span>{'32.57%'}</span></Box>
          <Box className='interest-span' sx={{display:'flex', justifyContent:'space-between'}}><span>{'Camera & Photography'}</span><span>{'32.57%'}</span></Box>
        </Box>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
          興味
          <BootstrapTooltip title={'どんな投稿に興味をもちやすいか、独自のアルゴリズムで計測。'} placement="top">
                <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
              </BootstrapTooltip>
          </Box>
          <Box className='interest-span' sx={{display:'flex', justifyContent:'space-between'}}><span>{'Friends, Family & Relationship'}</span><span>{'32.57%'}</span></Box>
          <Box className='interest-span' sx={{display:'flex', justifyContent:'space-between'}}><span>{'Sports'}</span><span>{'32.57%'}</span></Box>
          <Box className='interest-span' sx={{display:'flex', justifyContent:'space-between'}}><span>{'Clothes, Shoes, Handbags'}</span><span>{'32.57%'}</span></Box>
          <Box className='interest-span' sx={{display:'flex', justifyContent:'space-between'}}><span>{'Travel, Tourism & Aviation'}</span><span>{'32.57%'}</span></Box>
          <Box className='interest-span' sx={{display:'flex', justifyContent:'space-between'}}><span>{'Camera & Photography'}</span><span>{'32.57%'}</span></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AudienceData;