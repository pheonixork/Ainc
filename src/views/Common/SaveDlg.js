/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Skeleton, Box, Button, Checkbox, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {accountService} from 'services';
import Lang from 'constants/lang';

export default function SaveDlg({infId, catType, closeDlg}) {
  const [chkStatus, changeStatus] = useState({});
  const [campaigns, setChampaigns] = useState([]);
  const [isLoading, changeLoading] = useState(true);

  useEffect(() => {
    if (!infId)
      return;

    accountService.getCampaigns(infId, catType)
    .then((response) => {
      changeLoading(false);
      if (response.status !== 'ok') {
        changeStatus({});
        setChampaigns([]);
        return;
      }

      setChampaigns(response.data.campaigns);

      let match;
      _.map(response.data.campaigns, itm => {
        match = _.find(response.data.selected, selItm => selItm === itm.id);
        if (match)
          _.set(chkStatus, itm.id, true);
        else
          _.set(chkStatus, itm.id, false);
      });
      
      changeStatus({...chkStatus});
    }).catch(err => {
      changeLoading(false);
      changeStatus({});
      setChampaigns([]);
    });
  }, [infId]);

  const saveAccount = (status) => {
    let categories = [];
    _.each(status, (val, key) => {
      if (val === false)
        return;

      categories.push(key);
    });

    if (categories.length < 1) {
      toast.error('キャンペーンを選択してください');
      return;
    }

    accountService.updateAmongCampiangs(infId, catType, categories)
      .then((response) => {
        if (response.status !== 'ok') {
          toast.error(response.msg);
          return;
        }
        toast.success(Lang.label.influencersaved);
      }).catch(err => {
        toast.error(err.toString());
      });
  }

  const handleChange = (evt) => {
    if (evt.target.checked === false) {
      toast.error('一度チェックをいれたものは外せません');
      return;
    }
    let tmpStatus = {...chkStatus, [evt.target.name]:evt.target.checked};
    saveAccount(tmpStatus);
    changeStatus(tmpStatus);
  }

  const getCampInfo = (campId) => {
    let camp = _.find(campaigns, selItm => selItm.id === campId);
    if (!camp)
      return '';

    return camp.name + '(' + camp.mems + ')';
  }

  return (
    <section 
      className="saveDlg"
      onClick={e=>e.stopPropagation()}
      >
      <Box className="up-triangle"></Box>
      <Box className="saveDlgToolbar">
        <Typography variant="h6">キャンペーンリストに保存する</Typography>
        <Box className="saveDlgButtons">
          {/* {isLoading ? (
            <Skeleton width={30} height={30} sx={{transform:'unset'}}/>
          ) : (
            <SaveIcon fontSize="medium" className="closeIcon" onClick={e=>saveAccount()} />
          )} */}
          {isLoading ? (
            <Skeleton width={30} height={30} sx={{transform:'unset'}}/>
          ) : (
            <CloseIcon fontSize="medium" className="closeIcon" onClick={e=>closeDlg()} />
          )}
        </Box>
      </Box>
      {isLoading ? (
        <Skeleton width={'100%'} height={100} sx={{transform:'unset'}}/>
      ) : (
        <ul className="contents">
          {_.map(chkStatus, (val, campId) => (
            <li key={campId}>
              {getCampInfo(campId)}
              <Checkbox
                name={campId}
                checked={val}
                onChange={handleChange}
                color="success"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 24 }}}
              />
            </li>
          ))}
        </ul>
      )}
      <Box className="add-to-list">
        {isLoading ? (
          <Skeleton width={'100%'} height={50} sx={{transform:'unset'}}/>
        ) : (
          <NextLink href={'/campaign/new'} passHref>
            <Button className="create-list">
              <svg fill="none" height="32" width="32" xmlns="http://www.w3.org/2000/svg" className="create-list-plus">
                <path fill="#114B5F" d="M16 2.67a13.34 13.34 0 1 0 .01 26.67A13.34 13.34 0 0 0 16 2.67zm5.33 14.66h-4v4c0 .74-.6 1.34-1.33 1.34-.73 0-1.33-.6-1.33-1.34v-4h-4c-.74 0-1.34-.6-1.34-1.33 0-.73.6-1.33 1.34-1.33h4v-4c0-.74.6-1.34 1.33-1.34.73 0 1.33.6 1.33 1.34v4h4c.74 0 1.34.6 1.34 1.33 0 .73-.6 1.33-1.34 1.33z"></path>
              </svg>
              <span>新しいキャンペーン作成</span>
            </Button>
          </NextLink>
        )}
      </Box>
    </section>
  );
};

SaveDlg.propTypes = {
  infId: PropTypes.string.isRequired,
  catType: PropTypes.string.isRequired,
  closeDlg: PropTypes.func,
};