/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ReportTabSelect({ curType, onSelect} ) {
  return (
    <Box>
      <Button
        className={`${curType === 'feed' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>onSelect('feed')}
      >
        フィード
      </Button>
      <Button
        className={`${curType === 'story' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>onSelect('story')}
      >
        ストーリー
      </Button>
      <Button
        className={`${curType === 'rir' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>onSelect('rir')}
      >
        リール
      </Button>
    </Box>
  );
};

ReportTabSelect.propTypes = {
  curType: PropTypes.string.isRequired,
  onSelect: PropTypes.func
};