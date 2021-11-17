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
  audiencelikes: {
    marginTop: '2rem'
  },

  fontsize12: {
    fontSize: '12px'
  }
});

const AudienceLikes = () => {
  const classes = useStyles();

  return (
    <Box className={classes.audiencelikes}>
      <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
        <span style={{fontWeight:'600'}}>いいねをしてくれた人のデータ</span>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '2fr 1fr 1fr'}}>
        <Box className='grid-item'>
          <Box
            className='mgr5'
            component={LazyLoadImage}
            effect="blur"
            src={'/images/svgs/detaillikes.svg'}
            width={'100%'}
            height={'100%'}
          />
        </Box>
        <Box className='box-wrapper-shadow grid-item' sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <svg height="16" width="18" fill="none" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2143 15.5319C9.53055 16.1575 8.47795 16.1575 7.79422 15.5229L7.69526 15.4322C2.97207 11.1255 -0.113742 8.30573 0.00321271 4.78783C0.057192 3.24649 0.839891 1.76861 2.1084 0.8982C4.48349 -0.733813 7.41636 0.0277934 8.99975 1.89554C10.5831 0.0277934 13.516 -0.74288 15.8911 0.8982C17.1596 1.76861 17.9423 3.24649 17.9963 4.78783C18.1222 8.30573 15.0274 11.1255 10.3043 15.4503L10.2143 15.5319Z" fill="#e88585"></path>
          </svg>
          <Box className='subtitle'>91.33%</Box>
          <span>いいねのアクティブ率</span>
          <BootstrapTooltip title={'いいねの信憑性。著しく低い場合は要注意です。'} placement="top">
              <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
            </BootstrapTooltip>
        </Box>
        <Box className='box-wrapper-shadow grid-item' sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Box className='subtitle' sx={{marginTop:'1rem'}}>18.5%</Box>
          <span>フォロワー外からのいいね</span>
          <BootstrapTooltip title={'この数値が高いほど、このインフルエンサ―の投稿は既存のフォロワーの外部に拡散されやすい傾向にあります。'} placement="top">
              <InfoIcon fontSize="small" sx={{cursor:'pointer'}} />
            </BootstrapTooltip>
        </Box>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '1fr 1fr', marginTop:'.5rem'}}>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
          国
          <BootstrapTooltip title={'いいねをしてくれた人がどこの国にいるのか'} placement="top">
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
          <BootstrapTooltip title={'いいねをしてくれた人がどこの都市にいるのか'} placement="top">
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
              <BootstrapTooltip title={'いいねをしてくれた人の男女比'} placement="top">
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
            <BootstrapTooltip title={'いいねをしてくれた人の年代別男女比'} placement="top">
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

export default AudienceLikes;