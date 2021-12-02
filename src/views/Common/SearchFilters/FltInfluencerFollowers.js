/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';
import {useTheme} from '@mui/material/styles';

export default function FltInfluencerFollowers({ clearFlag, tip, icon, fromValues, fromStyle, toValues, toStyle, setValues}) {
  const [itemValue, setItemValue] = useState({from:'', to:''});
  const theme = useTheme();

  useEffect(()=>{
    if (clearFlag === true || clearFlag === false)
      setFollowers({from:'', to:''});
  }, [clearFlag]);

  const setFollowers = ({from, to}) => {
    setItemValue({from: from, to: to});
    if (from === '' && to === '')
      setValues('followers', {});
    else
      setValues('followers', {min: from === '' ? null : from, max: to === '' ? null : to});
  }

  return (
    <Box className='flex-sub-wrapper' >
      <Box className='search-item-wrapper'>
        <Box className='search-item-header'>
          <span>{tip}</span>
          {icon === true && <RoundInfo marginLeft={1}/>}
        </Box>
        {(itemValue.from !== '' || itemValue.to !== '') && 
          <span className='clear' onClick={e=>setFollowers({from:'', to:''})}>{Keyword.caption.clear}</span>
        }
      </Box>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Select 
          size="small"
          sx={{
            fontSize:'14px',
            '& > .MuiSelect-select': {
              backgroundColor: `${itemValue.from !== '' ? theme.palette.clrVariables.cyanVeryLight : theme.palette.clrVariables.grayWhite}`
            },
            '& > svg': {
              backgroundColor: 'inherit'
            },
            '& fieldset': {
              borderColor:`${itemValue.from !== '' ? theme.palette.clrVariables.cyanLight : 'rgba(0,0,0,0.23)'}`
            }
          }}
          style={fromStyle}
          value={itemValue.from}
          onChange={e=>setFollowers({...itemValue, from:e.target.value})}
        >
          {_.map(fromValues, flwItm => (
            <MenuItem key={flwItm} value={flwItm} style={{fontSize:'14px'}}>{flwItm}</MenuItem>
          ))}
        </Select>

        <Select 
          size="small"
          sx={{
            fontSize:'14px',
            '& > .MuiSelect-select': {
              backgroundColor: `${itemValue.to !== '' ? theme.palette.clrVariables.cyanVeryLight : theme.palette.clrVariables.grayWhite}`
            },
            '& > svg': {
              backgroundColor: 'inherit'
            },
            '& fieldset': {
              borderColor:`${itemValue.to !== '' ? theme.palette.clrVariables.cyanLight : 'rgba(0,0,0,0.23)'}`
            }
          }}
          style={toStyle}
          value={itemValue.to}
          onChange={e=>setFollowers({...itemValue, to:e.target.value})}
        >
          {_.map(toValues, flwItm => (
            <MenuItem key={flwItm} value={flwItm} style={{fontSize:'14px'}}>{flwItm}</MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};
