const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {InfluencerRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await saveInfluencer();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function saveInfluencer() {
    const {id, info, cattype, categories} = req.body;
    
    const infId = await InfluencerRepo.saveInfluencer(req.user.id, id, info, cattype, categories);
    if (infId === -1)
      return res.status(200).json({
        status: 'err',
        msg: Lang.communcation_errs.e030
      });   
  
    return res.status(200).json({
      status: 'ok',
      id: infId
    });
  }
}
