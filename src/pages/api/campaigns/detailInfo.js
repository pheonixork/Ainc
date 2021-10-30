const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {CampaignRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getCampaignDetailList();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getCampaignDetailList() {
    const {campId, type} = req.body;
    
    let campInfo;

    if (type === 'list')
      campInfo = await CampaignRepo.getDetailViaList(campId);
    else if (type === 'post')
      campInfo = await CampaignRepo.getDetailViaPost(campId);
    else if (type === 'report')
      campInfo = await CampaignRepo.getDetailViaRport(campId);

    return res.status(200).json({
      status: 'ok',
      data: campInfo
    });
  }
}
