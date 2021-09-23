import React, { useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { EnhancedTable } from './components/Table'

const List = () => {
  const theme = useTheme();
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
          <EnhancedTable />
        </Box>
      </Container>
    </Fixed>
  );
};

export default List;
