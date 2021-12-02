/* eslint-disable react/no-unescaped-entities */
import moment from 'moment';
import clsx from 'clsx';
import React, {useEffect, useRef, useState} from 'react';
import {Skeleton, Switch, Box, Button, Typography, Paper, TextField, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {AlertDlg} from 'views/Common';

const PurpleSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#816BF7',
    '&:hover': {
      backgroundColor: alpha('#816BF7', 0.8),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#816BF7',
  },
}));

export default function InstagramStatic({isLoading, getDatas, classes}) {
  const formatterInt = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0});
  const formatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [staticType, setStaticType] = useState(true);
  const [showAlert, showAlertDlg] = useState(false);
  const [alertcaption, setAlertCaption] = useState('');

  const closeAlertDlg = (status) => {
    showAlertDlg(false);
    if (status === false) {
      return;
    }

    setStaticType(!staticType);
  }

  const switchCustomHandle = (val) => {
    if (staticType === false) {
      setAlertCaption('自動に切り替えると、\r\n今まで手動で入力されたものが全て自動で取得した数字に更新されます。\r\n本当によろしいでしょうか？');
      showAlertDlg(true);
      return;
    }

    setAlertCaption('手動に切り替えると、\r\nレポート数値の自動反映が止まります。\r\n本当によろしいでしょうか？');
    showAlertDlg(true);
  }

  // const [info, setInfos] = useState({
  //   amount:100, sells:0, roas:0, mems:0, followers:0, folvalue:0,
  //   feed:{mems: 0, rich:0, richper:0, savings:0, per:0, normal:0},
  //   story:{mems: 0, inp:0, inpper:0, clicks:0, clickper:0, staf:0, stafper:0},
  //   ril:{mems: 0, rich:0, richper:0, savings:0, per:0, normal:0}
  // });

  const amountRef = useRef();
  const sellRef = useRef();
  const roasRef = useRef();
  const memsRef = useRef();
  const followersRef = useRef();
  const followerValRef = useRef();
  const frichRef = useRef();
  const frichPerRef = useRef();
  const fsavingRef = useRef();
  const fsavingPerRef = useRef();
  const fnormalRef = useRef();
  const sinpRef = useRef();
  const sinpPerRef = useRef();
  const sclickRef = useRef();
  const sclickPerRef = useRef();
  const sstampRef = useRef();
  const sstampPerRef = useRef();
  const rrichRef = useRef();
  const rrichPerRef = useRef();
  const rsavingRef = useRef();
  const rsavingPerRef = useRef();
  const rnormalRef = useRef();

  useEffect(() => {
    let tmp = getDatas();
    if (!tmp || tmp.length < 1)
      return;

    let amount = 0, sells = 0, roas = 0, followers = 0, folvalue = 0;
    let feed = {mems:0, rich:0, richper:0, savings:0, per:0, normal:0};
    let story = {mems:0, inp:0, inpper:0, clicks:0, clickper:0, staf:0, stafper:0};
    let ril = {mems:0, rich:0, richper:0, savings:0, per:0, normal:0};

    if (staticType === true) {
      _.map(tmp, itm => {
        // amount += itm.amount ? parseInt(itm.amount) : 0;
        sells += itm.sell ? parseInt(itm.sell) : 0;
        roas += (!itm.amount || !itm.sell) ? 0 : parseInt(itm.sell) / parseInt(itm.amount) * 100;
        followers += itm.followers ? parseInt(itm.followers) : 0;

        if (itm.rtype === 1) {
          feed.rich += itm.rich ? parseInt(itm.rich) : 0;
          feed.savings += itm.saving ? parseInt(itm.saving) : 0;
          feed.normal += itm.normal ? parseInt(itm.normal) : 0;
          feed.richper += (!itm.rich || !itm.followers) ? 0 : (itm.rich / itm.followers) * 100;
          feed.per += (!itm.saving || !itm.followers) ? 0 : (itm.saving / itm.followers) * 100;
          feed.mems ++;
        } else if (itm.rtype === 2) {
          story.inp += itm.inp ? parseInt(itm.inp) : 0;
          story.clicks += itm.click ? parseInt(itm.click) : 0;
          story.staf += itm.stamp ? parseInt(itm.stamp) : 0;
          story.inpper += (!itm.inp || !itm.followers) ? 0 : (itm.inp / itm.followers) * 100;
          story.clickper += (!itm.clicks || !itm.followers) ? 0 : (itm.clicks / itm.followers) * 100;
          story.stafper += (!itm.staf || !itm.followers) ? 0 : (itm.staf / itm.followers) * 100;
          story.mems ++;
        } else if (itm.rtype === 3) {
          ril.rich += itm.rich ? parseInt(itm.rich) : 0;
          ril.savings += itm.saving ? parseInt(itm.saving) : 0;
          ril.normal += itm.normal ? parseInt(itm.normal) : 0;
          ril.richper += (!itm.rich || !itm.followers) ? 0 : (itm.rich / itm.followers) * 100;
          ril.per += (!itm.saving || !itm.followers) ? 0 : (itm.saving / itm.followers) * 100;
          ril.mems ++;
        }
      });

      amount = 0;
      let distinctMems = Array.from(new Set(tmp.map(x => x.accountId)))
        .map(id => {
          amount += parseInt(tmp.find(s => s.accountId === id).amount);
        });

      folvalue = amount / followers;

      amountRef.current.value = formatterInt.format(amount);
      sellRef.current.value = formatterInt.format(sells);
      roasRef.current.value = roas.toFixed(1);
      memsRef.current.value = formatterInt.format(distinctMems.length);
      followersRef.current.value = formatterInt.format(followers);
      followerValRef.current.value = formatter.format(folvalue);
      frichRef.current.value = feed.rich;
      frichPerRef.current.value = feed.mems > 0 ? (feed.richper / feed.mems).toFixed(1) : 0;
      fsavingRef.current.value = feed.savings;
      fsavingPerRef.current.value = feed.mems > 0 ? (feed.per / feed.mems).toFixed(1) : 0;
      fnormalRef.current.value = feed.normal;
      sinpRef.current.value = story.inp;
      sinpPerRef.current.value = story.mems > 0 ? (story.inpper / story.mems).toFixed(1) : 0;
      sclickRef.current.value = story.clicks;
      sclickPerRef.current.value = story.mems > 0 ? (story.clickper / story.mems).toFixed(1) : 0;
      sstampRef.current.value = story.staf;
      sstampPerRef.current.value = story.mems > 0 ? (story.stafper / story.mems).toFixed(1) : 0;
      rrichRef.current.value = ril.rich;
      rrichPerRef.current.value = ril.mems > 0 ? (ril.richper / ril.mems).toFixed(1) : 0;
      rsavingRef.current.value = ril.savings;
      rsavingPerRef.current.value = ril.mems > 0 ? (ril.per / ril.mems).toFixed(1) : 0;
      rnormalRef.current.value = ril.normal;
    }
  }, [staticType, getDatas]);

  return (
    <Paper
      className="detail-section"
      sx={{
        padding: '10px 0',
        position: 'relative'
      }}
    >
      <Button 
        sx={{
          position: 'absolute', 
          right: 20, 
          top: 20,
          color: 'black !important',
          borderRadius: '20px !important',
          border: '1px solid #1377EB'
        }}
      >
        PDF
      </Button>
      <Box sx={{
        display: 'flex', position: 'absolute', right: 20, top: 50, alignItems: 'center', marginTop: '10px'}}
      >
        <Typography className={clsx("text", !staticType ? "auto-manual-caption" : "")}>手動</Typography>
        <PurpleSwitch 
          checked={staticType}
          onChange={e=>switchCustomHandle(e.target.checked)}
        />
        <Typography className={clsx("text", staticType ? "auto-manual-caption" : "")}>自動</Typography>
      </Box>
      <Box className="label-container">
        <Typography className="text">計測期間</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="開始日"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            inputFormat={'yyyy/MM/dd'}
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileDatePicker
            label="終了日"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            inputFormat={'yyyy/MM/dd'}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box className="value-container">
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>金額</Typography>
            <TextField variant="standard" size="small" 
              inputProps={{readOnly: staticType}} inputRef={amountRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>売上</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={sellRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>ROAS</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={roasRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>人数</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={memsRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>フォロワー数</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={followersRef}/>
          </Box>
        )}
        {isLoading ? (
          <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
        ) : (
          <Box>
            <Typography className={classes.staticCaption}>フォロワー単価</Typography>
            <TextField variant="standard" size="small"
              inputProps={{readOnly: staticType}} inputRef={followerValRef}/>
          </Box>
        )}
      </Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className="label-container label-container-nested">
            <Typography className="text">フィード</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="value-container">
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>合計リーチ</Typography>
                <TextField variant="standard" size="small"
                  inputProps={{readOnly: staticType}} inputRef={frichRef}/>
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>平均リーチ%</Typography>
                <TextField variant="standard" size="small"
                  inputProps={{readOnly: staticType}} inputRef={frichPerRef}/>
              </Box>
            )}
            
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>合計保存</Typography>
                <TextField variant="standard" size="small"
                  inputProps={{readOnly: staticType}} inputRef={fsavingRef}/>
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>平均保存%</Typography>
                <TextField variant="standard" size="small"
                  inputProps={{readOnly: staticType}} inputRef={fsavingPerRef}/>
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
            <Typography className={classes.staticCaption}>フォロワー単価</Typography>
              <TextField variant="standard" size="small"
                inputProps={{readOnly: staticType}} inputRef={fnormalRef}/>
                </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className="label-container label-container-nested">
            <Typography className="text">ストーリー</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="value-container">
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>合計インプ</Typography>
                <TextField variant="standard" size="small" 
                  inputProps={{readOnly: staticType}} inputRef={sinpRef}/>
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>平均インプ%</Typography>
                <TextField variant="standard" size="small" 
                  inputProps={{readOnly: staticType}} inputRef={sinpPerRef}/>
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>合計クリック</Typography>
                <TextField variant="standard" size="small" 
                  inputProps={{readOnly: staticType}} inputRef={sclickRef}/>
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>平均クリック%</Typography>
                <TextField variant="standard" size="small" 
                  inputProps={{readOnly: staticType}} inputRef={sclickPerRef}/>
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>合計スタンプ</Typography>
                <TextField variant="standard" size="small" 
                  inputProps={{readOnly: staticType}} inputRef={sstampRef}/>
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>平均スタンプ%</Typography>
                <TextField variant="standard" size="small" 
                  inputProps={{readOnly: staticType}} inputRef={sstampPerRef}/>
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className="label-container label-container-nested">
            <Typography className="text">リール</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="value-container">
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>合計リーチ</Typography>
                <TextField variant="standard" size="small"
                  inputProps={{readOnly: staticType}} inputRef={rrichRef}/>
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>平均リーチ%</Typography>
                <TextField variant="standard" size="small"
                  inputProps={{readOnly: staticType}} inputRef={rrichPerRef}/>
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>合計保存</Typography>
                <TextField variant="standard" size="small"
                  inputProps={{readOnly: staticType}} inputRef={rsavingRef}/>
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>平均保存%</Typography>
                <TextField variant="standard" size="small"
                  inputProps={{readOnly: staticType}} inputRef={rsavingPerRef}/>
              </Box>
            )}
            {isLoading ? (
              <Skeleton width={120} height={40} sx={{transform:'unset'}}/>
            ) : (
              <Box>
                <Typography className={classes.staticCaption}>EG</Typography>
                <TextField variant="standard" size="small"
                  inputProps={{readOnly: staticType}} inputRef={rnormalRef}/>
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
      <AlertDlg 
        title={'注意'} 
        okcaption={staticType === true ? '手動に切り替える' : 'はい'}
        caption={alertcaption}
        dlgState={showAlert}
        closeDlg={closeAlertDlg}
      />
    </Paper>
  );
};