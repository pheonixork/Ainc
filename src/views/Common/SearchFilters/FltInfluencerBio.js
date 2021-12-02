/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useTheme} from '@mui/material/styles';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import {styled} from '@mui/material/styles';
import RoundInfo from 'components/RoundInfo';
import Keyword from 'constants/lang';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(0, 0, 0, 0.8)'
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
}));

export default function FltInfluencerBio({ clearFlag, tip, icon, phstr, caption, setValues, ...rest}) {
  const theme = useTheme();
  const [itemValue, setItemValue] = useState('');
  useEffect(()=>{
    if (clearFlag === true || clearFlag === false)
      SetBio('');
  }, [clearFlag]);

  const SetBio = (val) => {
    setItemValue(val);
    setValues('bio', val);
  }

  return (
    <Box  className='flex-sub-wrapper'>
      <Box className='search-item-wrapper'>
        <Box className='search-item-header' sx={{height: tip ? 'unset' : '21px'}}>
          <span>{tip}</span>
          {icon === true && <RoundInfo caption={caption} marginLeft={1} />}
        </Box>
        {itemValue !== '' && 
          <span className='clear' onClick={e=>SetBio('')} style={{color:theme.palette.clrVariables.cyanLight}}>{Keyword.caption.clear}</span>
        }
      </Box>
      <TextField 
        size="small"
        placeholder={phstr}
        {...rest}
        value={itemValue}
        onChange={e=>SetBio(e.target.value)}
        inputProps={{
          style:{
            fontSize:'14px', 
            backgroundColor:`${itemValue !== '' ? theme.palette.clrVariables.cyanVeryLight : theme.palette.clrVariables.grayWhite}`
          }
        }}
        sx={{
          '& fieldset': {
            borderColor:`${itemValue !== '' ? theme.palette.clrVariables.cyanLight : 'rgba(0,0,0,0.23)'}`
          }
        }}
      />
    </Box>
  );
};
