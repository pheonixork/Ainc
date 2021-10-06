import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Header from './Detail/Header';
import PopularPosts from './Detail/PopularPosts';
import AudienceData from './Detail/AudienceData';
import AudienceLikes from './Detail/AudienceLikes';
import Notable from './Detail/Notable';
import HashTag from './Detail/HashTag';
import SponsorPosts from './Detail/SponsorPosts';

export default function InfluencerDetail({open, handleClose}) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      avatar: 'https://imgigp.modash.io/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDY9ylLT5c6L8M5YYtkm82Y2DDgAk%2BlFE0f8CghKo5%2FCKHnrwHpFJsVwOsLT2HHY58qvvB2REevWri5e5dDWGq%2BUrC4M4BvvnB6Aeuo02N6AJw%3D%3D',
      name: 'Cristano ronaldo',
      instagram: 'https://www.instagram.com/instagram',
      followers: 58473948,
      engage: 39582,
      per: 0.54})
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={'body'}
      sx={{ '& .MuiDialog-paper': { 
        maxWidth: {xs: '100%', md:'720px'},
        background: 'linear-gradient(157.53deg,#edf7fe 11.25%,#fff 50.77%,#edf7fe 92.83%)'
      }}}
    >
      <DialogContent>
        <Header data={data} />
        <PopularPosts />
        <AudienceData />
        <AudienceLikes />
        <Notable />
        <HashTag />
        <SponsorPosts />
      </DialogContent>
    </Dialog>
  );
};

InfluencerDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};