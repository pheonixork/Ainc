const mongoose = require('mongoose');
const { Campaign } = require('models');

const CampaignRepo = {
  getCampaignList,
};

async function getCampaignList(userId) {
  let list = await Campaign.aggregate([
    {
      $match: {userId: mongoose.Types.ObjectId(userId)}
    },
    {
      $project: {
        _id: 1,
        name: 1,
        sns: 1,
        type: 1,
        mems: { $size: "$members" }
      }
    }
  ]);

  return list;
}

export default CampaignRepo;