import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { CampaignListTable } from './components/Table'
import campaignList from 'mockup/campain_list';

const headCells = [
  {
    id: 'name',
    numeric: false,
    label: 'キャンペー\r\nン名'
  },
  {
    id: 'genre',
    numeric: false,
    label: 'ジャンル',
  },
  {
    id: 'sns',
    numeric: false,
    label: 'SNS',
  },
  {
    id: 'price',
    numeric: true,
    label: '金額',
  },
  {
    id: 'members',
    numeric: true,
    label: '人数',
  },
  {
    id: 'createdDate',
    numeric: true,
    label: '作成日',
  },
  {
    id: 'endDate',
    numeric: true,
    label: '終了日',
  },
  {
    id: 'numberOfReach',
    numeric: true,
    label: 'リーチ数',
  },
  {
    id: 'percentOfReach',
    numeric: true,
    label: 'リーチ%',
  },
  {
    id: 'earnings',
    numeric: true,
    label: '売上',
  },
  {
    id: 'roas',
    numeric: true,
    label: 'ROAS',
  },
  {
    id: 'temp',
    numeric: true,
    label: ' ',
  }
];

const List = () => {
  const router = useRouter();

  const handleSelectChanged = (index) => {
    router.push({
      pathname: '/campaign/detail/' + (index + 1),
    });
  };

  return (
    <Fixed>
      <Container>
        <Box paddingTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
              marginBottom: 4
            }}
          >
            キャンペーンリスト
          </Typography>
          <Button
            component={'a'}
            variant="contained"
            color="primary"
            size="large"
            href={'/campaign/new'}
          >
            新規作成
          </Button>
          <CampaignListTable headCells={headCells} data={campaignList} handleSelectChanged={handleSelectChanged}/>
        </Box>
      </Container>
    </Fixed>
  );
};

export default List;
