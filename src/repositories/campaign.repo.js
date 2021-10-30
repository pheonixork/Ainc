const mongoose = require('mongoose');
const { Campaign } = require('models');
const toObjectId = mongoose.Types.ObjectId;

const CampaignRepo = {
  getCampaignBrief,
  getCampaignList,
  getDetailViaList,
  getDetailViaPost,
  getDetailViaRport,
  getCampaignDetailList,
  createCampaign,
  updateMemberStatus,
};

async function getCampaignBrief(campId) {
  let record = await Campaign.findOne({_id: toObjectId(campId)});
  return {name: record.name || '', sns: record.sns || '', type: record.type || ''};
}

async function createCampaign(userId, name, sns, type) {
  const existCamp = await Campaign.findOne({userId: toObjectId(userId), name: name});
  if (existCamp)
    return -1;

  let newCamp = await Campaign.create({
    userId: toObjectId(userId),
    name: name,
    sns: sns,
    type: type
  });

  return newCamp._id.toString();
}

async function getDetailViaList(campId) {
  const campInfo = await Campaign.aggregate([
    {
      $match: {_id: toObjectId(campId)}
    },
    {
      $project: 
      {
        name: 1,
        members: 1
      }
    },
  ]);

  if (campInfo.length > 0)
    return campInfo[0];

  return null;
  // const campInfo = await Campaign.aggregate([
  //   {
  //     $match: {_id: toObjectId(campId)}
  //   },
  //   {
  //     $project: {
  //       name: 1,
  //       cmembers: {
  //         $filter: {
  //           input: "$members",
  //           as: "item",
  //           cond: {$and: [{$eq: ["$$item.step", 1]}, {$eq: ["$$item.status", 1]}]},
  //         }
  //       },
  //       imembers: {
  //         $filter: {
  //           input: "$members",
  //           as: "item",
  //           cond: {$and: [{$eq: ["$$item.step", 1]}, {$eq: ["$$item.status", 2]}]},
  //         }
  //       },
  //       nmembers: {
  //         $filter: {
  //           input: "$members",
  //           as: "item",
  //           cond: {$and: [{$eq: ["$$item.step", 1]}, {$eq: ["$$item.status", 3]}]},
  //         }
  //       },
  //       omembers: {
  //         $filter: {
  //           input: "$members",
  //           as: "item",
  //           cond: {$and: [{$eq: ["$$item.step", 1]}, {$eq: ["$$item.status", 4]}]},
  //         }
  //       }
  //     }
  //   },
  //   {
  //     $project: {
  //       name: 1,
  //       cfollowers: {$sum: "$cmembers.followers"},
  //       cmems: { $size: "$cmembers" },
  //       ifollowers: {$sum: "$imembers.followers"},
  //       imems: { $size: "$imembers" },
  //       nfollowers: {$sum: "$nmembers.followers"},
  //       nmems: { $size: "$nmembers" },
  //       ofollowers: {$sum: "$omembers.followers"},
  //       omems: { $size: "$omembers" },
  //       cmembers: 1,
  //       imembers: 1,
  //       nmembers: 1,
  //       omembers: 1
  //     }
  //   }
  // ]);

  // if (campInfo.length > 0)
  //   return campInfo[0];

  // return campInfo;
}

async function getDetailViaPost(campId) {
  const campInfo = await Campaign.aggregate([
    {
      $match: {_id: toObjectId(campId)}
    },
    {
      $project: 
      {
        name: 1,
        members: {
          $filter: {
            input: "$members",
            as: "item",
            cond: {$gt: ["$$item.step", 1]},
          }
        },
      }
    },
  ]);

  if (campInfo.length > 0)
    return campInfo[0];

  return null;
}

async function getDetailViaRport(campId) {
  const campInfo = await Campaign.aggregate([
    {
      $match: {_id: toObjectId(campId)}
    },
    {
      $project: 
      {
        name: 1,
        members: {
          $filter: {
            input: "$members",
            as: "item",
            cond: {$eq: ["$$item.step", 3]},
          }
        },
      }
    },
  ]);

  if (campInfo.length > 0)
    return campInfo[0];

  return null;
}

async function getCampaignDetailList(userId) {
  let list = await Campaign.aggregate([
    {
      $match: {userId: toObjectId(userId)}
    },
    {
      $project: {
        _id: 1,
        name: 1,
        sns: 1,
        type: 1,
        rich: { $sum: "$members.rich" },
        sell: { $sum: "$members.sell" },
        mems: { $size: "$members" },
        cdate: "$createdAt"
      }
    }
  ]);

  return list;
}

async function getCampaignList(userId) {
  let list = await Campaign.aggregate([
    {
      $match: {userId: toObjectId(userId)}
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

async function updateMemberStatus(campId, step, accountId, status, amount) {
  if (step === 1) {
    if (status === 4) {
      await Campaign.updateOne(
        {_id: toObjectId(campId), "members.accountId": toObjectId(accountId)},
        {$set: {"members.$.step": 2, "members.$.status": status, "members.$.pstatus": 1}}
      );
    } else {
      await Campaign.updateOne(
        {_id: toObjectId(campId), "members.accountId": toObjectId(accountId)},
        {$set: {"members.$.step": 1, "members.$.status": status}}
      );
    }
  } else if (step === 2) {
    if (status === 6) {
      await Campaign.updateOne(
        {_id: toObjectId(campId), "members.accountId": toObjectId(accountId)},
        {$set: {"members.$.step": 3, "members.$.pstatus": status, 
              "members.$.amount": amount, "members.$.rtype":0}}
      );
    } else {
      await Campaign.updateOne(
        {_id: toObjectId(campId), "members.accountId": toObjectId(accountId)},
        {$set: {"members.$.step": 2, "members.$.pstatus": status, "members.$.amount": amount}}
      );
    }
  }
}

export default CampaignRepo;