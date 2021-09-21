/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import {Instagram, Youtube, Tiktok} from './Filters';

const Filter = ({ curType }) => {
  return (
    <Box>
      <Instagram display={`${curType === 'instagram' ? 'block' : 'none'}`} />
      <Youtube display={`${curType === 'youtube' ? 'block' : 'none'}`} />
      <Tiktok display={`${curType === 'tiktok' ? 'block' : 'none'}`} />
    </Box>
  );
};

export default Filter;

Filter.propTypes = {
  curType: PropTypes.string.isRequired,
};