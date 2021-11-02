import React, {useState, useRef, useEffect} from 'react';
import { TextField, Rating, TableCell, TableRow, Button } from '@mui/material';
import {useMainContext} from 'context/MainContext';
import StatusSelect from '../StatusSelect';
import RelativeImage from 'components/RelativeImage';
import Lang from 'constants/lang';

const statusValues = [
  '中止',
  '商品発送済み',
  '下書き待ち',
  '本投稿待ち',
  'インサイト待ち',
  '終了'
]

export default function PostPageTableRow({data, index, handleSaveMember}) {
  const {setInfluencerCollapsable, setInfluencerIndex} = useMainContext();
  const handleSelectChanged = (index) => {
    setInfluencerCollapsable(false);
    setInfluencerIndex(index);
  };

  const amountRef = useRef();
  let pstatus = 1;
  const changeStatus = (val) => {
    pstatus = val;
  }

  useEffect(() => {
    if (!data || !data.pstatus)
      return;

    pstatus = data.pstatus;
  }, [data]);

  return (
    <TableRow
      hover
      onClick={() => handleSelectChanged(index)}
      tabIndex={-1}
    >
      <TableCell align="center" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <RelativeImage
          isRound
          imgSrc={'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D'}
          sx={{width: '3.125rem !important', height: '3.125rem !important', margin: '.5rem'}}
        />
        <Rating value={data.star} readOnly />
      </TableCell>
      <TableCell align="left">{data.name}</TableCell>
      <TableCell align="left">{data.followers}</TableCell>
      <TableCell align="left">{data.engage}</TableCell>
      <TableCell align="center">
        <TextField
          defaultValue={data.amount}
          variant="outlined"
          size="small"
          placeholder="金額"
          sx={{width: '100px', fontSize: '14px', padding: '8px'}}
          InputProps={{
            classes: {input: 'customPlaceholder'}, 
            style: {color: '#000'} 
          }}
          onClick={(e) => {e.stopPropagation()}}
          inputRef={amountRef}
        />
      </TableCell>
      <TableCell align="center">
        <StatusSelect 
          initValue={data.pstatus}
          values={statusValues}
          updateStatus={changeStatus}
          style={{ width: '150px', marginLeft: 'auto' }}
          onClick={(e) => {e.stopPropagation()}}
        />
      </TableCell>
      <TableCell align="center">
        <Button
          variant={'outlined'}
          style={{padding: '0 20px', width: '70px'}}
          onClick={(e) => {e.stopPropagation(), handleSaveMember(index, pstatus, amountRef.current.value)}}
        >
          {Lang.btn.save}
        </Button>
      </TableCell>
    </TableRow>
  );
}