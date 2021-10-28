/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Typography } from '@mui/material';

export default function SaveDlg({saveItem, closeDlg, campaigns}) {

  const [chkStatus, changeStatus] = useState({});

  useEffect(() => {
    _.map(campaigns, itm => {
      _.set(chkStatus, itm.id, false);
    });
    
    changeStatus({...chkStatus});
  }, [campaigns]);

  const handleChange = (id, status) => {
    _.set(chkStatus, id, status);
    changeStatus({...chkStatus});
  }

  return (
    <section className="saveDlg"
      onClick={e=>e.stopPropagation()}
      >
      <Box className="up-triangle"></Box>
      <Box className="saveDlgToolbar">
        <Typography variant="h6">キャンペンリストに保存する</Typography>
        <Box className="saveDlgButtons">
          <SaveIcon fontSize="medium" className="closeIcon" onClick={e=>saveItem(chkStatus)} />
          <CloseIcon fontSize="medium" className="closeIcon" onClick={e=>closeDlg()} />
        </Box>
      </Box>
      <ul className="contents">
        {_.map(campaigns, itm => (
          <li key={itm.id}>
            {`${itm.name} (${itm.mems})`}
            <Checkbox
              checked={chkStatus[itm.id]}
              onChange={e=>handleChange(itm.id, e.target.checked)}
              color="success"
              sx={{ '& .MuiSvgIcon-root': { fontSize: 24 }}}
            />
          </li>
        ))}
      </ul>
      <Box className="add-to-list">
        <NextLink href={'/campaign/new'} passHref>
          <Button className="create-list">
            <svg fill="none" height="32" width="32" xmlns="http://www.w3.org/2000/svg" className="create-list-plus">
              <path fill="#114B5F" d="M16 2.67a13.34 13.34 0 1 0 .01 26.67A13.34 13.34 0 0 0 16 2.67zm5.33 14.66h-4v4c0 .74-.6 1.34-1.33 1.34-.73 0-1.33-.6-1.33-1.34v-4h-4c-.74 0-1.34-.6-1.34-1.33 0-.73.6-1.33 1.34-1.33h4v-4c0-.74.6-1.34 1.33-1.34.73 0 1.33.6 1.33 1.34v4h4c.74 0 1.34.6 1.34 1.33 0 .73-.6 1.33-1.34 1.33z"></path>
            </svg>
            <span>新しいキャンペン作成</span>
          </Button>
        </NextLink>
      </Box>
    </section>
  );
};

SaveDlg.propTypes = {
  saveItem: PropTypes.func,
  closeDlg: PropTypes.func,
  campaigns: PropTypes.array
};