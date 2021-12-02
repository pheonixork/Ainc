import React, {useState} from 'react';
import Box from '@mui/material/Box';
import {Button, Rating, TableCell, TableRow} from '@mui/material';
import StatusSelect from '../StatusSelect';
import {useMainContext} from 'context/MainContext';
import RelativeImage from 'components/RelativeImage';
import {SaveDlg} from 'views/Common';
import Lang from 'constants/lang';
import {CP} from 'views/Common/CP';

const statusValues = [
  '社内確認中',
  '交渉中',
  'NG',
  'OK'
];

export default function ListPageTableRow({row, index, catType, handleSaveMember}) {
  const formatterInt = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0});
  
  const [anchorEl, setAnchorEl] = useState(null);
  const closeDlg = () => {
    setAnchorEl(null);
  }

  const [selAccountId, setAccountId] = useState('');
  const closeCP = (val) => {
    setData({...data, star:val});
    setAccountId('');
  }

  const [data, setData] = useState(row);

  const {setInfluencerCollapsable, setSelectedInfluencer, selectedInfluencer} = useMainContext();
  const handleSelectChanged = (e) => {
    setInfluencerCollapsable(false); 
    setSelectedInfluencer({id:row.infId, username:row.infName, type:row.type});
  };

  const changeStutus = (val) => {
    handleSaveMember(index, val);
  }

  return (
    <>
      <TableRow
        className={`${selectedInfluencer && selectedInfluencer.id === row.infId ? 'influencer-detail-active' : ''}`}
        hover
        onClick={handleSelectChanged}
        tabIndex={-1}
        key={index}
      >
        <TableCell align="center" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <RelativeImage
            isRound
            imgSrc={row.avatar}
            sx={{width: '3.125rem !important', height: '3.125rem !important', margin: '.5rem'}}
          />
          <Rating value={data.star} readOnly />
        </TableCell>
        <TableCell align="left">{data.name}</TableCell>
        <TableCell align="left">{formatterInt.format(data.followers)}</TableCell>
        <TableCell align="left">{formatterInt.format(data.engage)}</TableCell>
        <TableCell align="center">
          <StatusSelect 
            initValue={data.status}
            values={statusValues}
            step={1}
            row={data}
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
              onClick={(e) => {e.stopPropagation(), setAccountId(data.accountId);}}
            >
              CP
            </Button>
            <Box className="relative-action">
              <Button
                variant={'outlined'}
                style={{ padding: '0 20px' }}
                onClick={(e) => {e.stopPropagation(), setAnchorEl(e.currentTarget)}}
              >
                {Lang.btn.register}
              </Button>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
      <SaveDlg 
        anchorEl={anchorEl}
        closeDlg={closeDlg} 
        infId={data.infId}
        catType={catType}
      />
      <CP 
        accountId={selAccountId} 
        setCollapse={closeCP}
      />
    </>
  );
}