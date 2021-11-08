/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect, useCallback} from 'react';
import {Box} from '@mui/material';
import {PostPageTable, PostPageStatic} from '../Table'
import {campaignService} from 'services';
import toast from 'react-hot-toast';

const PostPage = ({selCampId, catType}) => {
  const [data, setData] = useState({name: '', members:[]});
  const [updatedMembers, setUpdatedMembers] = useState([]);

  const getDatas = useCallback(() => {
    return data.members;
  }, [data]);

  const getStaticInfos = useCallback(() => {
    return updatedMembers
  }, [updatedMembers]);
  
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

  const saveMemberAmount = (idx, amount) => {
    if (isNaN(parseInt(amount)))
      amount = 0;
    else
      amount = parseInt(amount);

    return campaignService.updateMemberAmount(selCampId, data.members[idx]._id, amount)
    .then((ret) => {
      if (ret.status !== 'ok') {
        toast.error('状態保存に失敗しました。');
        return;
      }
      toast.success('保存しました。');

      updatedMembers[idx].amount = amount;
      setUpdatedMembers([...updatedMembers]);
    })
    .catch(error => {
      toast.error(error.toString());
    });
  }

  const saveMemberStatus = (idx, pstatus) => {
    return campaignService.updateMemberStatus(selCampId, 2, data.members[idx]._id, pstatus)
    .then((ret) => {
      if (ret.status !== 'ok') {
        toast.error('状態保存に失敗しました。');
        return;
      }
      toast.success('保存しました。');

      updatedMembers[idx].pstatus = pstatus;
      setUpdatedMembers([...updatedMembers]);
    })
    .catch(error => {
      toast.error(error.toString());
    });
  }

  return (
    <Box className='post-page'>
      <PostPageStatic isloading={data.name.length < 1} getMembers={getStaticInfos} />
      <PostPageTable 
        catType={catType}
        getMembers={getDatas} 
        handleSaveAmount={saveMemberAmount}
        handleSaveMember={saveMemberStatus}
      />
    </Box>
  );
};

export default PostPage;
