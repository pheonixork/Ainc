import _ from 'lodash';
import * as React from 'react';
import {Paper, Box, Table, TableContainer, TableHead, TableBody, TableCell, TableRow} from '@mui/material';
import RoundInfo from 'components/RoundInfo';

export default function RecommendTable() {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', boxShadow: 'none !important' }}>
        <TableContainer style={{ padding: '0 10px 0 10px'}}>
          <Table
            className="styledTable"
            sx={{ Width: 1024 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <TableHead>
              <TableRow sx={{borderBottom: '3px solid #000'}}>
                <TableCell padding='normal' style={{width: '300px'}}>Recommended for...</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                hover
              >
                <TableCell style={{width: '300px'}}>
                </TableCell>
                <TableCell style={{width: '150px', verticalAlign: 'top'}}>
                  <span>{'If you need more than the standard plans offer or want to talk to the sales team to get more information,book a call'}</span>
                </TableCell>
                <TableCell style={{width: '150px', verticalAlign: 'top'}}>
                  <span>{'This plan is best for teams who have scaled influencer marketing and are using Modash to optimize existing processes.'}</span>
                </TableCell>
                <TableCell style={{width: '150px', verticalAlign: 'top'}}>
                  <span>{'This plan is your best bet for scaling up. Perfect if you have one person dedicated to influencer marketing.'}</span>
                </TableCell>
                <TableCell style={{width: '150px', verticalAlign: 'top'}}>
                  <span>{'Best if you have some experience working with influencers and now want to increase your efforts.'}</span>
                </TableCell>
                <TableCell style={{width: '200px', verticalAlign: 'top'}}>
                  <span>{'Just checking out the platform.'}</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}