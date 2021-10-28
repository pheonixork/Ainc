import _ from 'lodash';
import React, {useState, useRef, useMemo, useEffect} from 'react';
import validator from 'validator'
import {useRouter} from 'next/router';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import {Box, Typography, Button, Paper, TextField} from '@mui/material';
import Lang from 'constants/lang';
import {userService} from 'services';
import styles from '../styles';

const labels = ["会社名", "URL", "担当者名", "電話番号", "メールアドレス", "初期パスワード", "住所"];
const keys = ["company", "url", "name", "phone", "email", "password", "addr"];

const CreateComponent = () => {
  const router = useRouter();

  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();

  const [error, setError] = useState('');

  let refObjects = [];
  for (let i = 0; i < labels.length; i ++) {
    refObjects.push(useRef());
  }

  const focusOtherInput = (idx) => {
    if (idx === labels.length - 1)
      refObjects[0].current.focus();
    else
      refObjects[idx + 1].current.focus();
  }

  const createUser = () => {
    let idx = 0;
    for (idx = 0; idx < labels.length; idx ++) {
      if (refObjects[idx].current.value.trim() === '') {
        setError(labels[idx] + 'に値を入力してください。');
        refObjects[idx].current.focus();
        return;
      }
    }

    if (!validator.isEmail(refObjects[4].current.value)) {
      setError(labels[4] + 'を正確に入力してください。');
      refObjects[4].current.focus();
      return;
    }

    setError('');

    let inputValues = {};
    _.map(refObjects, itm => {
      _.set(inputValues, itm.current.name, itm.current.value);
    });

    userService.createUser(inputValues)
      .then((response) => {
        if (response.status === 'ok')
          router.push(`/users/detail/${response.id}`);
        else
          setError(response.msg);
      })
      .catch(error => {
        setError(error);
      });
  }

  return (
    <Box>
      <Box paddingTop={2}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            marginBottom: 4
          }}
        >
          新規作成
        </Typography>
        
      </Box>
      <Paper 
        sx={{ 
          width: '60%', 
          marginLeft: 'auto', 
          marginRight: 'auto',
          maxWidth: '800px',
          mt: 2, 
          mb: 2, 
          boxShadow: '0 0px 6px 0 rgb(140 152 164 / 53%)',
          padding: '60px 120px'
        }}
      >
        {error !== '' && (
          <Typography 
            sx={{
              color: '#ff0000',
              marginBottom: '20px'
            }}
          >
            {error}
          </Typography>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {labels.map((itm, idx) => (
            <TextField 
              key={idx}
              className={classes.underMargin}
              name={keys[idx]}
              label={itm} 
              variant="outlined" 
              inputRef={refObjects[idx]}
              onKeyDown={e=>e.keyCode === 13 ? focusOtherInput(idx) : ''}
            />
          ))}
        </Box>
        <Box sx={{textAlign: 'center'}}>
          <Button
            className="active"
            variant={'outlined'}
            onClick={e => createUser()}
          >
            {Lang.btn.create}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateComponent;
