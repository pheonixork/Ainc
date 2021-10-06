/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const PostPage = ({...rest}) => {
  return (
    <Box {...rest}>
      <p>Post</p>
    </Box>
  );
};

export default PostPage;
