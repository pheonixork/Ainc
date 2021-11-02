/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import toast from 'react-hot-toast';
import {Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import {InstagramStatic, ReportTabSelect} from '.';
import {ReportFeedTable, ReportStoryTable, ReportRilTable, ReportCandidateTable} from '../../Table';
import {campaignService} from 'services';
import styles from '../../Table/styles';

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

    let tFeeds = _.filter(data, itm => itm.rtype && itm.rtype === 1);
    let tStories = _.filter(data, itm => itm.rtype && itm.rtype === 2);
    let tRils = _.filter(data, itm => itm.rtype && itm.rtype === 3);
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
    _.map(updatedMembers, itm => {
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

  const changeFeeds = (accId, type, rtype, detail={}) => {
    if (type === 'del') {
      return campaignService.updateReport(selCampId, accId, 0)
        .then((ret) => {
          if (ret.status !== 'ok') {
            toast.error('状態保存に失敗しました。');
            return;
          }
          toast.success('状態保存に成功しました。');
    
          if (rtype === 1) {
            _.map(feeds, itm => {
              if (itm.accountId !== accId)
                return;
              
              setCandidates([...candidates, itm]);
            });

            let tFeeds = _.filter(feeds, itm => itm.accountId !== accId);
            setFeeds(tFeeds);
          } else if (rtype === 2) {
            _.map(stories, itm => {
              if (itm.accountId !== accId)
                return;
              
              setCandidates([...candidates, itm]);
            });
            
            let tStories = _.filter(stories, itm => itm.accountId !== accId);
            setStories(tStories);
          } else if (rtype === 3) {
            _.map(rils, itm => {
              if (itm.accountId !== accId)
                return;
              
              setCandidates([...candidates, itm]);
            });

            let tRils = _.filter(rils, itm => itm.accountId !== accId);
            setRils(tRils);
          }
        })
        .catch(error => {
          toast.error(error.toString());
        });
    }

    if (type === 'update') {
      return campaignService.updateReport(selCampId, accId, rtype, detail)
        .then((ret) => {
          if (ret.status !== 'ok') {
            toast.error('状態保存に失敗しました。');
            return;
          }
          toast.success('状態保存に成功しました。');

          let tUpdates = _.map(updatedMembers, itm => {
            if (itm.accountId !== accId)
              return itm;
            
            return {...itm, ...detail, rtype: rtype};
          });
    
          setUpdatedMembers([...tUpdates]);
        })
        .catch(error => {
          toast.error(error.toString());
        });
    }
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
          updateDatas={changeFeeds}
          classes={classes}
          sx={{display: selType === 'feed' ? 'block' : 'none'}}
        />
        <ReportStoryTable 
          getDatas={getStories}
          updateDatas={changeFeeds}
          classes={classes}
          sx={{display: selType === 'story' ? 'block' : 'none'}}
        />
        <ReportRilTable 
          getDatas={getRils}
          updateDatas={changeFeeds}
          classes={classes}
          sx={{display: selType === 'rir' ? 'block' : 'none'}}
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
