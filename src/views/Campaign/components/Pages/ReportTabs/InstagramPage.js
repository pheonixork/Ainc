/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import {InstagramStatic, ReportTabSelect} from '.';
import {ReportFeedTable, ReportCandidateTable} from '../../Table';
import styles from '../../Table/styles';

const rirHeadCells = [
  {
    id: 'id',
    label: 'アカウントID'
  },
  {
    id: 'postDate',
    label: '投稿日',
  },
  {
    id: 'postURL',
    label: '投稿URL',
  },
  {
    id: 'productName',
    label: '商品名',
  },
  {
    id: 'price',
    label: '金額',
  },
  {
    id: 'followers',
    label: 'フォロワー数',
  },
  {
    id: 'numberOfReach',
    label: 'リーチ数',
  },
  {
    id: 'percentOfReach',
    label: 'リーチ%',
  },
  {
    id: 'save',
    label: '保存',
  },
  {
    id: 'savePercent',
    label: '保存%',
  },
  {
    id: 'numberOfLikes',
    label: 'いいね数',
  },
  {
    id: 'numberOfComments',
    label: 'コメント数',
  },
  {
    id: 'normalEG',
    label: '通常/EG',
  },
  {
    id: 'prEG',
    label: 'PR/EG',
  }
];

const storyHeadCells = [
  {
    id: 'id',
    label: 'アカウントID'
  },
  {
    id: 'postDate',
    label: '投稿日',
  },
  {
    id: 'postURL',
    label: '投稿URL',
  },
  {
    id: 'productName',
    label: '商品名',
  },
  {
    id: 'budget',
    label: '予算',
  },
  {
    id: 'followers',
    label: 'フォロワー数',
  },
  {
    id: 'numberOfImp',
    label: 'インプ',
  },
  {
    id: 'percentOfImp',
    label: 'インプ%',
  },
  {
    id: 'numberOfClick',
    label: 'クリック',
  },
  {
    id: 'percentOfClick',
    label: 'クリック%',
  },
  {
    id: 'numberOfStamp',
    label: 'スタンプ',
  },
  {
    id: 'percentOfStamp',
    label: 'スタンプ%',
  },
  {
    id: 'earning',
    label: '売上',
  },
  {
    id: 'ROAS',
    label: 'ROAS',
  }
];


const InstagramPage = ({selCampId, isLoading, data}) => {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();
  
  const [selType, onSelect] = useState('feed');

  const [feeds, setFeeds] = useState([]);
  const [stories, setStories] = useState([]);
  const [rils, setRils] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [updatedMembers, setUpdatedMembers] = useState([]);

  useEffect(() => {
    if (data.length < 1)
      return;

    let tFeeds = _.filter(data, itm => !itm.rtype && itm.rtype === 1);
    let tStories = _.filter(data, itm => !itm.rtype && itm.rtype === 2);
    let tRils = _.filter(data, itm => !itm.rtype && itm.rtype === 3);
    let tCandidates = _.filter(data, itm => !itm.rtype || itm.rtype === 0);

    setFeeds([...tFeeds]);
    setStories([...tStories]);
    setRils([...tRils]);
    setCandidates([...tCandidates]);
    setUpdatedMembers([...data]);

  }, [data]);

  const getUpdatedMembers = useCallback(() => {
    return updatedMembers;
  }, [updatedMembers]);

  const getFeeds = useCallback(() => {
    return feeds;
  }, [feeds]);

  const getStories = useCallback(() => {
    return stories;
  }, [stories]);

  const getRils = useCallback(() => {
    return rils;
  }, [rils]);

  const getCandidates = useCallback(() => {
    return candidates;
  }, [candidates]);

  const changeCandidates = (selId, selType) => {
    _.map(candidates, itm => {
      if (itm._id !== selId)
        return;

      if (selType === 'feed')
        setFeeds([...feeds, itm]);
      else if (selType === 'story')
        setStories([...stories, itm]);  
      else
        setRils([...rils, itm]);
    });

    setCandidates(_.filter(candidates, itm => itm._id !== selId));
  }

  return (
    <Box className='report-page'>
      <InstagramStatic 
        isLoading={isLoading} 
        getDatas={getUpdatedMembers} 
        classes={classes}
      />
      <Box marginTop={4}>
        <ReportTabSelect curType={selType} onSelect={onSelect} classes={classes}/>
      </Box>
      <Box marginTop={4}>
        <ReportFeedTable 
          getDatas={getFeeds}
          classes={classes}
          sx={{display: selType === 'feed' ? 'block' : 'none'}}
        />
      </Box>
      <Box marginTop={4}>
        <ReportCandidateTable
          getDatas={getCandidates}
          updateCandiates={changeCandidates}
          classes={classes}
        />
      </Box>
    </Box>
  );
};

export default InstagramPage;
