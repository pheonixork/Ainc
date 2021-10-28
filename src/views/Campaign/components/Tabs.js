/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {InfluencerBrief} from 'views/Common';
import {ListPage, PostPage, ReportPage} from './Pages';

const Tabs = ({curType, campaignId, campaignSNS}) => {

  return (
    <Box>
      {curType === 'list' && (
        <ListPage selCampId={campaignId} />
      )}
      {curType === 'post' && (
        <PostPage selCampId={campaignId} />
      )}
      {curType === 'report' && (
        <ReportPage selCampId={campaignId} selCampSNS={campaignSNS} />
      )}
      <InfluencerBrief />
    </Box>
  );
};

export default Tabs;

Tabs.propTypes = {
  curType: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  campaignSNS: PropTypes.string.isRequired,
};