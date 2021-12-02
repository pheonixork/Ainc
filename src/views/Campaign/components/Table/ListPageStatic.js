/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from 'react';
import {Button, Box, Paper, Skeleton} from '@mui/material';
// import {pdf} from '@react-pdf/renderer';
// import {saveAs} from 'file-saver';
// import {ListPagePDF} from '../Pdf/';
// import {PDFDownloadLink, Page, Font, Text, View, StyleSheet } from '@react-pdf/renderer';

const ListPageStatic = ({isloading, updatedInfos, downloadPDF}) => {
  const formatterInt = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0});
  const [staticInfo, setStaticInfo] = useState({mems:0, oks: 0, okfols: 0, memfols: 0, imems: 0, cmems: 0, nmems:0});

  useEffect(() => {
    let datas = updatedInfos();
    if (!datas || datas.length < 1)
      return;

    let oks = 0, okfols = 0, cmems = 0, imems = 0, nmems = 0, fols = 0;
    _.map(datas, itm => {
      if (itm.status === 1) { //社内確認中
        cmems ++;
      } else if (itm.status === 2) { //交渉中
        imems ++;
      } else if (itm.status === 3) { //NG
        nmems ++;
      } else { //OK
        oks ++;
        okfols += itm.followers;
      }

      fols += itm.followers;
    });

    setStaticInfo({mems: datas.length, oks: oks, okfols: okfols, memfols: fols, imems: imems, cmems: cmems, nmems: nmems});
  }, [updatedInfos]);

  return (
    <Paper
      sx={{
        padding: '10px 0',
        position: 'relative'
      }}
    >
      {/*
      <PDFDownloadLink document={<ListPagePDF />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
      const doc = <ListPagePDF />;
          const asPdf = pdf([]); // {} is important, throws without an argument
          asPdf.updateContainer(doc);
          const blob = await asPdf.toBlob();
          saveAs(blob, 'リストページ.pdf');
      */}
      <Button 
        sx={{
          position: 'absolute', 
          right: 20, 
          top: 20,
          color: 'black !important',
          borderRadius: '20px !important',
          border: '1px solid #1377EB'
        }}
        // onClick={e=>downloadPDF()}
      >
        CSV
      </Button>
      <Box className='valueItemContainer'>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{formatterInt.format(staticInfo.mems)}</p>
          )}
          <p className='title'>人数</p>
        </Box>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{formatterInt.format(staticInfo.memfols)}</p>
          )}
          <p className='title'>リストフォロワー</p>
        </Box>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{formatterInt.format(staticInfo.oks)}</p>
          )}
          <p className='title'>OK人数</p>
        </Box>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{formatterInt.format(staticInfo.okfols)}</p>
          )}
          <p className='title'>OKフォロワー</p>
        </Box>
      </Box>
      <Box className='valueItemContainer'>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{formatterInt.format(staticInfo.cmems)}</p>
          )}
          <p className='title'>社内確認中</p>
        </Box>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{formatterInt.format(staticInfo.imems)}</p>
          )}
          <p className='title'>交渉中</p>
        </Box>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{formatterInt.format(staticInfo.nmems)}</p>
          )}
          <p className='title'>NG</p>
        </Box>
        <Box className='valueItem'>
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{margin:'auto'}}/>
          ) : (
            <p className='value'>{formatterInt.format(staticInfo.oks)}</p>
          )}
          <p className='title'>OK</p>
        </Box>
      </Box>
    </Paper>
  );
};

export default ListPageStatic;
