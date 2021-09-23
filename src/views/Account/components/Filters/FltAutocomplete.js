/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RoundInfo from 'components/RoundInfo';

export default function FltAutocomplete({ clearFlag, tip, icon, values, phstr }) {
  const [itemValue, setItemValue] = useState({title:'', year:''});

  useEffect(()=>{
    if (clearFlag === true || clearFlag === false)
      setItemValue({title:'', year:''});
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
        {itemValue && itemValue.title !== '' && 
          <Button onClick={e=>setItemValue({title:'', year:''})}>Clear</Button>
        }
      </Box>
      <Autocomplete
        size="small"
        options={values}
        disableClearable
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => (
          <li {...props}
            style={{display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '14px',
              padding: '0px'}}
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
        onChange={(event, newValue) => {
          setItemValue(newValue);
        }}
        // inputValue={itemValue}
        // onInputChange={(event, newInputValue) => {
        //   setItemValue(newInputValue);
        // }}
        renderInput={(params) => (
          <TextField 
            {...params} 
            variant="outlined"
            placeholder={phstr}
            inputProps={{
              ...params.inputProps,
              style: {fontSize:'14px'},
            }}
          />
        )}
      />
    </Box>
  );
};

FltAutocomplete.propTypes = {
  clearFlag: PropTypes.bool,
  tip: PropTypes.string.isRequired,
  phstr: PropTypes.string.isRequired,
  icon: PropTypes.bool.isRequired,
  values: PropTypes.array.isRequired
};