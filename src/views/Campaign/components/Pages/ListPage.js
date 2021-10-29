/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect, useCallback} from 'react';
import {Box, } from '@mui/material';
import {ListPageStatic, ListPageTable} from '../Table'
import {campaignService} from 'services';
import toast from 'react-hot-toast';

const ListPage = ({selCampId}) => {
  
  const [data, setData] = useState({name: '', members:[]});
  const [updatedMembers, setUpdatedMembers] = useState([]);

  const getStaticInfos = useCallback(() => {
    return updatedMembers;
  }, [updatedMembers]);

  const getMembers = useCallback(() => {
    return data.members;
  }, [data])

  useEffect(() => {
    if (!selCampId)
      return;

    return campaignService.getCampaignDetail(selCampId, 'list')
      .then((ret) => {
        if (ret.status !== 'ok') {
          toast.error('詳しい情報を見つけてないです。');
          return;
        }

        if (!ret.data)
          return;

        setData(ret.data);
        setUpdatedMembers([...ret.data.members]);
      })
      .catch(error => {
        toast.error(error.toString());
      });

  }, [selCampId]);

  const saveMemberStatus = (idx, status) => {
    return campaignService.updateMemberStatus(selCampId, 1, data.members[idx].accountId, status)
    .then((ret) => {
      if (ret.status !== 'ok') {
        toast.error('状態保存に失敗しました。');
        return;
      }
      toast.success('状態保存に成功しました。');

      updatedMembers[idx].status = status;
      setUpdatedMembers([...updatedMembers]);
    })
    .catch(error => {
      toast.error(error.toString());
    });
  }

  return (
    <Box className='list-page'>
      <ListPageStatic isloading={data.name.length < 1} updatedInfos={getStaticInfos} />
      <ListPageTable 
        getMembers={getMembers} 
        handleSaveMember={saveMemberStatus}
      />
    </Box>
  );
};

export default ListPage;
