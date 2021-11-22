import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import {FilterSelect, InfluencerBrief} from '../Common';
import {Instagram, Youtube, Tiktok} from './components';

import Keyword from 'constants/lang';
import Constants from 'constants/constants';
import {modashService} from 'services';
import {testService} from 'services';
import toast from 'react-hot-toast';

const matchingInterest = {
  'Television & Film': 'テレビ / 映画',
  'Music': '音楽',
  'Shopping & Retail': 'ショッピング/小売り',
  'Coffee, Tea & Beverages': 'コーヒー/紅茶/飲料',
  'Camera & Photography': 'カメラ/写真',
  'Clothes, Shoes, Handbags & Accessories': '服/シューズ/ハンドバッグ/アクセサリー',
  'Beer, Wine & Spirits': 'ビール/ワイン/お酒',
  'Sports': 'スポーツ',
  'Electronics & Computers': 'パソコン/電子機器',
  'Gaming': 'ゲーム',
  'Activewear': 'アクティブウェアー',
  'Art & Design': 'アート/デザイン',
  'Travel, Tourism & Aviation': '旅行/観光',
  'Business & Careers': 'ビジネス/キャリア',
  'Beauty & Cosmetics': 'ビューティー/コスメ',
  'Healthcare & Medicine': 'ヘルスケア',
  'Jewellery & Watches': 'ジュエリー/時計',
  'Restaurants, Food & Grocery': 'レストラン/食べ物',
  'Toys, Children & Baby': '子供',
  'Fitness & Yoga': 'フィットネス/ヨガ',
};

const Research = () => {
  const [selType, onSelect] = useState(Constants.snsInstagram);

  const [interests, setInterests] = useState([]);
  useEffect(() => {
    if (interests.length > 0)
      return;

    return modashService.getInterests(Constants.snsInstagram)
      .then((response) => {
        let data = response.data;
        if (data.error !== false) 
          return;

        let results = _.map(data.interests, itm => {
          return {name: _.get(matchingInterest, itm.name), id: itm.id}
        });

        setInterests(results);
      }).catch(msg => {
        toast.error(msg);
      });
  }, []);

  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    if (languages.length > 0)
      return;

    return modashService.getLanguages(Constants.snsInstagram)
      .then((response) => {
        let data = response.data;
        if (data.error !== false) 
          return;

        setLanguages(data.languages);
      }).catch(msg => {
        toast.error(msg);
      });
  }, []);

  const [locations, setLocations] = useState([]);
  useEffect(() => {
    if (locations.length > 0)
      return;

    return modashService.getLocations(Constants.snsInstagram)
      .then((response) => {
        let data = response.data;
        if (data.error !== false) 
          return;

        setLocations(data.locations);
      }).catch(msg => {
        toast.error(msg);
      });
  }, []);

  return (
    <Fixed>
      <Container className='research content-wrapper'>
        <Box marginTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            {Keyword.nav.accountresearch}
          </Typography>
          <Typography
            gutterBottom
          >
            {Keyword.label.searchfromsite}
          </Typography>
        </Box>
        <Box marginTop={4}>
          <FilterSelect curType={selType} onSelect={onSelect}/>
        </Box>
        <Box marginTop={2}>
          <Instagram 
            interests={interests}
            languages={languages}
            locations={locations}
            selected={selType === Constants.snsInstagram} 
            display={`${selType === Constants.snsInstagram ? 'block' : 'none'}`} 
          />
          <Youtube 
            interests={interests}
            languages={languages}
            locations={locations}
            selected={selType === Constants.snsYoutube} 
            display={`${selType === 'youtube' ? 'block' : 'none'}`} 
          />
          <Tiktok 
            interests={interests}
            languages={languages}
            locations={locations}
            selected={selType === Constants.snsTiktok} 
            display={`${selType === 'tiktok' ? 'block' : 'none'}`} 
          />
        </Box>  
        <InfluencerBrief /> 
      </Container>
    </Fixed>
  );
};

export default Research;
