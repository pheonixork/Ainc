/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import clsx from 'clsx';
import validator from 'validator'
import toast from 'react-hot-toast';
import React, {useMemo, useEffect, useRef, useState} from 'react';
import {Skeleton, Box, Button, Typography, TextField} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import styles from './styles';
import BillListTable from './BillListTable';
import {planService, userService} from 'services';

const mockdata = [
  {inumber: '3473C740-0007', bdate:'27 Sep 2021', amount: '498', status: 'paid'},
  {inumber: '3473C740-0006', bdate:'27 Aug 2021', amount: '498', status: 'paid'},
  {inumber: '3473C740-0005', bdate:'27 Jul 2021', amount: '498', status: 'paid'},
  {inumber: '3473C740-0004', bdate:'27 Jun 2021', amount: '498', status: 'paid'},
  {inumber: '3473C740-0003', bdate:'27 May 2021', amount: '612', status: 'paid'},
  {inumber: '3473C740-0002', bdate:'27 Apr 2021', amount: '498', status: 'paid'},
  {inumber: '3473C740-0001', bdate:'27 Jan 2021', amount: '498', status: 'paid'},
]

const Bill = ({user, ...rest}) => {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();

  const [isLoading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    setLoading(true);
    return planService.getUserInfo(user.id)
      .then((response) => {
        setUserInfo({...response.data});
        setLoading(false);
      });
  }, []);

  const companyRef = useRef();
  const urlRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const newpassRef = useRef();
  const addrRef = useRef();
  const [editDlg, showEditDlg] = useState(false);

  const saveContent = (e) => {
    if (companyRef.current.value.trim() === '') {
      toast.error('会社名を入力して下さい');
      return;
    }
    if (urlRef.current.value.trim() === '') {
      toast.error('URLを入力して下さい');
      return;
    }
    if (nameRef.current.value.trim() === '') {
      toast.error('担当者名を入力して下さい');
      return;
    }
    if (phoneRef.current.value.trim() === '') {
      toast.error('電話番号を入力して下さい');
      return;
    }
    if (emailRef.current.value.trim() === '') {
      toast.error('メールアドレスを入力して下さい');
      return;
    }
    if (!validator.isEmail(emailRef.current.value)) {
      toast.error('メールアドレスを正確に入力して下さい。');
      return;
    }
    if (addrRef.current.value.trim() === '') {
      toast.error('住所を入力して下さい');
      return;
    }

    let obj = {
      company: companyRef.current.value,
      url: urlRef.current.value,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      addr: addrRef.current.value
    };
    if (newpassRef.current.value.trim() !== '') {
      obj.password = newpassRef.current.value;
    }

    userService.updateUser(obj)
      .then((response) => {
        if (response.status === 'ok') {
          toast.success('更新しました。');
          showEditDlg(false);
        }
        else
          toast.error(response.msg);
      })
      .catch(error => {
        toast.error(error);
      });
  }

  const openContent = (e) => {
    companyRef.current.value = userInfo.company;
    urlRef.current.value = userInfo.url;
    nameRef.current.value = userInfo.name;
    phoneRef.current.value = userInfo.phone;
    emailRef.current.value = userInfo.email;
    newpassRef.current.value = '';
    addrRef.current.value = userInfo.addr; 

    showEditDlg(true);
  }

  const passRef = useRef();
  const passConfRef = useRef();

  const [showDlg, setShowDlg] = useState(false);
  const setClicked = (e) => {
    if (passRef.current.value.trim() === '') {
      toast.error('パスワードを入力して下さい。');
      return;
    }
    if (passRef.current.value !== passConfRef.current.value) {
      toast.error('パスワードとパスワードが違いです');
      return;
    }

    userService.changePwd(userInfo._id, passRef.current.value)
      .then((response) => {
        toast.success('パスワードを再設定しました');
        setShowDlg(false);
      });
  }

  const cancelClicked = (e) => {
    setShowDlg(false);
  }

  return (
    <Box className="billWrapper" {...rest}>
      <Box className={clsx(classes.contentWrapper, classes.bigShadow)}>
        <Typography className={classes.boldFont} variant={'h5'}>基本情報</Typography>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>会社名</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{transform:'unset'}}/>
          ) : (
            <Typography>{userInfo.company ?? ''}</Typography>
          )}
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>HP</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{transform:'unset'}}/>
          ) : (
            <Typography>{userInfo.url ?? ''}</Typography>
          )}  
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>担当者名</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{transform:'unset'}}/>
          ) : (
            <Typography>{userInfo.name ?? ''}</Typography>
          )}
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>電話番号</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{transform:'unset'}}/>
          ) : (
            <Typography>{userInfo.phone ?? ''}</Typography>
          )}
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>メールアドレス</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{transform:'unset'}}/>
          ) : (
            <Typography>{userInfo.email ?? ''}</Typography>
          )}
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>パスワード</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{transform:'unset'}}/>
          ) : (
            <Typography 
              style={{textDecoration: 'underline', color: '#1123EF', cursor: 'pointer'}}
              onClick={e=>setShowDlg(true)}
            >
              再設定
            </Typography>
          )}
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>住所</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{transform:'unset'}}/>
          ) : (
            <Typography>{userInfo.addr ?? ''}</Typography>
          )}
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Box />
          <Box>
            <Button className="active" onClick={openContent} size="small">編集</Button>
          </Box>
        </Box>
      </Box>
      <Box className={clsx(classes.contentWrapper, classes.bigShadow, classes.mt30)}>
        <BillListTable data={mockdata} />
      </Box>
      {showDlg && 
        <Box className={classes.passwordresetdlg} >
          <Box className={classes.passwordinput}>
            <Typography style={{marginRight:'.5rem'}}>パスワード</Typography>
            <TextField inputRef={passRef} size="small" type="password"></TextField>
          </Box>
          <Box className={classes.passwordinput}>
            <Typography style={{marginRight:'.5rem'}}>パスワード再入力</Typography>
            <TextField inputRef={passConfRef} size="small" type="password"></TextField>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
            <Button className="active" onClick={setClicked}>確定</Button>
            <Button sx={{marginLeft:'.5rem'}} onClick={cancelClicked} className="inactive">キャンセル</Button>
          </Box>
        </Box>
      }
      <Box className={clsx(classes.passwordresetdlg, classes.editdlg)} sx={{display: `${editDlg === true ? 'block' : 'none'}`}}>
        <Box className={classes.passwordinput}>
          <Typography style={{marginRight:'.5rem'}}>会社名</Typography>
          <TextField inputRef={companyRef} size="small"></TextField>
        </Box>
        <Box className={classes.passwordinput}>
          <Typography style={{marginRight:'.5rem'}}>HP</Typography>
          <TextField inputRef={urlRef} size="small"></TextField>
        </Box>
        <Box className={classes.passwordinput}>
          <Typography style={{marginRight:'.5rem'}}>担当者名</Typography>
          <TextField inputRef={nameRef} size="small"></TextField>
        </Box>
        <Box className={classes.passwordinput}>
          <Typography style={{marginRight:'.5rem'}}>電話番号</Typography>
          <TextField inputRef={phoneRef} size="small"></TextField>
        </Box>
        <Box className={classes.passwordinput}>
          <Typography style={{marginRight:'.5rem'}}>メールアドレス</Typography>
          <TextField inputRef={emailRef} size="small"></TextField>
        </Box>
        <Box className={classes.passwordinput}>
          <Typography style={{marginRight:'.5rem'}}>パスワード</Typography>
          <TextField inputRef={newpassRef} size="small" type="password"></TextField>
        </Box>
        <Box className={classes.passwordinput}>
          <Typography style={{marginRight:'.5rem'}}>住所</Typography>
          <TextField inputRef={addrRef} size="small"></TextField>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
          <Button className="active" onClick={saveContent}>保存</Button>
          <Button sx={{marginLeft:'.5rem'}} onClick={e=>showEditDlg(false)} className="inactive">キャンセル</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Bill;
