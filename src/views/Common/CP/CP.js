import moment from 'moment';
import React, {useState, useEffect, useRef} from 'react';
import toast from 'react-hot-toast';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Box, Button, Typography, Rating, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RightSidebar from './RightSidebar';
import {accountService} from 'services';
import WaitingLoader from './WaitingLoader';
import RelativeImage from 'components/RelativeImage';

const CP = ({accountId, setCollapse}) => {
  const [ratingValue, setRatingValue] = useState();
  const [data, setData] = useState(null);
  const memoInput = useRef();

  const setRightSidebarClose = () => {
    setCollapse('');
  }

  const saveData = () => {
    if (memoInput.current.value.trim() === '') {
      toast.error('メモを入力してください。');
      return;
    }

    accountService.updateAccount(accountId, ratingValue, memoInput.current.value)
      .then((response) => {
        if (response.status !== 'ok') {
          toast.error(response.msg);
          return;
        }
        toast.success('アカウント情報更新に成功しました');
      }).catch(err => {
        toast.error('アカウント情報更新に失敗しました');
      });
  }

  useEffect(() => {
    if (!accountId || accountId === '') {
      return;
    }

    accountService.getDetail(accountId)
      .then((response) => {
        if (response.status !== 'ok') {
          setData(null);
          toast.error(response.msg);
          return;
        }

        if (memoInput.current)
          memoInput.current.value = response.data.memo || '';
        setData(response.data);
        setRatingValue(response.data.star);
      }).catch(err => {
        toast.error(err.toString());
      });
  }, [accountId])

  return (
    <RightSidebar extraClass={'campaign-sidebar'} autoClose={false} isCollapse={accountId === ''} setCollapse={setRightSidebarClose}>
      <Box className='toolbar'>
        <Button className='close'
          onClick={evt=>setRightSidebarClose()}
        >
          <CloseIcon fontSize="small" />
        </Button>
        <Button className='save' onClick={e=>saveData()} >
          <svg fill="none" height="16" width="16" xmlns="http://www.w3.org/2000/svg" >
            <path d="M12.67 12l1.33.67V2c0-.73-.6-1.33-1.33-1.33H5.99c-.73 0-1.32.6-1.32 1.33h6.66c.74 0 1.34.6 1.34 1.33V12zM10 3.33H3.33C2.6 3.33 2 3.93 2 4.67v10.66l4.67-2 4.66 2V4.67c0-.74-.6-1.34-1.33-1.34z"></path>
          </svg>
          <span>保存</span>
        </Button>
      </Box>
      {data === null ? 
        <WaitingLoader /> : 
        <Box>
          <Box className="profile-container">
            <RelativeImage
              isRound
              imgSrc={'https://imgigp.modash.io/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDY9ylLT5c6L8M5YYtkm82Y2DDgAk%2BlFE0f8CghKo5%2FCKHnrwHpFJsVwOsLT2HHY58qvvB2REevWri5e5dDWGq%2BUrC4M4BvvnB6Aeuo02N6AJw%3D%3D'}
              sx={{width: '150px !important', height: '150px !important', margin: '1rem'}}
            />
            <Typography className="name">{data.name}</Typography>
            <Box 
              className="link"
              component="a"
              href={data.link}
            >
              @{data.name}
            </Box>
            <Rating
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
            />
            <TextField
              multiline
              rows="5"
              variant="outlined"
              size="small"
              placeholder="メモ入力"
              sx={{width: '80%', marginTop: '10px', fontSize: '14px', padding: '8px'}}
              InputProps={{
                classes: {input: 'customPlaceholder'}, 
                style: {color: '#000'} 
              }}
              inputRef={memoInput}
            />
          </Box>
          <Box className="profile-detail">
            <Box className="profile-item">
              <Typography className="label">ジャンル:</Typography>
              <Typography className="value">{data.type}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">投稿日:</Typography>
              <Typography className="value">{data.postAt && moment(data.postAt).format('YYYY/M/D')}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">投稿URL:</Typography>
              <Typography className="value">{data.postLink}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">商品名:</Typography>
              <Typography className="value">{data.shopping}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">金額:</Typography>
              <Typography className="value">{data.amount}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">フォロウー数:</Typography>
              <Typography className="value">{data.followers}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">リーチ数:</Typography>
              <Typography className="value">{data.rich}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">リーチ％:</Typography>
              <Typography className="value">0</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">保存:</Typography>
              <Typography className="value">{data.saving}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">保存％:</Typography>
              <Typography className="value">0</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">いいね数:</Typography>
              <Typography className="value">{data.oks}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">コメント数:</Typography>
              <Typography className="value">{data.comment}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">通常数/EG:</Typography>
              <Typography className="value">{data.normal}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">PR/EG:</Typography>
              <Typography className="value">{data.prs}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">売上:</Typography>
              <Typography className="value">{data.sell}</Typography>
            </Box>
            <Box className="profile-item">
              <Typography className="label">ROAS:</Typography>
              <Typography className="value">{data.roas}</Typography>
            </Box>
          </Box>
        </Box>
      }
    </RightSidebar>
  );
};

export default CP;