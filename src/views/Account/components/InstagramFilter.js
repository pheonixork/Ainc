/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useTheme} from '@mui/material/styles';
import {FltAutocomplete, FltSingleSelect, FltMultiSelect, FltTextField, FltRangeSelect} from '../../Common/SearchFilters';
import Lang from 'constants/lang';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];

const interests = [
  'テレビ / 映画',
  '音楽',
  'ショッピング/小売り',
  'コーヒー/紅茶/飲料',
  'カメラ/写真',
  '服/シューズ/ハンドバッグ/アクセサリー',
  'ビール/ワイン/お酒',
  'スポーツ',
  'パソコン/電子機器',
  'ゲーム',
  'アクティブウェアー',
  'アート/デザイン',
  '旅行/観光',
  'ビジネス/キャリア',
  'ビューティー/コスメ',
  'ヘルスケア',
  'ジュエリー/時計',
  'レストラン/食べ物',
  '子供',
  'フィットネス/ヨガ',
  'ウェディング',
  'タバコ/スモーキング',
  'ペット',
  '健康',
  'ラグジュアリーグッズ',
  'インテリア/ガーデニング',
  '友人/家族',
  '車/バイク'
]

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const languages = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const followers = [1000, 5000, 10000, 15000, 25000, 50000, 100000, 250000, 500000, 1000000];

const ages = ['13-17', '18-24', '25-34', '35-44', '45+'];

const engages = ['>1%', '>2% (average)', '>3%', '>4%', '>5%', '>6%', '>7%', '>8%', '>9%', '>10%'];

export default function InstagramFilter() {
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
              values={top100Films} />
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
            <FltMultiSelect 
              clearFlag={clearFlag}
              tip={Lang.caption.interestcare}
              icon={false}
              values={interests}
            />
          </Box>
          <Box sx={{minWidth:'150px', flex:1}}>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip={Lang.caption.language}
              icon={false} 
              values={languages}
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
              values={top100Films} 
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
            <FltMultiSelect 
              clearFlag={clearFlag}
              tip={Lang.caption.interest}
              icon={true}
              values={names}
              caption={Lang.caption.other_tip}
            />
          </Box>
          <Box sx={{minWidth:'246px'}}>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip={Lang.caption.language}
              icon={false} 
              values={languages}
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