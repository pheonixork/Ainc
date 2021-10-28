import _ from 'lodash';
import React, {useEffect, useState, useMemo} from 'react';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import {Table, TableHead, TableBody, TableRow, TableCell, TextField, Typography, Switch} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonIcon from '@mui/icons-material/RadioButtonUnchecked';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import {planService} from 'services';
import styles from './styles';

const amountFields = ['monthval', 'yearval', 'isfree', 'pages', 'profies', 'reports', 'csv'];
const amountLabels = ['金額/月', '金額/年', 'Free設定', 'ページ検察', 'プロフィール表示', 'フルレポート', 'CSV'];
const checkFields = ['isinsight', 'iscampaign', 'isaccount'];
const checkLabels =  ['インサイトリスト', 'キャンペーンリスト', 'キーアカウント調査'];

const UserSettings = () => {
  const [enterprise, setEnterprise] = useState({});
  const [advanced, setAdvanced] = useState({});
  const [performance, setPerformance] = useState({});
  const [essentials, setEssentials] = useState({});
  const [trial, setTrial] = useState({});

  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();

  useEffect(() => {
    planService.getAllPlans()
      .then((response) => {
        if (response.status !== 'ok')
          return;

        _.map(response.plans, itm => {
          if (itm.type === 'Enterprise')
            setEnterprise(itm);
          else if (itm.type === 'Advanced')
            setAdvanced(itm);
          else if (itm.type === 'Performance')
            setPerformance(itm);
          else if (itm.type === 'Essentials')
            setEssentials(itm);
          else if (itm.type === 'Free trial')
            setTrial(itm);
        })
      });
  }, []);

  return (
    <Fixed>
      <Container>
        <Table style={{width: '900px'}}>
          <TableHead>
            <TableRow>
              <TableCell ></TableCell>
              <TableCell style={{width:'150px'}}>Enterprise</TableCell>
              <TableCell style={{width:'150px'}}>Advanced</TableCell>
              <TableCell style={{width:'150px'}}>Performance</TableCell>
              <TableCell style={{width:'150px'}}>Essentials</TableCell>
              <TableCell style={{width:'100px'}}>Free trial</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {_.map(amountLabels, (itm, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{textAlign:'right'}}>{itm}</TableCell>
                  <TableCell>ask</TableCell>
                  <TableCell>
                    {_.get(advanced, amountFields[idx]) === 0 ? '-' : _.get(advanced, amountFields[idx])}
                  </TableCell>
                  <TableCell>
                      {_.get(performance, amountFields[idx]) === 0 ? '-' : _.get(performance, amountFields[idx])}
                  </TableCell>
                  <TableCell>
                      {_.get(essentials, amountFields[idx]) === 0 ? '-' : _.get(essentials, amountFields[idx])}
                  </TableCell>
                  <TableCell>
                      {_.get(trial, amountFields[idx]) === 0 ? '-' : _.get(trial, amountFields[idx])}
                  </TableCell>
                </TableRow>
              ))}
              {_.map(checkLabels, (itm, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{textAlign:'right'}}>{itm}</TableCell>
                  <TableCell className={classes.switchCell}>
                    <Switch value={_.get(enterprise, checkFields[idx]) === 1 ? 'on' : 'off'} />
                  </TableCell>
                  <TableCell>
                    {_.get(advanced, checkFields[idx]) === 1 ? <RadioButtonIcon /> : <CloseIcon />}
                  </TableCell>
                  <TableCell>
                    {_.get(performance, checkFields[idx]) === 1 ? <RadioButtonIcon /> : <CloseIcon />}
                  </TableCell>
                  <TableCell>
                    {_.get(essentials, checkFields[idx]) === 1 ? <RadioButtonIcon /> : <CloseIcon />}
                  </TableCell>
                  <TableCell>
                    {_.get(trial, checkFields[idx]) === 1 ? <RadioButtonIcon /> : <CloseIcon />}
                  </TableCell>
                </TableRow>
              ))}
            </>
          </TableBody>
        </Table>
      </Container>
    </Fixed>
  );
};

export default UserSettings;
