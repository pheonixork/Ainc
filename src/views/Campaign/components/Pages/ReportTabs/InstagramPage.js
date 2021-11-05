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

const InstagramPage = ({selCampId, isLoading, data, catType}) => {
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

  const changeFeeds = (memId, type, rtype, detail={}) => {
    if (type === 'add') { // 同じアカウント追加
      return campaignService.addNewReport(selCampId, memId, rtype)
        .then((ret) => {
          if (ret.status !== 'ok') {
            toast.error('状態保存に失敗しました。');
            return;
          }
    
          if (rtype === 1) {
            let tmp = _.filter(feeds, itm => itm._id === memId);

            setFeeds([...feeds, {...tmp[0], _id: ret.newId, rtype: rtype}]);
          } else if (rtype === 2) {
            let tmp = _.filter(stories, itm => itm._id === memId);

            setStories([...stories, {...tmp[0], _id: ret.newId, rtype: rtype}]);
          } else if (rtype === 3) {
            let tmp = _.filter(rils, itm => itm._id === memId);

            setRils([...rils, {...tmp[0], _id: ret.newId, rtype: rtype}]);
          }

          let temp = _.filter(updatedMembers, itm => itm._id === memId);
          setUpdatedMembers([...updatedMembers, {...temp[0], _id: ret.newId, rtype: rtype}]);
        })
        .catch(error => {
          toast.error(error.toString());
        });
    }

    if (type === 'del') { //　アカウントを削除
      return campaignService.updateReport(selCampId, memId, 0)
        .then((ret) => {
          if (ret.status !== 'ok') {
            toast.error('状態保存に失敗しました。');
            return;
          }
          toast.success('状態保存に成功しました。');
    
          if (rtype === 1) {
            _.map(feeds, itm => {
              if (itm._id !== memId)
                return;
              
              setCandidates([...candidates, itm]);
            });

            let tFeeds = _.filter(feeds, itm => itm._id !== memId);
            setFeeds(tFeeds);
          } else if (rtype === 2) {
            _.map(stories, itm => {
              if (itm._id !== memId)
                return;
              
              setCandidates([...candidates, itm]);
            });
            
            let tStories = _.filter(stories, itm => itm._id !== memId);
            setStories(tStories);
          } else if (rtype === 3) {
            _.map(rils, itm => {
              if (itm._id !== memId)
                return;
              
              setCandidates([...candidates, itm]);
            });

            let tRils = _.filter(rils, itm => itm._id !== memId);
            setRils(tRils);
          }
        })
        .catch(error => {
          toast.error(error.toString());
        });
    }

    if (type === 'update') { // 入力情報を保存
      return campaignService.updateReport(selCampId, memId, rtype, detail)
        .then((ret) => {
          if (ret.status !== 'ok') {
            toast.error('状態保存に失敗しました。');
            return;
          }
          toast.success('状態保存に成功しました。');

          let tUpdates = _.map(updatedMembers, itm => {
            if (itm._id !== memId)
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
          catType={catType}
          getDatas={getFeeds}
          updateDatas={changeFeeds}
          classes={classes}
          sx={{display: selType === 'feed' ? 'block' : 'none'}}
        />
        <ReportStoryTable 
          catType={catType}
          getDatas={getStories}
          updateDatas={changeFeeds}
          classes={classes}
          sx={{display: selType === 'story' ? 'block' : 'none'}}
        />
        <ReportRilTable 
          catType={catType}
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
