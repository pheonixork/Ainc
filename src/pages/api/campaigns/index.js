import { apiHandler } from 'helpers/api';
import CampaignRepo from 'repositories/campaign.repo';

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getCampaigns();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getCampaigns() {
    let list = await CampaignRepo.getCampaignList();

    return res.status(200).json({list});
  }
}
