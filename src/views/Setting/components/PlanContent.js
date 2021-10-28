/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import PropTypes from 'prop-types'
import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import {useMainContext} from 'context/MainContext';
import {Plan, Bill, Upgrade} from './Contents';

const PlanContent = ({user, selType}) => {
  const {setLoginUser} = useMainContext();

  useEffect(() => {
    setLoginUser(user);
  }, [user]);

  return (
    <Box>
      <Plan display={`${selType === 'plan' ? 'block' : 'none'}`} />
      <Bill display={`${selType === 'bill' ? 'block' : 'none'}`} />
      <Upgrade display={`${selType === 'upgrade' ? 'block' : 'none'}`} />
    </Box>
  );
};

PlanContent.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
  }),
  selType: PropTypes.string
}

export default PlanContent;
