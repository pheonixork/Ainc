/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
          {icon === true &&
          <Box marginLeft={1} className='search-item-icon'>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" className="tooltip-comp_icon_37Hup">
              <circle cx="8" cy="8" r="8" className="circle"></circle>
              <path d="M7.2 11.2c0 .44.36.8.8.8a.8.8 0 0 0 .8-.8V8a.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8v3.2zM8.8 4H7.2v1.6h1.6V4z" className="i"></path>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM8 1.6a6.4 6.4 0 1 1 0 12.8A6.4 6.4 0 0 1 8 1.6z" className="outline"></path>
            </svg>
          </Box>
          }
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