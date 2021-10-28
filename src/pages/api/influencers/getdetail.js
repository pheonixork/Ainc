const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {InfluencerRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getInfluencer();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getInfluencer() {
    const {id} = req.body;
    
    const influencer = await InfluencerRepo.getInfluencer(req.user.id, id);
    return res.status(200).json({
      status: 'ok',
      data: influencer
    });
  }
}
