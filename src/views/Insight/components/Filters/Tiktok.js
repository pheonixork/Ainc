/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {FltTextField} from '../../../common/SearchFilters';
import Keyword from 'constants/lang';

const useStyles = makeStyles({
  typodata: {
    marginTop: '1rem'
  },
});

export default function Youtube({...rest}) {
  const classes = useStyles();
  const [clearFlag, setClearFlag] = useState(false);

  const clearFilterClicked = (e) => {
    setClearFlag(!clearFlag);
  }

  return (
    <Box {...rest}>
      <Box className='search-box' >
        <Typography
          variant="body1"
        >
          基本情報
        </Typography>

        <Box 
          sx={{display: 'flex', flexShrink: 0}}>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='登録者数' icon={false} phstr='From' />
          </Box>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='' icon={false} phstr='To' />
          </Box>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='平均再生回数' icon={false} phstr='From' />
          </Box>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='' icon={false} phstr='To' />
          </Box>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='依頼費用' icon={false} phstr='From' />
          </Box>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='' icon={false} phstr='To' />
          </Box>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='ジャンル' icon={false} phstr='Any' />
          </Box>
        </Box>
        <Box sx={{display: 'flex', flexShrink: 0}}>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='プリーワード' icon={false} phstr='Any' />
          </Box>
        </Box>
      </Box>

      <Box className='search-box' >
        <Box 
          sx={{display: 'flex', flexShrink: 0}}>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='EG率' icon={false} phstr='To' />
          </Box>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='シィア率' icon={false} phstr='From' />
          </Box>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='ROAS' icon={false} phstr='To' />
          </Box>
        </Box>
        <Box sx={{display:'flex', justifyContent:'flex-end', marginTop: '15px'}}>
          <Button
            variant={'outlined'}
            onClick={clearFilterClicked}
          >
            {Keyword.caption.clearall}
          </Button>
          <Button
            className="active"
            variant={'outlined'}
            sx={{marginLeft:'15px'}}
          >
            {Keyword.caption.save}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};