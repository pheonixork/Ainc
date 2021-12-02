/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useTheme} from '@mui/material/styles';
import {FltAutocomplete, FltSingleSelect, FltSingleSelectObject, FltMultiSelect, FltTextField, FltRangeSelect} from '../../Common/SearchFilters';
import {FltInfluencerView, FltAudienceAges, FltAudienceGender, FltAudienceInterests, FltAudienceLanguage, FltAudienceLocation, FltInfluencerBio, FltInfluencerContract, FltInfluencerEngage, FltInfluencerFollowers, FltInfluencerGender, FltInfluencerHash, FltInfluencerInterest, FltInfluencerKeyword, FltInfluencerLanguage, FltInfluencerLocation, FltInfluencerPost} from '../../Common/SearchFilters';
import Keyword from 'constants/lang';
import {modashService} from 'services';
import toast from 'react-hot-toast';
import Constants from 'constants/constants';

const followers = [1000, 5000, 10000, 15000, 25000, 50000, 100000, 250000, 500000, 1000000];

const ages = ['13-17', '18-24', '25-34', '35-44', '45+'];

const engages = ['>1%', '>2% (average)', '>3%', '>4%', '>5%', '>6%', '>7%', '>8%', '>9%', '>10%'];

export default function YoutubeFilter({interests, languages, searchFromServer}) {
  const [clearFlag, setClearFlag] = useState(false);
  const theme = useTheme();
  const clearFilterClicked = (e) => {
    setClearFlag(!clearFlag);
  }

  const [audienceFilter, setAudienceFilter] = useState({
    age:[], 
    gender: null, 
    language: null, 
    location:[]
  });
  const [influencerFilter, setInfluencerFilter] = useState({
    engagementRate: null,
    followers: {},
    gender: null,
    hasContactDetails: null,
    interests: [],
    language: null,
    location: [],
    relevance: [],
    views: {},
  });

  const startSearch = (e) => {
    searchFromServer({audience: audienceFilter, influencer: influencerFilter});
  }

  const setAudience = (field, value) => {
    setAudienceFilter({...audienceFilter, [field]:value});
  }

  const setInfluencer = (field, value) => {
    setInfluencerFilter({...influencerFilter, [field]:value});
  }

  const setKeyword = (value) => {
    setInfluencerFilter({...influencerFilter, 'relevance':['@'+value]});
  }

  return (
    <Box>
      <Box className='search-box' >
        <Typography
          variant="body1"
          style={{fontWeight: '600'}}
        >
          インフルエンサーフィルター • <span style={{fontSize:'14px', fontWeight:'normal'}}>フォロワー数やエンゲージメント率などで絞り込み</span>
        </Typography>

        <Box 
          sx={{display: 'flex', flexShrink: 0, flexWrap: 'wrap'}}>
          <Box sx={{flex: 1, flexGrow: 1, alignItems: 'stretch', minWidth:'250px !important'}}>
            <FltInfluencerLocation 
              clearFlag={clearFlag}
              tip={Keyword.caption.influencerlocation}
              phstr='インフルエンサ―の地域'
              icon={false} 
              setValues={setInfluencer}
            />
          </Box>
          <Box>
            <FltInfluencerFollowers
              clearFlag={clearFlag}
              tip={Keyword.caption.subscriber}
              icon={false}
              fromValues={followers}
              fromStyle={{width:'8rem'}}
              toValues={[...followers, '1000000+']}
              toStyle={{width:'8rem', marginLeft:'10px'}}
              setValues={setInfluencer}
            />
          </Box>
          <Box>
            <FltInfluencerView
              clearFlag={clearFlag}
              tip={Keyword.caption.averageview}
              icon={false}
              fromValues={followers}
              fromStyle={{width:'8rem'}}
              toValues={[...followers, '1000000+']}
              toStyle={{width:'8rem', marginLeft:'10px'}}
              setValues={setInfluencer}
            />
          </Box>
          <Box>
            <FltInfluencerGender 
              clearFlag={clearFlag}
              tip={Keyword.caption.gender}
              icon={false} 
              values={['MALE', 'FEMALE']}
              style={{width:'8rem'}}
              setValues={setInfluencer}
            />
          </Box>
          <Box sx={{minWidth:'350px', flex:1}}>
            <FltInfluencerLanguage
              clearFlag={clearFlag}
              tip={Keyword.caption.language}
              icon={false} 
              values={languages}
              itmKey='code'
              itmValue='name'
              style={{width: '100% !important'}}
              setValues={setInfluencer}
            />
          </Box>
          <Box >
            <FltInfluencerPost 
              clearFlag={clearFlag}
              tip={Keyword.caption.post}
              icon={false} 
              values={['30 days', '3 Months', '6 Months']}
              style={{width:'12rem'}}
            />
          </Box>
          <Box>
            <FltInfluencerEngage 
              clearFlag={clearFlag}
              tip={Keyword.caption.engagement}
              icon={true} 
              values={engages}
              style={{width:'12rem'}}
              caption={Keyword.caption.engagement_tip}
              setValues={setInfluencer}
            />
          </Box>
          <Box>
            <FltInfluencerContract 
              clearFlag={clearFlag}
              tip={Keyword.caption.contractinfo}
              icon={false} 
              values={['Email available']}
              style={{width:'13rem'}}
              setValues={setInfluencer}
            />
          </Box>
          <Box sx={{width:'300px'}}>
            <FltInfluencerKeyword 
              clearFlag={clearFlag} 
              tip={Keyword.caption.keyword} 
              icon={true} 
              phstr='Any' 
              caption={Keyword.caption.keyword_tip}
              setValues={setInfluencer}
            />
          </Box>
        </Box>
      </Box>
      <Box className='search-box' >
        <Typography
          variant="body1"
          style={{fontWeight: '600'}}
        >
          フォロワーフィルター• <span style={{fontSize:'14px', fontWeight:'normal'}}>フォロワーの地域や性別などから絞り込み</span>
        </Typography>

        <Box 
          sx={{display: 'flex', flexShrink: 0, flexWrap: 'wrap'}}>
          <Box sx={{flex: 1, flexGrow: 1, alignItems: 'stretch', minWidth:'250px !important'}}>
            <FltAudienceLocation 
              clearFlag={clearFlag}
              tip={Keyword.caption.audiencelocation}
              phstr='フォロワーの地域' 
              icon={true} 
              caption={Keyword.caption.other_tip} 
              setValues={setAudience}
            />
          </Box>
          <Box>
            <FltAudienceGender 
              clearFlag={clearFlag}
              tip={Keyword.caption.gender}
              icon={true} 
              values={['MALE', 'FEMALE']}
              caption={Keyword.caption.other_tip}
              style={{width:'8rem'}}
              setValues={setAudience}
            />
          </Box>
          <Box sx={{width:'8rem'}}>
            <FltAudienceAges 
              clearFlag={clearFlag}
              tip={Keyword.caption.age}
              icon={true}
              values={ages}
              caption={Keyword.caption.other_tip}
              setValues={setAudience}
            />
          </Box>
          <Box sx={{minWidth:'246px'}}>
            <FltAudienceLanguage 
              clearFlag={clearFlag}
              tip={Keyword.caption.language}
              icon={false} 
              values={languages}
              itmKey='code'
              itmValue='name'
              setValues={setAudience}
            />
          </Box>
        </Box>
      </Box>
      <Box className='search-box' >
        <Typography
          variant="body1"
          style={{fontWeight: '600'}}
        >
          ユーザーネーム • <span style={{fontSize:'14px', fontWeight:'normal'}}>特定のアカウントをチェックします</span>
        </Typography>
        <Box sx={{marginTop:'10px'}}>
          <TextField 
            size="small"
            fullWidth
            placeholder="@username"
            inputProps={{style:{
              fontSize:'14px',
              backgroundColor: theme.palette.clrVariables.grayWhite,
            }}}
            onChange={e=>setKeyword(e.target.value)}
          />
        </Box>
        <Box sx={{display:'flex', width:'100%', justifyContent:'flex-end', marginTop: '15px'}}>
          <Button
            variant={'outlined'}
            onClick={clearFilterClicked}
          >
            {Keyword.caption.clearall}
          </Button>
          <Button
            className="active"
            variant={'outlined'}
            sx={{marginLeft:'15px'}}
            onClick={startSearch}
          >
            {Keyword.caption.search}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};