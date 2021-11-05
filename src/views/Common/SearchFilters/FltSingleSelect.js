/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';
import {useTheme} from '@mui/material/styles';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250
    },
  },
};

export default function FltSingleSelect({ clearFlag, tip, icon, values, ...rest }) {
  const [itemValue, setItemValue] = useState('');
  const theme = useTheme();
  useEffect(()=>{
    if (clearFlag === true || clearFlag === false)
      setItemValue('');
  }, [clearFlag]);

  return (
    <Box className='flex-sub-wrapper'>
      <Box className='search-item-wrapper'>
        <Box className='search-item-header'>
          <span>{tip}</span>
          {icon === true && <RoundInfo marginLeft={1}/>}
        </Box>
        {itemValue !== '' && 
          <span className='clear' onClick={e=>setItemValue('')}>{Keyword.caption.clear}</span>
        }
      </Box>
      <Select 
        value={itemValue}
        onChange={e=>setItemValue(e.target.value)}
        size="small"
        MenuProps={MenuProps}
        sx={{
          fontSize:'14px',
          '& > .MuiSelect-select': {
            backgroundColor: theme.palette.clrVariables.grayWhite
          },
          '& > svg': {
            backgroundColor: theme.palette.clrVariables.grayWhite
          }
        }}
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

FltSingleSelect.propTypes = {
  clearFlag: PropTypes.bool,
  tip: PropTypes.string.isRequired,
  icon: PropTypes.bool.isRequired,
  values: PropTypes.array.isRequired
};