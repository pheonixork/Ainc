import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {TextField} from '@mui/material';

const SettingInput = ({classes, initVal, type, field, updateStores}) => {
  const [data, setData] = useState(0);

  useEffect(() => {
    if (isNaN(parseInt(initVal)))
      setData(0);
    else
      setData(parseInt(initVal));
  }, [initVal]);

  const handleChange = (e) => {
    updateStores(type, field, e.target.value);
    setData(e.target.value);
  }

  return (
    <TextField
      variant="standard"
      className={classes.settingInput}
      type="number"
      value={data}
      onChange={handleChange}
      inputProps={{style:{fontSize:'14px'}}}
    />
  );
};

export default SettingInput;
