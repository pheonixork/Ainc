import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RoundInfo from 'components/RoundInfo';

const AudienceDetails = () => {
  return (
    <Box className='audiencedetails'>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <svg fill="none" height="11" viewBox="0 0 15 11" width="15" xmlns="http://www.w3.org/2000/svg" >
          <path d="M5.25 5.5C6.6975 5.5 7.875 4.26643 7.875 2.75C7.875 1.23357 6.6975 0 5.25 0C3.8025 0 2.625 1.23357 2.625 2.75C2.625 4.26643 3.8025 5.5 5.25 5.5ZM5.25 1.57143C5.8725 1.57143 6.375 2.09786 6.375 2.75C6.375 3.40214 5.8725 3.92857 5.25 3.92857C4.6275 3.92857 4.125 3.40214 4.125 2.75C4.125 2.09786 4.6275 1.57143 5.25 1.57143ZM5.25 6.875C3.495 6.875 0 7.79429 0 9.625V10.2143C0 10.6464 0.3375 11 0.75 11H9.75C10.1625 11 10.5 10.6464 10.5 10.2143V9.625C10.5 7.79429 7.005 6.875 5.25 6.875ZM1.755 9.42857C2.385 8.97286 3.9075 8.44643 5.25 8.44643C6.5925 8.44643 8.115 8.97286 8.745 9.42857H1.755ZM10.53 6.92214C11.4 7.58214 12 8.46214 12 9.625V11H14.25C14.6625 11 15 10.6464 15 10.2143V9.625C15 8.03786 12.375 7.13429 10.53 6.92214ZM9.75 5.5C11.1975 5.5 12.375 4.26643 12.375 2.75C12.375 1.23357 11.1975 0 9.75 0C9.345 0 8.97 0.102143 8.625 0.275C9.0975 0.974286 9.375 1.83071 9.375 2.75C9.375 3.66929 9.0975 4.52571 8.625 5.225C8.97 5.39786 9.345 5.5 9.75 5.5Z" fill="#000"></path>
        </svg>
        <span>Audience Details</span>&nbsp;by Followers
        <RoundInfo className='mgl5'/>
      </Box>
      <Box className='wrapper-grid'>
        <Box>
          <Box className='box-wrapper-shadow grid-item' sx={{marginBottom:'.5rem'}}>
            <svg fill="none" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.48 11.95c.17.02.34.05.52.05 2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4c0 .18.03.35.05.52l3.43 3.43zm2.21 2.21l5.74 5.74c.33-.17.57-.5.57-.9v-1c0-2.14-3.56-3.5-6.31-3.84zM2.12 2.42A.996.996 0 10.71 3.83L4 7.12V10H2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2.88l2.51 2.51C9.19 15.11 7 16.3 7 18v1c0 .55.45 1 1 1h8.88l3.29 3.29a.996.996 0 101.41-1.41L2.12 2.42zM6 10v-.88l.88.88H6z" fill="#FA8F38"></path>
            </svg>
            <Box className='subtitle'>23.71%</Box>
            <Box sx={{display: 'flex', justifContent: 'center'}}>
              <span>FAKE FOLLOWERS</span>
              <RoundInfo marginLeft='.5rem' />
            </Box>
          </Box>
          <Box className='box-wrapper-shadow grid-item'>
            <Box sx={{display: 'flex'}}>
              <Box className='subtitle1'>Gender Split</Box>  
              <RoundInfo marginLeft='.5rem' />
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
          <Box sx={{display: 'flex'}}>
            <Box className='subtitle1'>Location by Country</Box>  
            <RoundInfo marginLeft='.5rem' />
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
          <Box sx={{display: 'flex', marginTop:'30px', marginBottom:'10px'}}>
            <Box className='subtitle2'>Location by Top 3 Cities</Box>  
          </Box>
          <Box sx={{display: 'flex'}}>
            <span>1. San paulo</span>
          </Box>
          <Box sx={{display: 'flex'}}>
            <span>2. Jakarta</span>
          </Box>
          <Box sx={{display: 'flex'}}>
            <span>3. Rio De Janeiro</span>
          </Box>
        </Box>
      </Box>

      <Box className='wrapper-box box-wrapper-shadow'>
        <Box sx={{display: 'flex'}}>
          <Box className='subtitle1'>Age and Gender Split</Box>  
          <RoundInfo marginLeft='.5rem' />
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
    
      <Box className='wrapper-box box-wrapper-shadow'>
        <Box sx={{display: 'flex'}}>
          <Box className='subtitle1'>エンゲージメント</Box>  
          <RoundInfo marginLeft='.5rem' />
        </Box>
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
          <Box className='genre-span'>#finaollafine</Box>
          <Box className='genre-span'>#vamoscomtudo</Box>
          <Box className='genre-span'>#forzajvue</Box>
          <Box className='genre-span'>#c7eyewear</Box>
          <Box className='genre-span'>#clearman</Box>
          <Box className='genre-span'>#portugual</Box>
          <Box className='genre-span'>#nikefootball</Box>
          <Box className='genre-span'>#gerginoago</Box>
        </Box>  
      </Box>

      <Box className='wrapper-box box-wrapper-shadow'>
        <Box sx={{display: 'flex'}}>
          <Box className='subtitle1'>Popular # and @</Box>  
          <RoundInfo marginLeft='.5rem' />
        </Box>
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
          <Box className='genre-span'>#finaollafine</Box>
          <Box className='genre-span'>#vamoscomtudo</Box>
          <Box className='genre-span'>#forzajvue</Box>
          <Box className='genre-span'>#c7eyewear</Box>
          <Box className='genre-span'>#clearman</Box>
          <Box className='genre-span'>#portugual</Box>
          <Box className='genre-span'>#nikefootball</Box>
          <Box className='genre-span'>#gerginoago</Box>
        </Box>
      </Box>
      
      <Box className='wrapper-box box-wrapper-shadow'>
        <Box sx={{display: 'flex'}}>
          <Box className='subtitle1'>Lookalikes</Box>  
          <RoundInfo marginLeft='.5rem' />
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box
              className='mgr5'
              component={LazyLoadImage}
              effect="blur"
              src={'https://imgigp.modash.io/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDY9ylLT5c6L8M5YYtkm82Y2V5KPwPXcA2WyNRhPMoCHKMdtKG3eSEc5JQ8TgTu0NynllFlelISOb%2Blsdn%2FFsiegkW4xzvOq4WKYeHoY1KFSvw%3D%3D'}
              width={'18px'}
              height={'18px'}
              sx={{borderRadius:'50%', marginTop:'.5rem'}}
            />
            <Box 
              component="a"
              href="https://www.instagram.com/alxsndro12"
            >
              @alxsndro12
            </Box>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Button variant={'outlined'} className='alike-btn'>
              <svg fill="none" height="16" width="16" xmlns="http://www.w3.org/2000/svg" >
                <path d="M12.67 12l1.33.67V2c0-.73-.6-1.33-1.33-1.33H5.99c-.73 0-1.32.6-1.32 1.33h6.66c.74 0 1.34.6 1.34 1.33V12zM10 3.33H3.33C2.6 3.33 2 3.93 2 4.67v10.66l4.67-2 4.66 2V4.67c0-.74-.6-1.34-1.33-1.34z"></path>
              </svg>
            </Button>
            <Button variant={'outlined'} className='alike-btn' sx={{marginLeft:'.5rem'}}>
              <svg fill="none" height="16" width="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 11h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34A6.505 6.505 0 00.05 7.32c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L12.5 11zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"></path>
              </svg>
            </Button>
          </Box>
        </Box>
      </Box>

      <Box className='wrapper-box box-wrapper-shadow'>
        <Box sx={{display: 'flex'}}>
          <Box className='subtitle1'>Audience Interests</Box>  
          <RoundInfo marginLeft='.5rem' />
        </Box>
        <Box className='interest-span'>{'Friends, Family & Relationship'}</Box>
        <Box className='interest-span'>{'Sports'}</Box>
        <Box className='interest-span'>{'Clothes, Shoes, Handbags'}</Box>
        <Box className='interest-span'>{'Travel, Tourism & Aviation'}</Box>
        <Box className='interest-span'>{'Camera & Photography'}</Box>
      </Box>
    </Box>
  );
};

export default AudienceDetails;