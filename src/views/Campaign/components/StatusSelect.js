/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250
    },
  },
};

export default function StatusSelect({initValue, values, updateStatus, ...rest}) {
  const [itemValue, setItemValue] = useState(initValue);
  const handleStatusChange = (val) => {
    setItemValue(val);
    updateStatus(val);
  }

  return (
    <Box>
      <Select 
        value={itemValue}
        onChange={e=>handleStatusChange(e.target.value)}
        size="small"
        MenuProps={MenuProps}
        sx={{fontSize:'14px'}}
        {...rest}
      >
        {_.map(values, (itm, idx) => (
          <MenuItem
            key={itm}
            value={idx + 1}
            sx={{fontSize:'14px'}}
          >
            {itm}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

StatusSelect.propTypes = {
  initValue: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  updateStatus: PropTypes.func
};