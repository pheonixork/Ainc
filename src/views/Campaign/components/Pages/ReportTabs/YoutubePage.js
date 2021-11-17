/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import toast from 'react-hot-toast';
import {Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import {YoutubeStatic} from '.';
import {ReportYoutubeTable} from '../../Table';
import {campaignService} from 'services';
import styles from '../../Table/styles';

const YoutubePage = ({selCampId, isLoading, data, catType}) => {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();
  
  const [rows, setRows] = useState([]);
  const [updatedMembers, setUpdatedMembers] = useState([]);

  useEffect(() => {
    if (data.length < 1)
      return;

    setRows([...data]);
    setUpdatedMembers([...data]);

  }, [data]);

  const getUpdatedMembers = useCallback(() => {
    return updatedMembers;
  }, [updatedMembers]);

  const getRows = useCallback(() => {
    return rows;
  }, [rows]);

  const changeMembers = (type, memId, detail={}) => {
    if (type === 'add') { // 同じアカウント追加
      return campaignService.addNewReportYoutube(selCampId, memId)
        .then((ret) => {
          if (ret.status !== 'ok') {
            toast.error('状態保存に失敗しました。');
            return;
          }
    
          let tmp = _.filter(rows, itm => itm._id === memId);
          setRows([...rows, {...tmp[0], _id: ret.newId}]);

          tmp = _.filter(updatedMembers, itm => itm._id === memId);
          setUpdatedMembers([...rows, {...updatedMembers[0], _id: ret.newId}]);
        })
        .catch(error => {
          toast.error(error.toString());
        });
    }

    if (type === 'del') { //　アカウントを削除
      let sameMembers = 0;
      updatedMembers.map(itm => {
        if (itm.accountId === detail)
          sameMembers ++;
      });

      if (sameMembers === 1) {
        toast.error('削除できません');
        return;
      }
      
      return campaignService.updateReportYoutube(selCampId, memId)
        .then((ret) => {
          if (ret.status !== 'ok') {
            toast.error('状態保存に失敗しました。');
            return;
          }
          toast.success('保存しました。');
    
          setRows(_.filter(rows, itm => itm._id !== memId))
          setUpdatedMembers(_.filter(updatedMembers, itm => itm._id !== memId));
        })
        .catch(error => {
          toast.error(error.toString());
        });
    }

    if (type === 'save') {
      return campaignService.updateReportYoutube(selCampId, memId, detail)
        .then((ret) => {
          if (ret.status !== 'ok') {
            toast.error('状態保存に失敗しました。');
            return;
          }
          toast.success('保存しました。');

          let tUpdates = _.map(updatedMembers, itm => {
            if (itm._id !== memId)
              return itm;
            
            return {...itm, ...detail};
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
      <YoutubeStatic 
        isLoading={isLoading} 
        getDatas={getUpdatedMembers} 
        classes={classes}
      />
      <Box marginTop={4}>
        <ReportYoutubeTable 
          catType={catType}
          getDatas={getRows}
          updateDatas={changeMembers}
          classes={classes}
        />
      </Box>
    </Box>
  );
};

export default YoutubePage;
