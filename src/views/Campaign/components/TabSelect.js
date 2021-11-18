/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useMainContext} from 'context/MainContext';

export default function TabSelect({ curType, onSelect} ) {
  const {setInfluencerCollapsable, setInfluencerId, influSelectedId} = useMainContext();
  const tabChanged = (val) => {
    if (curType === val)
      return;

    setInfluencerCollapsable(true);
    setInfluencerId('');

    onSelect(val);
  };

  return (
    <Box>
      <Button
        className={`${curType === 'list' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>tabChanged('list')}
      >
        リストアップ
      </Button>
      <Button
        className={`${curType === 'post' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>tabChanged('post')}
      >
        投稿
      </Button>
      <Button
        className={`${curType === 'report' ? 'active' : 'inactive' }`}
        variant={'outlined'}
        size='medium'
        onClick={e=>tabChanged('report')}
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