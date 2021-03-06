/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import {userService} from 'services';
import Constants from 'constants/constants';
const {publicRuntimeConfig} = getConfig();
import LogoImage from 'components/LogoImage';

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
});

const Form = () => {
  const router = useRouter();
  const [errors, setError] = useState({message:''});

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    return userService.login(values.email, values.password)
      .then((user) => {
          // get return url from query parameters or default to '/'
          // const returnUrl = router.query.returnUrl || publicRuntimeConfig.managerUrl;
          let returnUrl = `${publicRuntimeConfig.managerUrl}`; //?id=${user.id}`;
          if (user.role === Constants.roleInfo.admin)
            returnUrl = `${publicRuntimeConfig.adminUrl}`;

          router.push(returnUrl);
      })
      .catch(error => {
          setError({ message: error.toString() });
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Box>
      <Box marginBottom={4} marginTop={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          ????????????
        </Typography>
      </Box>
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column', md: 'row' }}
        position={'relative'}
      >
        <Box
          width={1}
          display={'flex'}
          alignItems={'flex-start'}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={10}>
                <TextField
                  placeholder="?????????????????????"
                  variant="outlined"
                  name={'email'}
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  placeholder="???????????????"
                  variant="outlined"
                  name={'password'}
                  type={'password'}
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Typography 
                  variant={'subtitle2'}
                  style={{textAlign: 'right', fontSize: '16px', marginTop: '.5rem', fontWeight: 600}}
                >
                  <Link
                    component={'a'}
                    color={'primary'}
                    href={'/password-reset-cover'}
                    underline={'none'}
                  >
                    ??????????????????????????????
                  </Link>
                </Typography>
              </Grid>
              {errors.message && 
              <Grid item xs={10}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  {errors.message}
                </Typography>
              </Grid>
              }
              <Grid item container xs={10} sx={{display: 'flex', justifyContent:'center'}}>
                <Button 
                  sx={{
                    backgroundColor: 'black',
                    height: '60px',
                    borderRadius: '30px !important',
                    marginRight: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '20px !important',
                    width: '90%',
                    '&:hover': {
                      backgroundColor: 'black !important'
                    }
                  }}
                  type={'submit'}
                >
                  ????????????
                  <ArrowCircleDownIcon fontSize="large" style={{marginLeft: '2rem', transform: 'rotate(-90deg)'}} />
                </Button>
              </Grid>
              <Grid item container xs={10} 
                style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Typography variant={'subtitle2'}>
                  <Link
                    component={'a'}
                    color={'primary'}
                    href={'/signup-cover'}
                    underline={'none'}
                    style={{fontWeight: 600, display: 'flex', textAlign: 'center'}}
                  >
                    ?????????????????????????????????????????????<br/>
                    ????????????????????????
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box
          width={1}
          marginTop={-7}
          sx={{display: 'flex', justifyContent: 'center'}}
        >
          <Box
            sx={{height: 450}}
          >
            <LogoImage
              sx={{height:'400px !important'}}
              imgSrc={'/images/logo/logo_back.svg'}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
