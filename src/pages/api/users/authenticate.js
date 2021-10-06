const jwt = require('jsonwebtoken');
import getConfig from 'next/config';
import { apiHandler } from 'middlewares';

import dbConnect from 'middlewares/mongodb-handler';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import UserRepo from 'repositories/user.repo';

const { serverRuntimeConfig } = getConfig();

export default apiHandler(handler);

async function handler(req, res) {
  let isDBConnect = await dbConnect();
  if (!isDBConnect) {
    throw {status: Constants.errors.forbidden, message: Lang.communcation_errs.e005};
  }

  switch (req.method) {
    case 'POST':
      return await authenticate();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function authenticate() {
    const { username, password } = req.body;
    
    const userInfo = await UserRepo.getUserByEmail(username);
    if (!userInfo) throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e001};
  
    // create a jwt token that is valid for 1 day
    const token = jwt.sign({ sub: userInfo._id.toString() }, serverRuntimeConfig.secret, { expiresIn: '1d' });
  
    // return basic user details and token
    return res.status(200).json({
      id: userInfo._id.toString(),
      username: userInfo.name,
      token
    });
  }
}
