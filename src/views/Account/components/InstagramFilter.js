/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useTheme} from '@mui/material/styles';
import {FltAutocomplete, FltSingleSelect, FltSingleSelectObject, FltMultiSelect, FltMultiSelectObject, FltTextField, FltRangeSelect} from '../../Common/SearchFilters';
import Lang from 'constants/lang';
import {modashService} from 'services';
import toast from 'react-hot-toast';
import Constants from 'constants/constants';

const followers = [1000, 5000, 10000, 15000, 25000, 50000, 100000, 250000, 500000, 1000000];

const ages = ['13-17', '18-24', '25-34', '35-44', '45+'];

const engages = ['>1%', '>2% (average)', '>3%', '>4%', '>5%', '>6%', '>7%', '>8%', '>9%', '>10%'];

export default function InstagramFilter({interests, languages, locations}) {
  const [clearFlag, setClearFlag] = useState(false);
  const theme = useTheme();

  const clearFilterClicked = (e) => {
    setClearFlag(!clearFlag);
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
          <Box sx={{flex: 1, flexGrow: 1, alignItems: 'stretch', minWidth:'calc(200px + 0.5rem) !important'}}>
            <FltAutocomplete 
              clearFlag={clearFlag}
              tip={Lang.caption.influencerlocation}
              phstr='インフルエンサ―の地域'
              icon={false} 
              values={locations} />
          </Box>
          <Box>
            <FltRangeSelect
              clearFlag={clearFlag}
              tip={Lang.caption.followers}
              icon={false}
              fromValues={followers}
              fromStyle={{width:'8rem'}}
              toValues={[...followers, '1000000+']}
              toStyle={{width:'8rem', marginLeft:'10px'}}
              />
          </Box>
          <Box>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip={Lang.caption.gender}
              icon={false} 
              values={['Male', 'Female']}
              style={{width:'8rem'}}/>
          </Box>
          <Box sx={{minWidth: '11.0108433735rem!important', maxWidth: '12.4285714286rem!important'}}>
            <FltMultiSelectObject 
              clearFlag={clearFlag}
              tip={Lang.caption.interestcare}
              icon={false}
              values={interests}
              itmKey='id'
              itmValue='name'
            />
          </Box>
          <Box sx={{minWidth:'150px', flex:1}}>
            <FltSingleSelectObject 
              clearFlag={clearFlag}
              tip={Lang.caption.language}
              icon={false} 
              values={languages}
              itmKey='code'
              itmValue='name'
              />
          </Box>
          <Box sx={{minWidth:'11.4285714286rem !important'}}>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip={Lang.caption.post}
              icon={false} 
              values={['30 days', '3 Months', '6 Months']}
              style={{width:'12rem'}}/>
          </Box>
          <Box>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip={Lang.caption.engagement}
              icon={true} 
              values={engages}
              caption={Lang.caption.engagement_tip}
              style={{width:'12rem'}}/>
          </Box>
          <Box style={{width:'17rem'}}>
            <FltTextField 
              clearFlag={clearFlag} 
              tip={Lang.caption.hashtag} 
              icon={true} 
              phstr='#hashtag' 
              caption={Lang.caption.other_tip}
            />
          </Box>
          <Box sx={{flex:1, minWidth:'120px !important'}}>
            <FltTextField 
              clearFlag={clearFlag} 
              tip='Bio' 
              icon={true} 
              phstr='discription' 
              caption={Lang.caption.bio_tip}
            />
          </Box>
          <Box sx={{minWidth:'220px'}}>
            <FltTextField 
              clearFlag={clearFlag} 
              tip={Lang.caption.keyword} 
              icon={true} 
              phstr='keyword' 
              caption={Lang.caption.keyword_tip}
            />
          </Box>
          <Box sx={{width:'12rem'}}>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip={Lang.caption.contractinfo}
              icon={false} 
              values={['Email available']}
              />
          </Box>
        </Box>
      </Box>
      <Box className='search-box' >
        <Typography
          variant="body1"
          style={{fontWeight: '600'}}
        >
          フォロワーフィルター • <span style={{fontSize:'14px', fontWeight:'normal'}}>フォロワーの地域や性別などから絞り込み</span>
        </Typography>
        <Box 
          sx={{display: 'flex', flexShrink: 0, flexWrap: 'wrap'}}>
          <Box sx={{flex: 1, flexGrow: 1, alignItems: 'stretch', minWidth:'calc(200px + 0.5rem) !important'}}>
            <FltAutocomplete 
              clearFlag={clearFlag}
              tip={Lang.caption.audiencelocation}
              phstr='フォロワーの地域' 
              icon={true} 
              values={locations} 
              caption={Lang.caption.other_tip}
            />
          </Box>
          <Box sx={{width:'8rem'}}>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip={Lang.caption.gender}
              icon={true} 
              values={['Male', 'Female']}
              caption={Lang.caption.other_tip}
            />
          </Box>
          <Box sx={{width: '8rem'}}>
            <FltMultiSelect 
              clearFlag={clearFlag}
              tip={Lang.caption.age}
              icon={true}
              values={ages}
              caption={Lang.caption.other_tip}
            />
          </Box>
          <Box sx={{
            flex: 1,
            minWidth: '7.7108433735rem !important',
            maxWidth: '11.7108433735rem !important',
          }}>
            <FltMultiSelectObject 
              clearFlag={clearFlag}
              tip={Lang.caption.interest}
              icon={true}
              values={interests}
              itmKey='id'
              itmValue='name'
              caption={Lang.caption.other_tip}
            />
          </Box>
          <Box sx={{minWidth:'246px'}}>
            <FltSingleSelectObject 
              clearFlag={clearFlag}
              tip={Lang.caption.language}
              icon={false} 
              values={languages}
              itmKey='code'
              itmValue='name'
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
          />
        </Box>
        <Box sx={{display:'flex', width:'100%', justifyContent:'flex-end', marginTop: '15px'}}>
          <Button
            variant={'outlined'}
            onClick={clearFilterClicked}
          >
            {Lang.caption.clearall}
          </Button>
          <Button
            className="active"
            variant={'outlined'}
            sx={{marginLeft:'15px'}}
          >
            {Lang.caption.search}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};