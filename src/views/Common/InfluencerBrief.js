import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useMainContext } from 'context/MainContext';
import RightSidebar from 'components/RightSidebar';
import Header from './Brief/Header';
import AudienceDetails from './Brief/AudienceDetails';
import LastUpdates from './Brief/LastUpdates';
import MostPosts from './Brief/MostPosts';
import InfluencerDetail from './InfluencerDetail';
import InfluencerBriefLoading from './InfluencerBriefLoading';
import {modashService} from 'services';
import toast from 'react-hot-toast';

const InfluencerBrief = ({}) => {
  const {setInfluencerCollapsable, isInfluCollapse, influSelectedId, profileType} = useMainContext();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [openDlg, setOpenDialog] = useState(false);

  const openDialog = () => {
    setOpenDialog(true);
  }

  const closeDialog = () => {
    setOpenDialog(false);
  }

  useEffect(() => {
    if (isInfluCollapse === true || influSelectedId === '')
      return;

    setLoading(true);
    return modashService.getProfileOverview(influSelectedId, profileType)
      .then((response) => {
        if (response.status !== 'ok' || response.data.error !== false) {
          setLoading(false);
          setData(null);
          return;
        }

        setData(response.data.profile);
        setLoading(false);
      }).catch(msg => {
        setLoading(false);
        setData(null);
        // setData({
        //   avatar: 'https://imgigp.modash.io/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDY9ylLT5c6L8M5YYtkm82Y2DDgAk%2BlFE0f8CghKo5%2FCKHnrwHpFJsVwOsLT2HHY58qvvB2REevWri5e5dDWGq%2BUrC4M4BvvnB6Aeuo02N6AJw%3D%3D',
        //   name: 'Cristano ronaldo',
        //   instagram: 'https://www.instagram.com/instagram',
        //   followers: 58473948,
        //   engage: 39582,
        //   per: 0.54
        // });
        toast.error(msg);
      });
  }, [influSelectedId, isInfluCollapse, profileType]);

  return (
    <RightSidebar>
      {!isInfluCollapse && ( 
        isLoading ? 
          <InfluencerBriefLoading /> :  
          <Box className='influencer-brief'>
            <Box className='influencer-toolbar'>
              <Button className='close'
                onClick={evt=>setInfluencerCollapsable(true)}
              >
                <CloseIcon fontSize="small" />
              </Button>
              {/*
              <Button className='save'>
                <svg fill="none" height="16" width="16" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M12.67 12l1.33.67V2c0-.73-.6-1.33-1.33-1.33H5.99c-.73 0-1.32.6-1.32 1.33h6.66c.74 0 1.34.6 1.34 1.33V12zM10 3.33H3.33C2.6 3.33 2 3.93 2 4.67v10.66l4.67-2 4.66 2V4.67c0-.74-.6-1.34-1.33-1.34z"></path>
                </svg>
                <span>保存</span>
              </Button>
              */}
            </Box>

            {data !== null && 
              <Box>
                <Header data={data.profile} type={profileType} handleOpen={openDialog}/>

                <LastUpdates data={data.profile} stats={data.stats} />

                <AudienceDetails data={data.audience} hashtags={data.hashtags}/>

                <MostPosts data={data.popularPosts}/>

                <InfluencerDetail 
                  open={openDlg}
                  handleClose={closeDialog}
                />
              </Box>
            }
          </Box>
        )
      }
    </RightSidebar>
  );
};

export default InfluencerBrief;
