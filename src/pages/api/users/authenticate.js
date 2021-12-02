const md5 = require('md5');
const jwt = require('jsonwebtoken');
import moment from 'moment';
import getConfig from 'next/config';
import dbConnect from 'middlewares/mongodb-handler';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {UserRepo} from 'repositories';
import {withSession} from 'middlewares';

const {serverRuntimeConfig} = getConfig();

export default withSession(async (req, res) => {
  let isDBConnect = await dbConnect();
  if (!isDBConnect) {
    return res.status(Constants.errors.forbidden).json({ message: Lang.communcation_errs.e005 });
  }

  switch (req.method) {
    case 'POST':
      return await authenticate();
    default:
      return res.status(Constants.errors.badrequest).json({ message: Lang.communcation_errs.e005 });
  }

  async function authenticate() {
    const { username, password, loginAt } = req.body;
    
    const userInfo = await UserRepo.getUserByEmail(username);
    if (!userInfo) 
      return res.status(Constants.errors.badrequest).json({ message: Lang.communcation_errs.e001 });  

    if (userInfo.password !== md5(password))
      return res.status(Constants.errors.badrequest).json({ message: Lang.communcation_errs.e003 });  
  
    // create a jwt token that is valid for 1 day
    const token = jwt.sign({user: userInfo._id.toString(), role: userInfo.perms}, serverRuntimeConfig.secret, { expiresIn: '1d' });

    console.log('[authenticate] : Before save ' + userInfo._id.toString());

    req.session.set('user', {id: userInfo._id.toString(), role: userInfo.perms});
    await req.session.save();

    console.log('[authenticate] : After save');

    // set login history
    await UserRepo.updateLoginAt(userInfo._id, loginAt);

    const utcCreated = moment.utc(moment(userInfo.createdAt)).format('YYYY-MM-DD HH:mm:ss');

    // return basic user details and token
    return res.status(200).json({
      id: userInfo._id.toString(),
      isInsight: true,
      isCampaign: true,
      role: userInfo.perms,
      username: userInfo.name,
      email: userInfo.email,
      createdTime: moment(utcCreated).format("x"),
      token
    });
  }
})