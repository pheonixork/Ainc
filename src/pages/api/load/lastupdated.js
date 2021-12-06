const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {UpdateRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getlastupdated();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getlastupdated() {
    const result = await UpdateRepo.getlast();
    return res.status(200).json({data: result});
  }
}
