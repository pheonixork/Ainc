import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import { useMainContext } from 'context/MainContext';

const RightSidebar = ({autoClose, children}) => {

  const { isInfluCollapse, setInfluencerCollapsable } = useMainContext();

  return (
    <Drawer
      className='rightside-wrapper'
      anchor="right"
      onClose={e=>{if (autoClose) setInfluencerCollapsable(true);}}
      open={!isInfluCollapse}
      variant="temporary"
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: 400,
          top: 0,
          height: '100%',
          transition: 'all .2s ease-out',
          overflowX: 'hidden'
        },
      }}
    >
      {children}
    </Drawer>
  );
};

RightSidebar.propTypes = {
  autoClose: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default RightSidebar;
