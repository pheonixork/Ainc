import {apiHandler} from 'middlewares';
import CampaignRepo from 'repositories/campaign.repo';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getCampaigns();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getCampaigns() {
    const userId = req.query.userId;

    let list = await CampaignRepo.getCampaignList(userId);

    return res.status(200).json({status:'ok', list:list});
  }
}
