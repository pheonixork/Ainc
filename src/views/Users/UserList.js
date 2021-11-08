import moment from 'moment'
import _ from 'lodash';
import NextLink from 'next/link';
import React, {useEffect, useState, useMemo} from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import {userService} from 'services';
import Constants from 'constants/constants';
import styles from './styles';

const strPeriod = ['2週間', '単月', '1年', 'カスタム'];
const strPay = ['-', 'クレジットカード', 'カスタム'];

const UserList = () => {
  const [users, setUsers] = useState([]);

  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();

  useEffect(() => {
    userService.getAll()
      .then((response) => {
        if (response.status !== 'ok')
          return;

        let tUsers = _.map(response.users, usr => {
          return {...usr, cdate: moment(usr.cdate).format('YYYY/MM/DD')}
        });

        setUsers([...tUsers]);
      });
  }, []);

  const getPayend = (user) => {
    // if (user.plantype === 'カスタム')
    //   return 'カスタム';

    if (user.plantype === 'Free trial')
      return '-';
     
    return user.payend;
  }

  return (
    <Fixed>
      <Container>
        <Table className="evenoddTable">
          <TableHead>
            <TableRow>
              <TableCell align="center">日付</TableCell>
              <TableCell>会社名</TableCell>
              <TableCell>HP</TableCell>
              <TableCell>担当者名</TableCell>
              <TableCell>電話番号</TableCell>
              <TableCell>メールアドレス</TableCell>
              <TableCell>住所</TableCell>
              <TableCell>契約プラン</TableCell>
              <TableCell>契約月</TableCell>
              <TableCell>決済</TableCell>
              <TableCell>終了予定</TableCell>
              <TableCell>詳細</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(users, (usr, idx) => (
              <TableRow key={idx}>
                <TableCell align="center">{usr.cdate}</TableCell>
                <TableCell align="left" style={{maxWidth:'100px'}} className={classes.ellipseCaption}>{usr.company}</TableCell>
                <TableCell align="left" style={{maxWidth:'150px'}} className={classes.ellipseCaption}>{usr.url}</TableCell>
                <TableCell align="left" style={{maxWidth:'120px'}} className={classes.ellipseCaption}>{usr.name}</TableCell>
                <TableCell align="left" style={{maxWidth:'100px'}} className={classes.ellipseCaption}>{usr.phone}</TableCell>
                <TableCell align="left" style={{maxWidth:'100px'}} className={classes.ellipseCaption}>{usr.email}</TableCell>
                <TableCell align="left" style={{maxWidth:'150px'}} className={classes.ellipseCaption}>{usr.addr}</TableCell>
                <TableCell align="left" style={{maxWidth:'100px'}} className={classes.ellipseCaption}>
                  {usr.plantype}
                </TableCell>
                <TableCell align="left">{strPeriod[usr.periodtype]}</TableCell>
                <TableCell align="left">{strPay[usr.paytype]}</TableCell>
                <TableCell align="left">
                  {getPayend(usr)}
                </TableCell>
                <TableCell>
                  {usr.perms !== Constants.roleInfo.admin && 
                    <NextLink href={`/users/detail/${usr._id}`} passHref replace>
                      詳細
                    </NextLink>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Fixed>
  );
};

export default UserList;
