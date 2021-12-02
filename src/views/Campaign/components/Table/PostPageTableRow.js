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
  const formatterInt = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0});
  const [anchorEl, setAnchorEl] = useState(null);
  const closeDlg = () => {
    setAnchorEl(null);
  }

  const {setInfluencerCollapsable, setSelectedInfluencer, selectedInfluencer} = useMainContext();
  const handleSelectChanged = (index) => {
    setInfluencerCollapsable(false);
    setSelectedInfluencer({id:data.infId, username:data.infName, type:data.type});
  };

  const changeStatus = (val) => {
    handleSaveMember(index, val)
  }

  const blurAmount = () => {
    handleSaveAmount(index, amountRef.current.value);
  }

  const amountRef = useRef();

  return (
    <>
      <TableRow
        className={`${selectedInfluencer === index ? 'influencer-detail-active' : ''}`}
        hover
        onClick={() => handleSelectChanged(index)}
        tabIndex={-1}
      >
        <TableCell align="center" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <RelativeImage
            isRound
            imgSrc={data.avatar}
            sx={{width: '3.125rem !important', height: '3.125rem !important', margin: '.5rem'}}
          />
          <Rating value={data.star} readOnly />
        </TableCell>
        <TableCell align="left">{data.name}</TableCell>
        <TableCell align="left">{formatterInt.format(data.followers)}</TableCell>
        <TableCell align="left">{formatterInt.format(data.engage)}</TableCell>
        <TableCell align="center">
          <TextField
            defaultValue={data.amount}
            variant="outlined"
            size="small"
            placeholder="金額"
            sx={{width: '140px', fontSize: '14px', padding: '8px'}}
            type="number"
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
              onClick={(e) => {e.stopPropagation(), setAnchorEl(e.currentTarget)}}
            >
              {Lang.btn.register}
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      <SaveDlg 
        anchorEl={anchorEl}
        closeDlg={closeDlg} 
        infId={data.infId}
        catType={catType}
      />
    </>
  );
}