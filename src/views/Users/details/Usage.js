/* eslint-disable react/no-unescaped-entities */
import moment from 'moment';
import clsx from 'clsx';
import React, {useState} from 'react';
import {Box, Button, Paper} from '@mui/material';
import {AlertDlg} from 'views/Common';
import {UsageNormal, UsageCustom, UsageInfo} from '.';
import {planService} from 'services';

const Usage = ({getDatas, getUsages, classes}) => {
  const [userInfo, setUserInfo] = useState(getDatas());
  const [showAlert, showAlertDlg] = useState(false);
  const closeAlertDlg = (status) => {
    if (status === false) {
      showAlertDlg(false);
      return;
    }

    setUserInfo({...userInfo, plantype: 'カスタム'});
    showAlertDlg(false);
  }

  const switchCustomHandle = (e) => {
    if (userInfo.plantype === 'カスタム') {
      return planService.closeCustom(userInfo._id, moment().format('YYYY/MM/DD'))
        .then((response) => {
          setUserInfo({...userInfo, plantype: 'Free trial'});
        });
    }
    showAlertDlg(true);
  }

  return (
    <Paper className="user-wrapper user-padding-small" sx={{marginTop: '30px !important'}}>
      {userInfo.plantype !== 'カスタム' ? 
        <UsageNormal getDatas={getDatas} classes={classes} /> : 
        <UsageCustom getDatas={getDatas} classes={classes} />
      }
      <UsageInfo getUsages={getUsages} classes={classes} />
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Button className="active" onClick={switchCustomHandle}>
          {`${userInfo.plantype === 'カスタム' ? 'カスタム終了' : 'カスタム'}`}
        </Button>
      </Box>
      <AlertDlg 
        title={'注意'} 
        caption={'カスタムモードに切り替えると\r\n現在の設定が全て終了となります。\r\nよろしいですか？'}
        dlgState={showAlert}
        closeDlg={closeAlertDlg}
      />
    </Paper>
  );
};

export default Usage;