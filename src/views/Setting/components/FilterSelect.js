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
        登録情報
      </Button>
      <Button
        className={`${curType === 'upgrade' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>onSelect('upgrade')}
      >
        アップグレード
      </Button>
    </Box>
  );
};

FilterSelect.propTypes = {
  curType: PropTypes.string.isRequired,
  onSelect: PropTypes.func
};