/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';

export default function FltTextField({ clearFlag, tip, icon, phstr, ...rest}) {
  const [itemValue, setItemValue] = useState('');
  useEffect(()=>{
    if (clearFlag === true || clearFlag === false)
      setItemValue('');
  }, [clearFlag]);

  return (
    <Box  className='flex-sub-wrapper'>
      <Box className='search-item-wrapper'>
        <Box className='search-item-header' sx={{height: tip ? 'unset' : '21px'}}>
          <span>{tip}</span>
          {icon === true && <RoundInfo marginLeft={1}/>}
        </Box>
        {itemValue !== '' && 
          <span className='clear' onClick={e=>setItemValue('')}>{Keyword.caption.clear}</span>
        }
      </Box>
      <TextField 
        size="small"
        placeholder={phstr}
        {...rest}
        value={itemValue}
        onChange={e=>setItemValue(e.target.value)}
        inputProps={{style:{fontSize:'14px'}}}
      />
    </Box>
  );
};

FltTextField.propTypes = {
  clearFlag: PropTypes.bool,
  tip: PropTypes.string.isRequired,
  phstr: PropTypes.string.isRequired,
  icon: PropTypes.bool.isRequired,
};