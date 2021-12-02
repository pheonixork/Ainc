/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import {styled} from '@mui/material/styles';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';
import Constants from 'constants/constants';
import {useTheme} from '@mui/material/styles';
import {modashService} from 'services';

const weights = Array.from({length: 19}, (_, i) => {
  return {value: (i + 1) * 0.05, text: `≥${(i + 1)*5}%`}
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250
    },
  },
};

export default function FltAudienceLocation({ clearFlag, tip, icon, phstr, caption, setValues }) {
  const [itemValue, setItemValue] = useState({title:'', id:''});
  const [filterValue, setFilterValue] = useState({title:'', id: '', weight: 0});
  const theme = useTheme();

  useEffect(()=>{
    if (clearFlag === true || clearFlag === false)
      setSelectedLocation({title:'', id:''});
  }, [clearFlag]);

  const setSelectedLocation = (val) => {
    setItemValue(val);
    setFilterValue({...val, weight: 0.05 * 6});
    if (val.id !== '') 
      setValues('location', [val.id]);
    else
      setValues('location', []);
  }

  const changeWeightValues = (value) => {
    setFilterValue({...filterValue, weight: value});
  }

  const removeFilter = () => {
    setSelectedLocation({title:'', id:''});
  }

  const [options, setOptions] = useState([]);

  return (
    <Box className='flex-sub-wrapper'>
      <Box className='search-item-wrapper'>
        <Box className='search-item-header'>
          <span>{tip}</span>
          {icon === true && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {itemValue && itemValue.title !== '' && 
          <span className='clear' onClick={e=>setSelectedLocation({title:'', id:''})} style={{color:theme.palette.clrVariables.cyanLight}}>{Keyword.caption.clear}</span>
        }
      </Box>
      <Autocomplete
        size="small"
        options={options}
        disableClearable
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => (
          <li {...props}
            style={{display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '14px',
              padding: '0px 5px 0px 5px'}}
            >
            {option.title}
            <Checkbox
              checked={selected}
              color="success"
              sx={{ '& .MuiSvgIcon-root': { fontSize: 26 }}}
            />
          </li>
        )}
        value={itemValue}
        filterOptions={(options, state) => options}
        onChange={(event, newValue) => {
          setSelectedLocation(newValue);
        }}
        sx={{
          backgroundColor:`${(itemValue && itemValue.title !== '') ? theme.palette.clrVariables.cyanVeryLight : theme.palette.clrVariables.grayWhite}`
        }}
        renderInput={(params) => (
          <TextField 
            {...params} 
            sx={{
              '& fieldset': {
                borderColor:`${(itemValue && itemValue.title !== '') ? theme.palette.clrVariables.cyanLight : 'rgba(0,0,0,0.23)'}`
              }
            }}
            variant="outlined"
            placeholder={phstr}
            onChange={async (e) => {
              return modashService.getLocations(Constants.snsInstagram, e.target.value)
                .then((response) => {
                  let data = response.data;
                  if (data.error !== false) 
                    return;

                  setOptions(data.locations);
                });
            }}
            inputProps={{
              ...params.inputProps,
              style: {
                fontSize:'14px',
              },
            }}
          />
        )}
      />
      {filterValue.title !== '' && 
        <Box 
          sx={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '.3rem',
            marginBottom: '.3rem'
          }}
        >
          <img 
            src={'/images/svgs/smallclose.svg'} 
            style={{width: '6px', height: '6px', cursor: 'pointer'}}
            onClick={e=>removeFilter()}
          />
          <span 
            className="text-ellipse"
            style={{
              flex: 'auto',
              marginLeft: '.5rem',
              minWidth: '120px',
            }}
          >
            {filterValue.title}
          </span>
          <Select
            size="small"
            value={filterValue.weight}
            MenuProps={MenuProps}
            onChange={e=>changeWeightValues(e.target.value)}
            sx={{
              fontSize:'14px',
              '& > .MuiSelect-select': {
                backgroundColor: `${theme.palette.clrVariables.cyanVeryLight}`
              },
              '& > svg': {
                backgroundColor: 'inherit'
              },
              '& fieldset': {
                borderColor:`${theme.palette.clrVariables.cyanLight}`
              },
              width: '6rem'
            }}
          >
            {_.map(weights, weight=> (
              <MenuItem
                key={weight.value}
                value={weight.value}
                sx={{fontSize:'14px'}}
              >
                {weight.text}
              </MenuItem>
            ))}
          </Select>
        </Box>
      }
    </Box>
  );
};
