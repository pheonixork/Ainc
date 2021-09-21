/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';

const campaigns = [{id:1, name:'tudfsasd', mem:6},
{id:2, name:'abcdfa', mem:9},
{id:3, name:'wefwef', mem:7},
{id:4, name:'bfsdasd', mem:4},
{id:5, name:'yrtut', mem:3},
{id:6, name:'ouiyoiu', mem:2},
{id:7, name:'3ddfs', mem:1},
{id:8, name:'xzcvxzcv', mem:8},
{id:9, name:'erqwer', mem:11},
{id:10, name:'sadfsadf', mem:18},
{id:11, name:'2342342', mem:21},
{id:12, name:'t454', mem:91},
{id:13, name:'xbvcbvcb', mem:12},
{id:14, name:'gfhf', mem:4},
{id:15, name:'mnbm', mem:1}];

export default function SaveDlg({closeDlg}) {
  return (
    <section className="saveDlg">
      <Box className="up-triangle"></Box>
      <Box>
        <Typography variant="h6">キャンペンリストに保存する</Typography>
        <CloseIcon fontSize="small" className="closeIcon" onClick={e=>closeDlg()}/>
      </Box>
      <ul className="contents">
        {_.map(campaigns, itm => (
          <li key={itm.id}>
            {`${itm.name} (${itm.mem})`}
            <Checkbox
              color="success"
              sx={{ '& .MuiSvgIcon-root': { fontSize: 24 }}}
            />
          </li>
        ))}
      </ul>
      <Box className="add-to-list">
        <Button className="create-list">
          <svg fill="none" height="32" width="32" xmlns="http://www.w3.org/2000/svg" className="create-list-plus">
            <path fill="#114B5F" d="M16 2.67a13.34 13.34 0 1 0 .01 26.67A13.34 13.34 0 0 0 16 2.67zm5.33 14.66h-4v4c0 .74-.6 1.34-1.33 1.34-.73 0-1.33-.6-1.33-1.34v-4h-4c-.74 0-1.34-.6-1.34-1.33 0-.73.6-1.33 1.34-1.33h4v-4c0-.74.6-1.34 1.33-1.34.73 0 1.33.6 1.33 1.34v4h4c.74 0 1.34.6 1.34 1.33 0 .73-.6 1.33-1.34 1.33z"></path>
          </svg>
          <span>新しいキャンペン作成
          </span>
        </Button>
      </Box>
    </section>
  );
};

SaveDlg.propTypes = {
  closeDlg: PropTypes.func,
};