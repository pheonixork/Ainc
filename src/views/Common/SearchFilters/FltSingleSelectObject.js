/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Box, Select, MenuItem, Button} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
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

export default function FltSingleSelectObject({ clearFlag, tip, icon, values, caption, itmKey, itmValue, ...rest }) {
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
          {icon === true && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {itemValue !== '' && 
          <span className='clear' onClick={e=>setItemValue('')} style={{color:theme.palette.clrVariables.cyanLight}}>{Keyword.caption.clear}</span>
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
            backgroundColor: `${itemValue !== '' ? theme.palette.clrVariables.cyanVeryLight : theme.palette.clrVariables.grayWhite}`
          },
          '& > svg': {
            backgroundColor: 'inherit'
          },
          '& fieldset': {
            borderColor:`${itemValue !== '' ? theme.palette.clrVariables.cyanLight : 'rgba(0,0,0,0.23)'}`
          }
        }}
        {...rest}
      >
        {_.map(values, itm=> (
          <MenuItem
            key={_.get(itm, itmKey)}
            value={_.get(itm, itmKey)}
            sx={{fontSize:'14px'}}
          >
            {_.get(itm, itmValue)}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
