/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import toast from 'react-hot-toast';
import {Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import {TiktokStatic} from '.';
import {ReportTiktokTable} from '../../Table';
import {campaignService} from 'services';
import styles from '../../Table/styles';

const TiktokPage = ({selCampId, isLoading, data}) => {
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

  const changeMembers = (accId, detail={}) => {
    return campaignService.updateReportTiktok(selCampId, accId, detail)
      .then((ret) => {
        if (ret.status !== 'ok') {
          toast.error('状態保存に失敗しました。');
          return;
        }
        toast.success('状態保存に成功しました。');

        let tUpdates = _.map(updatedMembers, itm => {
          if (itm.accountId !== accId)
            return itm;
          
          return {...itm, ...detail};
        });
  
        setUpdatedMembers([...tUpdates]);
      })
      .catch(error => {
        toast.error(error.toString());
      });
  }

  return (
    <Box className='report-page'>
      <TiktokStatic 
        isLoading={isLoading} 
        getDatas={getUpdatedMembers} 
        classes={classes}
      />
      <Box marginTop={4}>
        <ReportTiktokTable 
          getDatas={getRows}
          updateDatas={changeMembers}
          classes={classes}
        />
      </Box>
    </Box>
  );
};

export default TiktokPage;
