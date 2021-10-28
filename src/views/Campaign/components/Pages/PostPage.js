/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from 'react';
import {Box} from '@mui/material';
import {PostPageTable, PostPageStatic} from '../Table'
import {campaignService} from 'services';
import toast from 'react-hot-toast';

const PostPage = ({selCampId}) => {
  const [data, setData] = useState({name: '', members:[]});
  const [updatedMembers, setUpdatedMembers] = useState([]);
  
  useEffect(() => {
    if (!selCampId)
      return;

    return campaignService.getCampaignDetail(selCampId, 'post')
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

  const saveMemberStatus = (idx, pstatus, amount) => {
    if (isNaN(parseInt(amount)))
      amount = 0;
    else
      amount = parseInt(amount);

    return campaignService.updateMemberStatus(selCampId, 2, data.members[idx].accountId, pstatus, amount)
    .then((ret) => {
      if (ret.status !== 'ok') {
        toast.error('状態保存に失敗しました。');
        return;
      }
      toast.success('状態保存に成功しました。');

      updatedMembers[idx].pstatus = pstatus;
      updatedMembers[idx].amount = amount;
      setUpdatedMembers([...updatedMembers]);
    })
    .catch(error => {
      toast.error(error.toString());
    });
  }

  return (
    <Box className='post-page'>
      <PostPageStatic isloading={data.name.length < 1} datas={updatedMembers} />
      <PostPageTable 
        data={data.members} 
        handleSaveMember={saveMemberStatus}
      />
    </Box>
  );
};

export default PostPage;
