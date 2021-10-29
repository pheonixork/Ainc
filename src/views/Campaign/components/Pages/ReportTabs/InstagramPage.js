/* eslint-disable react/no-unescaped-entities */
import React, {useState} from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { memberList } from 'mockup/campain_list';
import { InstagramStatic, ReportTabs, ReportTabSelect } from '.';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ReportItem = ({row, index, handlePostItemClick}) => {
  const [curType, onSelect] = useState();
  
  const handleSelect = (newType) => {
    handlePostItemClick(index, newType);
    onSelect(newType);
  }

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px 0",
        marginTop: "10px",
      }}              
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginLeft="20px"
      >
        <Box
          component={LazyLoadImage}
          effect="blur"
          src={'https://imgigp.modash.io/v2?c%2BZ6gMi8pzyyj3IdIuQSsDBpwchEsdg%2FtvYkoZ9FuoSksebKiT33KgD4wwHFlDXbI4DIfy8EnTAkufas3yX0d%2F62Fe0Qy1s3lad6xs2O2KwQUh8XIW8DgtgL%2FnGC4CBRRwx0Ay5NRmelqAx1tpPJDg%3D%3D'}
          height={'3rem'}
          width={'3rem'}
          sx={{margin:'0.5rem', borderRadius:'50%'}}
        />        
      </Box>
      <Box marginLeft="20px">
        <Typography>{row.id}</Typography>
      </Box>
      <Box 
        sx={{
          flex: 'auto',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <ReportTabSelect curType={curType} onSelect={handleSelect}/>
      </Box>
    </Paper>
  )
};

const InstagramPage = ({selCampId, data}) => {
  const [selType, onSelect] = useState('feed');
  const [members, setMembers] = useState(memberList);

  const handlePostItemClick = (index, status) => {
    if (status === 'feed')
      members[index].status = 1;
    if (status === 'story')
      members[index].status = 2;
    if (status === 'rir')
      members[index].status = 3;
    setMembers([...members]);
    console.log(members);
  }

  return (
    <Box className='report-page'>
      <InstagramStatic />
      <Box marginTop={4}>
        <ReportTabSelect curType={selType} onSelect={onSelect}/>
      </Box>
      <Box marginTop={4}>
        <ReportTabs members={members} curType={selType} />
      </Box>
      <Box marginTop={4}>
        {members.map((row, index) => {
          if (row.status === 0) {
            return (
              <ReportItem key={index} row={row} index={index} handlePostItemClick={handlePostItemClick}/>
            )
          }          
        })}
      </Box>
    </Box>
  );
};

export default InstagramPage;
