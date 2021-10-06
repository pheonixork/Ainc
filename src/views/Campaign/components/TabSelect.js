/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function TabSelect({ curType, onSelect} ) {
  return (
    <Box>
      <Button
        className={`${curType === 'list' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>onSelect('list')}
      >
        リストアップ
      </Button>
      <Button
        className={`${curType === 'post' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>onSelect('post')}
      >
        投稿
      </Button>
      <Button
        className={`${curType === 'report' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>onSelect('report')}
      >
        レポート
      </Button>
    </Box>
  );
};

TabSelect.propTypes = {
  curType: PropTypes.string.isRequired,
  onSelect: PropTypes.func
};