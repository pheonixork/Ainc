const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {CampaignRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await updateMember();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function updateMember() {
    const {campId, step, accountId, status, amount} = req.body;
    
    await CampaignRepo.updateMemberStatus(campId, step, accountId, status, amount);

    return res.status(200).json({status: 'ok'});
  }
}
