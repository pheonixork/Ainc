/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function FilterSelect({ curType, onSelect} ) {
  return (
    <Box>
      <Button
        className={`${curType === 'plan' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>onSelect('plan')}
      >
        利用プラン
      </Button>
      <Button
        className={`${curType === 'bill' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>onSelect('bill')}
      >
        決済
      </Button>
      <Button
        className={`${curType === 'upgrade' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>onSelect('upgrade')}
      >
        更新
      </Button>
    </Box>
  );
};

FilterSelect.propTypes = {
  curType: PropTypes.string.isRequired,
  onSelect: PropTypes.func
};