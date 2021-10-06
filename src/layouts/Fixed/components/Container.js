import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const Container = ({ children, ...rest }) => (
  <Box
    maxWidth={{ sm: 720, md: 'calc(100vw - 50px)' }}
    width={1}
    paddingRight={2}
    paddingLeft={3}
    paddingBottom={{ xs: 2, sm: 4, md: 6 }}
    paddingTop={{ xs: 1, sm: 2, md: 4 }}
    {...rest}
  >
    {children}
  </Box>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
