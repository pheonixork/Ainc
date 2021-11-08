/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import {Accordion, AccordionSummary, AccordionDetails, Box, Button, Typography} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {FltTextField, FltSingleSelect} from '../../../Common/SearchFilters';
import Keyword from 'constants/lang';
import Constants from 'constants/constants';

const useStyles = makeStyles({
  typodata: {
    marginTop: '1rem'
  },
});

export default function Instagram({...rest}) {
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
          style={{fontWeight:600}}
        >
          基本情報
        </Typography>

        <Box 
          sx={{display: 'flex', flexShrink: 0}}>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='フォロワー数' icon={false} phstr='From' />
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
          <Box sx={{minWidth:'200px'}}>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip={'ジャンル'}
              icon={false} 
              values={Constants.campaignTypes}
              />
          </Box>
        </Box>
        <Box sx={{display: 'flex', flexShrink: 0}}>
          <Box>
            <FltTextField clearFlag={clearFlag} tip='フリーワード' icon={false} phstr='Any' />
          </Box>
        </Box>
      </Box>

      <Box className='search-box' >
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="body1">フィード</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box 
              sx={{display: 'flex', flexShrink: 0}}>
              <Box>
                <FltTextField clearFlag={clearFlag} tip='リーチ%' icon={false} phstr='From' />
              </Box>
              <Box>
                <FltTextField clearFlag={clearFlag} tip='保存%' icon={false} phstr='To' />
              </Box>
              <Box>
                <FltTextField clearFlag={clearFlag} tip='EG%' icon={false} phstr='From' />
              </Box>
              <Box>
                <FltTextField clearFlag={clearFlag} tip='ROAS' icon={false} phstr='To' />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2a-content"
            id="pane21a-header"
          >
            <Typography variant="body1">ストーリー</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box 
              sx={{display: 'flex', flexShrink: 0}}>
              <Box>
                <FltTextField clearFlag={clearFlag} tip='インプ%' icon={false} phstr='From' />
              </Box>
              <Box>
                <FltTextField clearFlag={clearFlag} tip='リンククリック%' icon={false} phstr='To' />
              </Box>
              <Box>
                <FltTextField clearFlag={clearFlag} tip='スタンプ%' icon={false} phstr='From' />
              </Box>
              <Box>
                <FltTextField clearFlag={clearFlag} tip='ROAS' icon={false} phstr='To' />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel3a-content"
            id="pane31a-header"
          >
            <Typography variant="body1">リール</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box 
              sx={{display: 'flex', flexShrink: 0}}>
              <Box>
                <FltTextField clearFlag={clearFlag} tip='リーチ%' icon={false} phstr='From' />
              </Box>
              <Box>
                <FltTextField clearFlag={clearFlag} tip='保存%' icon={false} phstr='To' />
              </Box>
              <Box>
                <FltTextField clearFlag={clearFlag} tip='EG%' icon={false} phstr='From' />
              </Box>
              <Box>
                <FltTextField clearFlag={clearFlag} tip='ROAS' icon={false} phstr='To' />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
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
            {Keyword.caption.search}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};