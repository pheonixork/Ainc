/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { memberList } from 'mockup/campain_list';
import { ReportFeedTable } from '../../Table'

const feedHeadCells = [
  {
    id: 'id',
    label: 'アカウントID'
  },
  {
    id: 'postDate',
    label: '投稿日',
  },
  {
    id: 'postURL',
    label: '投稿URL',
  },
  {
    id: 'productName',
    label: '商品名',
  },
  {
    id: 'price',
    label: '金額',
  },
  {
    id: 'followers',
    label: 'フォロワー数',
  },
  {
    id: 'numberOfReach',
    label: 'リーチ数',
  },
  {
    id: 'percentOfReach',
    label: 'リーチ%',
  },
  {
    id: 'save',
    label: '保存',
  },
  {
    id: 'savePercent',
    label: '保存%',
  },
  {
    id: 'numberOfLikes',
    label: 'いいね数',
  },
  {
    id: 'numberOfComments',
    label: 'コメント数',
  },
  {
    id: 'normalEG',
    label: '通常/EG',
  },
  {
    id: 'prEG',
    label: 'PR/EG',
  },
  {
    id: 'sales',
    label: '売上',
  },
  {
    id: 'ROAS',
    label: 'ROAS',
  }
];

const rirHeadCells = [
  {
    id: 'id',
    label: 'アカウントID'
  },
  {
    id: 'postDate',
    label: '投稿日',
  },
  {
    id: 'postURL',
    label: '投稿URL',
  },
  {
    id: 'productName',
    label: '商品名',
  },
  {
    id: 'price',
    label: '金額',
  },
  {
    id: 'followers',
    label: 'フォロワー数',
  },
  {
    id: 'numberOfReach',
    label: 'リーチ数',
  },
  {
    id: 'percentOfReach',
    label: 'リーチ%',
  },
  {
    id: 'save',
    label: '保存',
  },
  {
    id: 'savePercent',
    label: '保存%',
  },
  {
    id: 'numberOfLikes',
    label: 'いいね数',
  },
  {
    id: 'numberOfComments',
    label: 'コメント数',
  },
  {
    id: 'normalEG',
    label: '通常/EG',
  },
  {
    id: 'prEG',
    label: 'PR/EG',
  }
];

const storyHeadCells = [
  {
    id: 'id',
    label: 'アカウントID'
  },
  {
    id: 'postDate',
    label: '投稿日',
  },
  {
    id: 'postURL',
    label: '投稿URL',
  },
  {
    id: 'productName',
    label: '商品名',
  },
  {
    id: 'budget',
    label: '予算',
  },
  {
    id: 'followers',
    label: 'フォロワー数',
  },
  {
    id: 'numberOfImp',
    label: 'インプ',
  },
  {
    id: 'percentOfImp',
    label: 'インプ%',
  },
  {
    id: 'numberOfClick',
    label: 'クリック',
  },
  {
    id: 'percentOfClick',
    label: 'クリック%',
  },
  {
    id: 'numberOfStamp',
    label: 'スタンプ',
  },
  {
    id: 'percentOfStamp',
    label: 'スタンプ%',
  },
  {
    id: 'earning',
    label: '売上',
  },
  {
    id: 'ROAS',
    label: 'ROAS',
  }
];

const ReportTabs = ({ members, curType }) => {

  return (
    <Box>
      {/* <ListPage display={`${curType === 'list' ? 'block' : 'none'}`} />
      <PostPage display={`${curType === 'post' ? 'block' : 'none'}`} />
      <ReportPage display={`${curType === 'report' ? 'block' : 'none'}`} /> */}
      {curType === 'feed' && 
        <ReportFeedTable 
          headCells={feedHeadCells}
          data={members}
          status={1}
        />
      }
      {curType === 'story' && 
        <ReportFeedTable 
          headCells={storyHeadCells}
          data={members}
          status={2}
        />
      }
      {curType === 'rir' && 
        <ReportFeedTable 
          headCells={rirHeadCells}
          data={members}
          status={3}
        />
      }
    </Box>
  );
};

export default ReportTabs;

ReportTabs.propTypes = {
  curType: PropTypes.string.isRequired,
};