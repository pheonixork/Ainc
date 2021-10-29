/* eslint-disable react/no-unescaped-entities */
import React, {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import {campaignService} from 'services';
import {InstagramPage, YoutubePage, TiktokPage} from './ReportTabs';
import toast from 'react-hot-toast';

const ReportPage = ({selCampId, selCampSNS}) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    if (!selCampId)
      return;

    return campaignService.getCampaignDetail(selCampId, 'report')
    .then((ret) => {
      if (ret.status !== 'ok') {
        toast.error('詳しい情報を見つけてないです。');
        return;
      }

      if (!ret.data)
        return;

      setData(ret.data);
    })
    .catch(error => {
      toast.error(error.toString());
    });  
  }, [selCampId]);

  return (
    <Box className='report-page'>
      {selCampSNS === 'instagram' && <InstagramPage selCampId={selCampId} data={data} />}
      {selCampSNS === 'youtube' && <YoutubePage selCampId={selCampId} data={data} />}
      {selCampSNS === 'tiktok' && <TiktokPage selCampId={selCampId} data={data} />}
    </Box>
  );
};

export default ReportPage;
