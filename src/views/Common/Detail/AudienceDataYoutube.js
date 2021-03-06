import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import RoundInfo from 'components/RoundInfo';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import {styled} from '@mui/material/styles';
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

const useStyles = makeStyles({
  audiencedata: {
    marginTop: '2rem'
  },

  fontsize12: {
    fontSize: '12px'
  }
});

const AudienceDataYoutube = ({data}) => {
  const classes = useStyles();
  const formatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2});

  const getMaleOrFemale = (isMale) => {
    if (!data.genders || data.genders.length !== 2)
      return 0;

    if (data.genders[0].code === 'MALE') {
      if (isMale)
        return data.genders[0].weight;
      else
        return data.genders[1].weight;
    } else {
      if (isMale)
        return data.genders[1].weight;
      else
        return data.genders[0].weight;
    }
  }

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
            src={'/images/svgs/detailfollowerstiktok.svg'}
            width={'100%'}
            height={'100%'}
          />
        </Box>
        <Box className='box-wrapper-shadow grid-item' 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg fill="none" height="14" viewBox="0 0 22 14" width="22" xmlns="http://www.w3.org/2000/svg" style={{width: '36px', height: '22px'}}>
            <path d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V13C0 13.55 0.45 14 1 14H13C13.55 14 14 13.55 14 13V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C14.05 8.06 14.06 8.08 14.07 8.09C15.21 8.92 16 10.03 16 11.5V13C16 13.35 15.93 13.69 15.82 14H21C21.55 14 22 13.55 22 13V11.5C22 9.17 17.33 8 15 8Z" fill="#447D91"></path>
          </svg>
          <Box className='subtitle' style={{fontSize:'30px !import'}}>{`${formatter.format(data.notable * 100)}%`}</Box>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <span>アクティブ率</span>
            <RoundInfo sx={{marginLeft: '.5rem'}} caption='フォロワーの実在率(もしくはアクティブ率)。75%を下回ると危険な兆候です。' />
          </Box>
        </Box>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '14fr 10fr', marginTop:'.5rem'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', gridGap: '.5rem'}}>
          <Box className='box-wrapper-shadow grid-item leftalign'>
            <Box className='subtitle1' sx={{display: 'flex'}}>
              言語
              <RoundInfo sx={{marginLeft: '.5rem'}} caption='フォロワーがどこの言語にいるのか。' />
            </Box>
            {_.map(data.languages, (itm, idx) => (
              idx < 3 && 
              <Box key={idx}>
                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                  <span>{itm.name}</span>
                  <span>{`${formatter.format(itm.weight * 100)}%`}</span>
                </Box>
                <Box className="ui-bar-comp">
                  <Box className="ui-bar-progress" sx={{width: `${itm.weight * 100}%`}}></Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box className='box-wrapper-shadow grid-item leftalign'>
            <Box className='subtitle1' sx={{display: 'flex', alignItems: 'center'}}>
              類似アカウント  
              <RoundInfo sx={{marginLeft: '.5rem'}} caption='キーワードトピックから類似アカウントを表示しています。' />
            </Box>
            {_.map(data.audienceLookalikes, (itm, idx) => (
              idx < 3 && 
              <Box key={idx} sx={{display: 'flex', justifyContent: 'space-between', marginTop:'.5rem', marginBottom: '.5rem'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Box
                    className='mgr5'
                    component={LazyLoadImage}
                    effect="blur"
                    src={itm.picture}
                    width={'45px'}
                    height={'45px'}
                    sx={{borderRadius:'50%', marginTop:'.5rem'}}
                  />
                  <Box>
                  <Box className={classes.lookname} sx={{marginLeft: '.5rem'}}>{itm.fullname}</Box>
                  {itm.username &&
                    <Box 
                      className={classes.lookshortname}
                      component="a"
                      href={itm.url}
                    >
                      @{itm.username}
                    </Box>
                  }
                  </Box>
                </Box>
              </Box>  
            ))}
          </Box>
        </Box>
        <Box className='box-wrapper-shadow grid-item leftalign'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
            国
            <RoundInfo sx={{marginLeft: '.5rem'}} caption='フォロワーがどこの国にいるのか。' />
          </Box>
          {_.map(data.geoCountries, (itm, idx) => (
            idx < 10 && 
            <Box key={idx}>
              <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                <span>{itm.name}</span>
                <span>{`${formatter.format(itm.weight * 100)}%`}</span>
              </Box>
              <Box className="ui-bar-comp">
                <Box className="ui-bar-progress" sx={{width: `${itm.weight * 100}%`}}></Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className='wrapper-grid' sx={{gridTemplateColumns: '1fr 2fr', marginTop:'.5rem'}}>
        <Box className='box-wrapper-shadow grid-item'>
          <Box>
            <Box className='subtitle1' sx={{display: 'flex'}}>
              男女比
              <RoundInfo sx={{marginLeft: '.5rem'}} caption='インフルエンサーがリーチできるフォロワーの男女比。' />
            </Box>
            <svg viewBox="0 0 160 160" style={{width:'90px', height:'90px'}}>
              <g>
                <circle className="ui-pie-male" cx="80" cy="80" r="60" strokeDasharray="376.99111843077515" transform="rotate(0, 80, 80)" fill="transparent"></circle>
              </g>
              <g>
                <circle className="ui-pie-female" cx="80" cy="80" r="60" strokeDasharray="376.99111843077515" strokeDashoffset={`${getMaleOrFemale(true) * 365}`} transform="rotate(0, 80, 80)" fill="transparent"></circle>
              </g>
            </svg>
            <Box sx={{display:'flex', alignItems:'center'}}>
              <Box sx={{width:'8px', height:'8px', borderRadius:'50%', background:'rgb(75, 0, 130)'}}></Box>
              <span style={{marginLeft:'.5rem'}}>男</span>
              <span style={{marginLeft:'auto'}}>{`${formatter.format(getMaleOrFemale(true) * 100)}%`}</span>
            </Box>
            <Box sx={{display:'flex', alignItems:'center'}}>
              <Box sx={{width:'8px', height:'8px', borderRadius:'50%', background:'rgb(239, 83, 80)'}}></Box>
              <span style={{marginLeft:'.5rem'}}>女</span>
              <span style={{marginLeft:'auto'}}>{`${formatter.format(getMaleOrFemale(false) * 100)}%`}</span>
            </Box>
          </Box>
        </Box>
        <Box className='box-wrapper-shadow grid-item'>
          <Box className='subtitle1' sx={{display: 'flex'}}>
            年代別男女比
            <RoundInfo sx={{marginLeft: '.5rem'}} caption='インフルエンサーがリーチできるフォロワーの年代別男女比。' />
          </Box>
          <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
            {_.map(data.gendersPerAge, (itm, idx) => (
              <Box key={idx} className='bar-chat-item'>
                <Box sx={{display:'flex'}}>
                  <Box className='bar-chat-candle'>
                    <Box className="bar-candle first" sx={{height: `${itm.male * 100}%`}}></Box>
                    <Box className="bar-candle-caption">{`${formatter.format(itm.male * 100)}%`}</Box>
                  </Box>
                  <Box className='bar-chat-candle'>
                    <Box className="bar-candle second" sx={{height: `${itm.female * 100}%`}}></Box>
                    <Box className="bar-candle-caption">{`${formatter.format(itm.female * 100)}%`}</Box>
                  </Box>
                </Box>
                <Box>{itm.code}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AudienceDataYoutube;