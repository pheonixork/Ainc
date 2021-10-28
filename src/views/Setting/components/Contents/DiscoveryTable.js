import _ from 'lodash';
import * as React from 'react';
import {Paper, Box, Table, TableContainer, TableHead, TableBody, TableCell, TableRow} from '@mui/material';
import RoundInfo from 'components/RoundInfo';

const mockdata = [
  {caption: 'Search Pages', en: '8000+ / month', ad: '8000 / month', pe: '5000 / month', es: '1000 / month', tr: '250'},
  {caption: 'Profile summaries', en: '700+ / month', ad: '700 / month', pe: '500 / month', es: '200 / month', tr: '50'},
  {caption: 'Full reports', en: '300+ / month', ad: '300 / month', pe: '100 / month', es: '50 / month', tr: '25'},
  {caption: 'Profiles in CSV exports', en: '700+ / month', ad: '300 / month', pe: '300 / month', es: '50 / month', tr: '25'},
  {caption: 'Contact details', en: 'ok', ad: 'ok', pe: 'ok', es: 'ok', tr: 'ok'},
  {caption: 'API', en: 'ok', ad: '-', pe: '-', es: '-', tr: '-'},
];

export default function DiscoveryTable() {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', boxShadow: 'none !important' }}>
        <TableContainer style={{ padding: '10px 10px 0 10px' }}>
          <Table
            className="styledTable"
            sx={{ Width: 1024 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <TableHead>
              <TableRow sx={{borderBottom: '3px solid #000'}}>
                <TableCell padding='normal' style={{width: '300px'}}>Discovery</TableCell>
                <TableCell padding='normal' style={{width: '150px'}}>Enterprise</TableCell>
                <TableCell padding='normal' style={{width: '150px'}}>Advanced</TableCell>
                <TableCell padding='normal' style={{width: '150px'}}>Performance</TableCell>
                <TableCell padding='normal' style={{width: '150px'}}>Essentials</TableCell>
                <TableCell padding='normal' style={{width: '200px'}}>14-days Free trial</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(mockdata, (row, index) => (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell style={{width: '300px'}}>
                    <Box sx={{display:'flex', alignItems:'center'}}>
                      <span>{row.caption}</span>
                      <RoundInfo marginLeft={1} />
                    </Box>
                  </TableCell>
                  <TableCell style={{width: '150px'}}>
                    {row.en === 'ok' ? 
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      /> : 
                      <span>{row.en}</span>
                    }
                  </TableCell>
                  <TableCell style={{width: '150px'}}>
                    {row.ad === 'ok' ? 
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      /> : 
                      <span>{row.ad}</span>
                    }
                  </TableCell>
                  <TableCell style={{width: '150px'}}>
                    {row.pe === 'ok' ? 
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      /> : 
                      <span>{row.pe}</span>
                    }
                  </TableCell>
                  <TableCell style={{width: '150px'}}>
                    {row.es === 'ok' ? 
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      /> : 
                      <span>{row.es}</span>
                    }
                  </TableCell>
                  <TableCell style={{width: '200px'}}>
                    {row.tr === 'ok' ? 
                      <Box
                        component={'img'}
                        src={'/images/svgs/tick.svg'}
                        marginRight={1.5}
                      /> : 
                      <span>{row.tr}</span>
                    }
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