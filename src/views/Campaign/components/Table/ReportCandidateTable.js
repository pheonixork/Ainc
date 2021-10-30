import React, { useEffect, useState } from 'react';
import {Box, Typography, Paper} from '@mui/material';
import {ReportTabSelect} from '../Pages/ReportTabs';
import RelativeImage from 'components/RelativeImage';

const CandidateItem = ({row, setType, classes}) => {
  const handleSelect = (newType) => {
    setType(row._id, newType);
  }

  return (
    <Paper className={classes.candidateItem}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginLeft="20px"
      >
        <RelativeImage
          isRound
          imgSrc={'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D'}
          sx={{width: '3rem !important', height: '3rem !important', margin: '.5rem'}}
        />
      </Box>
      <Box marginLeft="20px">
        <Typography>{row.name}</Typography>
      </Box>
      <Box 
        sx={{
          flex: 'auto',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <ReportTabSelect curType='' onSelect={handleSelect}/>
      </Box>
    </Paper>
  )
};

export default function ReportCandidateTable({getDatas, updateCandiates, classes}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([...getDatas()]);
  }, [getDatas]);

  return (
    <Box>
      {data.map((row, index) => (
        <CandidateItem 
          key={index} 
          row={row} 
          setType={updateCandiates}
          classes={classes}
        />
      ))}
    </Box>
  );
}