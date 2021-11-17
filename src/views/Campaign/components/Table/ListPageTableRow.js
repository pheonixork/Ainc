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
  const [showDlg, setShow] = useState(false);
  const closeDlg = () => {
    setShow(false);
  }

  const [selAccountId, setAccountId] = useState('');
  const closeCP = (val) => {
    setData({...data, star:val});
    setAccountId('');
  }

  const [data, setData] = useState(row);

  const {setInfluencerCollapsable, setInfluencerIndex, influSelectedIndex} = useMainContext();
  const handleSelectChanged = (index) => {
    setInfluencerCollapsable(false);
    setInfluencerIndex(index);
  };

  const changeStutus = (val) => {
    handleSaveMember(index, val);
  }

  return (
    <>
      <TableRow
        className={`${influSelectedIndex === index ? 'influencer-detail-active' : ''}`}
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
          <Rating value={data.star} readOnly />
        </TableCell>
        <TableCell align="left">{data.name}</TableCell>
        <TableCell align="left">{data.followers}</TableCell>
        <TableCell align="left">{data.engage}</TableCell>
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
          </Box>
        </TableCell>
      </TableRow>
      <CP 
        accountId={selAccountId} 
        setCollapse={closeCP}
      />
    </>
  );
}