/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import { ListPage, PostPage, ReportPage } from './Pages';

const Tabs = ({ curType }) => {

  console.log(curType);
  return (
    <Box>
      <ListPage display={`${curType === 'list' ? 'block' : 'none'}`} />
      <PostPage display={`${curType === 'post' ? 'block' : 'none'}`} />
      <ReportPage display={`${curType === 'report' ? 'block' : 'none'}`} />
    </Box>
  );
};

export default Tabs;

Tabs.propTypes = {
  curType: PropTypes.string.isRequired,
};