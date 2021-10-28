import _ from 'lodash';
import NextLink from 'next/link'
import * as React from 'react';
import {Paper, Box, Table, TableContainer, TableHead, TableBody, TableCell, TableRow} from '@mui/material';

export default function BillListTable({data}) {
  return (
    <Box sx={{ width: '100%' }} data-aos={'fade-up'} >
      <Paper sx={{ width: '100%', mt: 2, mb: 2, overflow: 'auto', boxShadow: 'none !important' }}>
        <TableContainer style={{ padding: 10 }}>
          <Table
            className="styledTable"
            sx={{ Width: 1024 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <TableHead>
              <TableRow>
                <TableCell padding='normal' style={{width: '250px'}}>Invoice Number</TableCell>
                <TableCell padding='normal' style={{width: '200px'}}>Billing date</TableCell>
                <TableCell padding='normal' style={{width: '120px'}}>Amount</TableCell>
                <TableCell padding='normal' style={{width: '100px'}}>Status</TableCell>
                <TableCell padding='normal' style={{width: '200px'}}>Receipt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(data, (row, index) => (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell style={{width: '250px'}}>{row.inumber}</TableCell>
                  <TableCell style={{width: '200px'}}>{row.bdate}</TableCell>
                  <TableCell style={{width: '120px'}}>${row.amount}</TableCell>
                  <TableCell style={{width: '100px'}}>{row.status}</TableCell>
                  <TableCell style={{width: '200px'}}>
                    <NextLink
                      href="#"
                      component={'a'}
                    >
                      Download receipt
                    </NextLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}