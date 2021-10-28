import React, {useState} from 'react';
import Box from '@mui/material/Box';
import {Button, Rating, TableCell, TableRow} from '@mui/material';
import StatusSelect from '../StatusSelect';
import {useMainContext} from 'context/MainContext';
import RelativeImage from 'components/RelativeImage';
import Lang from 'constants/lang';
import {CP} from 'views/Common/CP';

const statusValues = [
  '社内確認中',
  'インフルエンサー交渉中',
  'NG',
  'OK'
];

export default function ListPageTableRow({row, index, handleSaveMember}) {
  const [selAccountId, setAccountId] = useState('');

  const {setInfluencerCollapsable, setInfluencerIndex} = useMainContext();
  const handleSelectChanged = (index) => {
    setInfluencerCollapsable(false);
    setInfluencerIndex(index);
  };

  let status = 1;
  const changeStutus = (val) => {
    status = val;
  }

  return (
    <>
      <TableRow
        hover
        onClick={() => handleSelectChanged(index)}
        tabIndex={-1}
        key={index}
      >
        <TableCell align="center" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <RelativeImage
            isRound
            imgSrc={'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D'}
            sx={{width: '3.125rem !important', height: '3.125rem !important', margin: '.5rem'}}
          />
          <Rating value={row.star} readOnly />
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.followers}</TableCell>
        <TableCell align="left">{row.engage}</TableCell>
        <TableCell align="center">
          <StatusSelect 
            initValue={row.status}
            values={statusValues}
            updateStatus={changeStutus}
            style={{ width: '150px', marginLeft: 'auto' }}
            onClick={(e) => {e.stopPropagation()}}
          />
        </TableCell>
        <TableCell align="center">
          <Box sx={{display:'flex', justifyContent:'space-around'}}>
            <Button
              variant={'outlined'}
              style={{ padding: '0 20px' }}
              onClick={(e) => {e.stopPropagation(), setAccountId(row.accountId);}}
            >
              CP
            </Button>
            <Button
              variant={'outlined'}
              style={{ padding: '0 20px' }}
              onClick={(e) => {e.stopPropagation(), handleSaveMember(index, status);}}
            >
              {Lang.btn.save}
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      <CP accountId={selAccountId} setCollapse={setAccountId}/>
    </>
  );
}