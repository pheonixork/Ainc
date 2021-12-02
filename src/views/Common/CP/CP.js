import moment from 'moment';
import React, {useState, useEffect, useRef} from 'react';
import NextLink from 'next/link';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import toast from 'react-hot-toast';
import {TableHead, TableRow, TableContainer, TableCell, TableBody, Table, Box, Button, Typography, Rating, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RightSidebar from './RightSidebar';
import {accountService} from 'services';
import WaitingLoader from './WaitingLoader';
import RelativeImage from 'components/RelativeImage';
import {AlertDlg, SaveDlg} from 'views/Common';
import Lang from 'constants/lang';

const CP = ({accountId, setCollapse}) => {
  const [ratingValue, setRatingValue] = useState();
  const [data, setData] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [showDlg, setDlgState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const memoInput = useRef();

  const closeSaveDialog = () => {
    setAnchorEl(null);
  }

  const closeAlertDialog = (status) => {
    setDlgState(false);

    if (status === true)
      setCollapse(!data || !data.star ? 0 : data.star);  
  }

  const setRightSidebarClose = () => {
    if (!data) {
      setCollapse(0);      
      return;
    }

    if (data.star !== ratingValue || (data.memo && data.memo !== memoInput.current.value.trim())) {
      setDlgState(true);
      return;
    } 

    setCollapse(!data || !data.star ? 0 : data.star);
  }

  const updateData = () => {
    accountService.updateAccount(accountId, ratingValue, memoInput.current.value.trim())
      .then((response) => {
        if (response.status !== 'ok') {
          toast.error(response.msg);
          return;
        }
        toast.success('保存しました。');
        setData({...data, star: ratingValue, memo: memoInput.current.value.trim()});
      }).catch(err => {
        toast.error('アカウント情報保存に失敗しました。');
      });
  }

  useEffect(() => {
    if (!accountId || accountId === '') {
      return;
    }

    accountService.getCampaingsDetail(accountId)
      .then((response) => {
        if (response.status !== 'ok') {
          setData(null);
          toast.error(response.msg);
          return;
        }

        let results = response.data;
        if (results.length < 1)
          return;

        if (memoInput.current)
          memoInput.current.value = results[0].memo || '';
        
        setCampaigns(results.map(itm=>{
          return {cid: itm.cid, cname: itm.cname, csns: itm.csns, ctype: itm.ctype, cdate: itm.cdate};
        }));

        setData({
          name: results[0].name, 
          link: results[0].link, 
          star: results[0].star, 
          memo: results[0].memo,
          infId: results[0].infId,
          type: results[0].type,
          avatar: results[0].avatar,
        });
        setRatingValue(results[0].star);
      }).catch(err => {
        toast.error(err.toString());
      });
  }, [accountId])

  return (
    <RightSidebar extraClass={'campaign-sidebar'} autoClose={false} isCollapse={accountId === ''} setCollapse={setRightSidebarClose}>
      <Box className='toolbar' style={{zIndex:1}}>
        <Button className='close'
          onClick={evt=>setRightSidebarClose()}
        >
          <CloseIcon fontSize="small" />
        </Button>
        {data !== null && 
          <Box sx={{display: 'flex'}}>
            <Button 
              className='active' 
              onClick={e=>updateData()} 
              sx={{marginRight: '.5rem'}}
            >
              <span>{Lang.btn.save}</span>
            </Button>
            <Box className='relative-action'>
              <Button 
                className='save' 
                onClick={e=>setAnchorEl(e.currentTarget)}
              >
                <span>{Lang.btn.register}</span>
              </Button>
            </Box>
          </Box>  
        }
      </Box>
      {data === null ? 
        <WaitingLoader /> : 
        <Box style={{zIndex:0}}>
          <Box className="profile-container">
            <RelativeImage
              isRound
              imgSrc={data.avatar}
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
          <TableContainer style={{ padding: 1 }}>
            <Table
              className="styledTable"
              aria-labelledby="tableTitle"
              size='medium'
            >
              <TableHead>
                <TableRow>
                  <TableCell>{'キャンペーン名'}</TableCell>
                  <TableCell>{'ジャンル'}</TableCell>
                  <TableCell>{'SNS'}</TableCell>
                  <TableCell>{'作成日'}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.length > 0 ? (
                  campaigns.map((row, index) => {
                      return (
                        <NextLink key={index} href={`/campaign/detail/${row.cid}`} passHref>
                          <TableRow
                            hover
                            // onClick={() => handleClick(row.cid)}
                            key={index}
                          >
                            <TableCell>{row.cname}</TableCell>
                            <TableCell>{row.ctype}</TableCell>
                            <TableCell>
                              {row.csns === 'instagram' &&
                                <Box
                                  component={LazyLoadImage}
                                  effect="blur"
                                  src={'/images/svgs/instagram.svg'}
                                  width={'24px'}
                                  height={'24px'}
                                /> 
                              }
                              {row.csns === 'youtube' && 
                                <Box
                                  component={LazyLoadImage}
                                  effect="blur"
                                  src={'/images/svgs/youtube.svg'}
                                  width={'24px'}
                                  height={'24px'}
                                /> 
                              }
                              {row.csns === 'tiktok' && 
                                <Box
                                  component={LazyLoadImage}
                                  effect="blur"
                                  src={'/images/svgs/tiktok.svg'}
                                  width={'24px'}
                                  height={'24px'}
                                /> 
                              }
                            </TableCell>
                            <TableCell>
                              {moment(row.cdate).format('YYYY/MM/DD')}
                              <br/>
                            </TableCell>
                          </TableRow>
                        </NextLink>
                      );
                    }))
                  : (
                    <TableRow>
                      <TableCell colSpan={4} style={{textAlign: 'center'}}>参加したキャンペーンがありません。</TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
          <SaveDlg 
            anchorEl={anchorEl}
            closeDlg={closeSaveDialog} 
            infId={data ? data.infId : ''}
            catType={data ? data.type : ''}
          />
        </Box>
      }
      <AlertDlg 
        title={'注意'} 
        caption={'更新されていません。入力情報が失われますがよろしいでしょうか？'}
        dlgState={showDlg}
        closeDlg={closeAlertDialog}
      />
    </RightSidebar>
  );
};

export default CP;