import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

const useStyles = makeStyles({
  audiencelikes: {
    marginTop: '2rem'
  },

  fontsize12: {
    fontSize: '12px'
  },

  listitem: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '.25rem',
    paddingBottom: '.25rem',
    fontSize: '.9rem'
  },

  listheader: {
    color: '#757575',
    borderBottom: '.5px solid #bdbdbd'
  }
});

const HashTag = () => {
  const classes = useStyles();

  return (
    <Box className={classes.audiencelikes}>
      <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
        <span style={{fontWeight:'600', marginLeft: '.5rem'}}>人気ハッシュタグ</span>
      </Box>
      <Box className={clsx(classes.listitem, classes.listheader)}>
        <span>Hashtag</span>
        <span>Percent</span>
      </Box>
      <Box className={classes.listitem}>
        <span className='subtitle1'>#finoallafine</span>
        <span className='subtitle1'>17.33%</span>
      </Box>
    </Box>
  );
};

export default HashTag;