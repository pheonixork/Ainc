/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250
    },
  },
};

export default function FltMultiSelect({ clearFlag, tip, icon, values, ...rest }) {
  const [itemValue, setItemValue] = useState([]);

  useEffect(()=>{
    if (clearFlag === true || clearFlag === false)
      setItemValue([]);
  }, [clearFlag]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setItemValue(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box className='flex-sub-wrapper'>
      <Box className='search-item-wrapper'>
        <Box className='search-item-header'>
          <span>{tip}</span>
          {icon === true && <RoundInfo marginLeft={1}/>}
        </Box>
        {itemValue.length > 0 && 
          <span className='clear' onClick={e=>setItemValue([])}>{Keyword.caption.clear}</span>
        }
      </Box>
      <Select 
        multiple
        value={itemValue}
        onChange={handleChange}
        size="small"
        MenuProps={MenuProps}
        sx={{fontSize:'14px'}}
        {...rest}
      >
        {_.map(values, itm=> (
          <MenuItem
            key={itm}
            value={itm}
            sx={{fontSize:'14px'}}
          >
            {itm}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

FltMultiSelect.propTypes = {
  clearFlag: PropTypes.bool,
  tip: PropTypes.string.isRequired,
  icon: PropTypes.bool.isRequired,
  values: PropTypes.array.isRequired
};