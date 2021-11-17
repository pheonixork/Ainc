import React, {useState, useRef, useEffect} from 'react';
import {Box, TextField, Rating, TableCell, TableRow, Button } from '@mui/material';
import {useMainContext} from 'context/MainContext';
import StatusSelect from '../StatusSelect';
import {SaveDlg} from 'views/Common';
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

export default function PostPageTableRow({data, catType, index, handleSaveAmount, handleSaveMember}) {
  const [showDlg, setShow] = useState(false);
  const closeDlg = () => {
    setShow(false);
  }

  const {setInfluencerCollapsable, setInfluencerIndex, influSelectedIndex} = useMainContext();
  const handleSelectChanged = (index) => {
    setInfluencerCollapsable(false);
    setInfluencerIndex(index);
  };

  const changeStatus = (val) => {
    handleSaveMember(index, val)
  }

  const blurAmount = () => {
    handleSaveAmount(index, amountRef.current.value);
  }

  const amountRef = useRef();

  return (
    <TableRow
      className={`${influSelectedIndex === index ? 'influencer-detail-active' : ''}`}
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
          onBlur={(e) => blurAmount()}
          inputRef={amountRef}
        />
      </TableCell>
      <TableCell align="center">
        <StatusSelect 
          initValue={data.pstatus}
          values={statusValues}
          step={2}
          row={data}
          updateStatus={changeStatus}
          style={{ width: '150px', marginLeft: 'auto' }}
          onClick={(e) => {e.stopPropagation()}}
        />
      </TableCell>
      <TableCell align="center">
        <Box className="relative-action">
          <Button
            variant={'outlined'}
            style={{ padding: '0 20px' }}
            onClick={(e) => {e.stopPropagation(), setShow(true)}}
          >
            {Lang.btn.save}
          </Button>
          {showDlg === true && 
            <SaveDlg 
              infId={data.infId}
              catType={catType}
              closeDlg={closeDlg} 
            />
          }
        </Box>
      </TableCell>
    </TableRow>
  );
}