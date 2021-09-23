/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RoundInfo from 'components/RoundInfo';

export default function FltTextField({ clearFlag, tip, icon, phstr, ...rest}) {
  const [itemValue, setItemValue] = useState('');
  useEffect(()=>{
    if (clearFlag === true || clearFlag === false)
      setItemValue('');
  }, [clearFlag]);

  return (
    <Box
      sx={{display: 'flex', 
          flexDirection: 'column',
          marginLeft: '10px',
          marginTop: '15px'}}
    >
      <Box className='search-item-wrapper'>
        <Box className='search-item-header'>
          <span>{tip}</span>
          {icon === true && <RoundInfo marginLeft={1}/>}
        </Box>
        {itemValue !== '' && 
          <Button onClick={e=>setItemValue('')}>Clear</Button>
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