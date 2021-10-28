import React from 'react';
import PropTypes from 'prop-types'
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import {CampaignListTable} from './components/Table'

const List = ({campaigns}) => {
  const router = useRouter();
  const handleSelectChanged = (rowId) => {
    router.push({
      pathname: `/campaign/detail/${rowId}`,
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
          <NextLink
            href={'/campaign/new'}
            passHref
            replace
          >
            <Button
              component={'a'}
              variant="contained"
              color="primary"
              size="large"
            >
              新規作成
            </Button>
          </NextLink>
          <CampaignListTable 
            data={campaigns} 
            handleSelectChanged={handleSelectChanged} 
          />
        </Box>
      </Container>
    </Fixed>
  );
};

List.propTypes = {
  campaigns: PropTypes.array,
}

export default List;
