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
    if (type === 'add') { // ???????????????????????????
      return campaignService.addNewReport(selCampId, memId, rtype)
        .then((ret) => {
          if (ret.status !== 'ok') {
            toast.error('????????????????????????????????????');
            return;
          }
    
          let temp = _.filter(updatedMembers, itm => itm._id === memId);
          setUpdatedMembers([...updatedMembers, {...temp[0], _id: ret.newId, rtype: 0}]);

          setCandidates([...candidates, {...temp[0], _id: ret.newId, rtype: 0}]);
        })
        .catch(error => {
          toast.error(error.toString());
        });
    }

    if (type === 'del') { //???????????????????????????
      let sameMembers = 0;
      updatedMembers.map(itm => {
        if (itm.accountId === detail)
          sameMembers ++;
      });

      if (sameMembers === 1) {
        toast.error('????????????????????????');
        return;
      }

      return campaignService.updateReport(selCampId, memId, 0)
        .then((ret) => {
          if (ret.status !== 'ok') {
            toast.error('????????????????????????????????????');
            return;
          }
          toast.success('?????????????????????');
    
          if (rtype === 1) {
            let tFeeds = _.filter(feeds, itm => itm._id !== memId);
            setFeeds(tFeeds);
          } else if (rtype === 2) {
            let tStories = _.filter(stories, itm => itm._id !== memId);
            setStories(tStories);
          } else if (rtype === 3) {
            let tRils = _.filter(rils, itm => itm._id !== memId);
            setRils(tRils);
          }

          let tUpdates = _.filter(updatedMembers, itm => itm._id !== memId);
          setUpdatedMembers([...tUpdates]);
        })
        .catch(error => {
          toast.error('????????????????????????');
        });
    }

    if (type === 'update') { // ?????????????????????
      return campaignService.updateReport(selCampId, memId, rtype, detail)
        .then((ret) => {
          if (ret.status !== 'ok') {
            toast.error('????????????????????????????????????');
            return;
          }
          toast.success('?????????????????????');

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
