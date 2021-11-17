import _ from 'lodash';
import moment from 'moment';
const mongoose = require('mongoose');
const { Campaign } = require('models');
const toObjectId = mongoose.Types.ObjectId;

const CampaignRepo = {
  addNewReportMember,
  addNewReportYoutubeMember,
  addNewReportTiktokMember,
  getCampaignBrief,
  getCampaignList,
  getDetailViaList,
  getDetailViaPost,
  getDetailViaRport,
  getCampaignDetailList,
  createCampaign,
  updateMemberAmount,
  updateMemberStatus,
  updateMemberReport,
  updateMemberYoutube,
  updateMemberTiktok
};

async function getCampaignBrief(campId) {
  let record = await Campaign.findOne({_id: toObjectId(campId)});
  return {name: record.name || '', sns: record.sns || '', type: record.type || '', userId: record.userId.toString() || ''};
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

async function updateMemberAmount(campId, memId, amount) {
  await Campaign.updateOne(
    {_id: toObjectId(campId), "members._id": toObjectId(memId)},
    {$set: {"members.$.amount": amount}}
  );
}

async function updateMemberStatus(campId, step, memId, status) {
  if (step === 1) {
    if (status === 4) {
      await Campaign.updateOne(
        {_id: toObjectId(campId), "members._id": toObjectId(memId)},
        {$set: {"members.$.step": 2, "members.$.status": status, "members.$.pstatus": 1}}
      );
    } else {
      await Campaign.updateOne(
        {_id: toObjectId(campId), "members._id": toObjectId(memId)},
        {$set: {"members.$.step": 1, "members.$.status": status}}
      );
    }
  } else if (step === 2) {
    if (status === 6) {
      await Campaign.updateOne(
        {_id: toObjectId(campId), "members._id": toObjectId(memId)},
        {$set: {"members.$.step": 3, "members.$.pstatus": status, "members.$.rtype":0}}
      );
    } else {
      await Campaign.updateOne(
        {_id: toObjectId(campId), "members._id": toObjectId(memId)},
        {$set: {"members.$.step": 2, "members.$.pstatus": status}}
      );
    }
  }
}

async function addNewReportMember(campId, memId, rtype) {
  let oldMem = await Campaign.aggregate([
    {
      $match: {
        _id: toObjectId(campId),
      }
    },
    {
      $unwind: {
        path:"$members"
      }
    },
    {
      $match: {
        "members._id": toObjectId(memId)
      }
    },
    {
      $project: {
        members: 1
      }
    }
  ]);

  let temp = {};
  _.map(oldMem[0].members, (val, key) => {
    if (key === '_id')
      return;

    if (key === 'accountId')
      _.set(temp, key, toObjectId(val));
    else if (key === 'postAt')
      _.set(temp, key, moment(val).format('YYYY/MM/DD'));
    else
      _.set(temp, key, val);
  });
  temp.rtype = 0;
  let pMemo = temp.memo ? temp.memo : '';
  temp.memo = memId;

  let result = '';
  try {
    result = await Campaign.updateOne(
      {_id: toObjectId(campId)},
      {$addToSet: {members: temp}}
    );

    let newMem = await Campaign.aggregate([
      {$match: {_id: toObjectId(campId),}},
      {$unwind: {path:"$members"}},
      {$match: {"members.memo": memId}},
      {$project: {members: 1}}
    ]);

    result = newMem[0]._id.toString();

    await Campaign.updateOne(
      {_id: toObjectId(campId), "members._id": newMem._id},
      {$set: {"members.$.memo": pMemo}}
    );
  } catch(ex) {
    result = '';
  }
  
  return result;
}

async function addNewReportYoutubeMember(campId, memId) {
  let oldMem = await Campaign.aggregate([
    {
      $match: {
        _id: toObjectId(campId),
      }
    },
    {
      $unwind: {
        path:"$members"
      }
    },
    {
      $match: {
        "members._id": toObjectId(memId)
      }
    },
    {
      $project: {
        members: 1
      }
    }
  ]);

  let temp = {};
  _.map(oldMem[0].members, (val, key) => {
    if (key === '_id')
      return;

    if (key === 'accountId')
      _.set(temp, key, toObjectId(val));
    else if (key === 'postAt')
      _.set(temp, key, moment(val).format('YYYY/MM/DD'));
    else
      _.set(temp, key, val);
  });
  let pMemo = temp.memo ? temp.memo : '';
  temp.memo = memId;

  let result = '';
  try {
    result = await Campaign.updateOne(
      {_id: toObjectId(campId)},
      {$addToSet: {members: temp}}
    );

    let newMem = await Campaign.aggregate([
      {$match: {_id: toObjectId(campId),}},
      {$unwind: {path:"$members"}},
      {$match: {"members.memo": memId}},
      {$project: {members: 1}}
    ]);

    result = newMem[0]._id.toString();

    await Campaign.updateOne(
      {_id: toObjectId(campId), "members._id": newMem._id},
      {$set: {"members.$.memo": pMemo}}
    );
  } catch(ex) {
    result = '';
  }
  
  return result;
}

async function addNewReportTiktokMember(campId, memId) {
  let oldMem = await Campaign.aggregate([
    {
      $match: {
        _id: toObjectId(campId),
      }
    },
    {
      $unwind: {
        path:"$members"
      }
    },
    {
      $match: {
        "members._id": toObjectId(memId)
      }
    },
    {
      $project: {
        members: 1
      }
    }
  ]);

  let temp = {};
  _.map(oldMem[0].members, (val, key) => {
    if (key === '_id')
      return;

    if (key === 'accountId')
      _.set(temp, key, toObjectId(val));
    else if (key === 'postAt')
      _.set(temp, key, moment(val).format('YYYY/MM/DD'));
    else
      _.set(temp, key, val);
  });
  let pMemo = temp.memo ? temp.memo : '';
  temp.memo = memId;

  let result = '';
  try {
    result = await Campaign.updateOne(
      {_id: toObjectId(campId)},
      {$addToSet: {members: temp}}
    );

    let newMem = await Campaign.aggregate([
      {$match: {_id: toObjectId(campId),}},
      {$unwind: {path:"$members"}},
      {$match: {"members.memo": memId}},
      {$project: {members: 1}}
    ]);

    result = newMem[0]._id.toString();

    await Campaign.updateOne(
      {_id: toObjectId(campId), "members._id": newMem._id},
      {$set: {"members.$.memo": pMemo}}
    );
  } catch(ex) {
    result = '';
  }
  
  return result;
}

async function updateMemberReport(campId, memId, rtype, detail) {
  if (rtype === 0) {  // move 2 candidate
    await Campaign.updateOne(
      {_id: toObjectId(campId)},
      {$pull: {members: {_id: toObjectId(memId)}}}
    );

    return;
  }

  if (rtype === 1) { // update feed's value}
    await Campaign.updateOne(
      {_id: toObjectId(campId), "members._id": toObjectId(memId)},
      {$set: {
        "members.$.rtype": 1,
        "members.$.postAt": detail.postAt,
        "members.$.postLink": detail.postLink,
        "members.$.shopping": detail.shopping,
        "members.$.rich": detail.rich,
        "members.$.oks": detail.oks,
        "members.$.comment": detail.comment,
        "members.$.sell": detail.sell,
      }}
    );
  } else if (rtype === 2) { // update story's value}
    await Campaign.updateOne(
      {_id: toObjectId(campId), "members._id": toObjectId(memId)},
      {$set: {
        "members.$.rtype": 2,
        "members.$.postAt": detail.postAt,
        "members.$.postLink": detail.postLink,
        "members.$.shopping": detail.shopping,
        "members.$.inp": detail.inp,
        "members.$.click": detail.click,
        "members.$.stamp": detail.stamp,
        "members.$.sell": detail.sell,
      }}
    );
  } else if (rtype === 3) { // update ril's value}
    await Campaign.updateOne(
      {_id: toObjectId(campId), "members._id": toObjectId(memId)},
      {$set: {
        "members.$.rtype": 3,
        "members.$.postAt": detail.postAt,
        "members.$.postLink": detail.postLink,
        "members.$.shopping": detail.shopping,
        "members.$.rich": detail.rich,
        "members.$.saving": detail.saving,
        "members.$.oks": detail.oks,
        "members.$.comment": detail.comment,
        "members.$.sell": detail.sell,
      }}
    );
  }
}

async function updateMemberYoutube(campId, memId, detail) {
  if (detail === undefined) {
    await Campaign.updateOne(
      {_id: toObjectId(campId)},
      {$pull: {members: {_id: toObjectId(memId)}}}
    );
    return;
  }

  await Campaign.updateOne(
    {_id: toObjectId(campId), "members._id": toObjectId(memId)},
    {$set: {
      "members.$.postAt": detail.postAt,
      "members.$.postLink": detail.postLink,
      "members.$.shopping": detail.shopping,
      "members.$.prs": detail.prs,
      "members.$.good": detail.good,
      "members.$.bad": detail.bad,
      "members.$.comment": detail.comment,
      "members.$.click": detail.click,
      "members.$.cv": detail.cv,
      "members.$.sell": detail.sell,
    }}
  );
}

async function updateMemberTiktok(campId, memId, detail) {
  if (detail === undefined) {
    await Campaign.updateOne(
      {_id: toObjectId(campId)},
      {$pull: {members: {_id: toObjectId(memId)}}}
    );
    return;
  }

  await Campaign.updateOne(
    {_id: toObjectId(campId), "members._id": toObjectId(memId)},
    {$set: {
      "members.$.postAt": detail.postAt,
      "members.$.postLink": detail.postLink,
      "members.$.shopping": detail.shopping,
      "members.$.prs": detail.prs,
      "members.$.oks": detail.oks,
      "members.$.comment": detail.comment,
      "members.$.sell": detail.sell,
      "members.$.share": detail.share,
    }}
  );
}

export default CampaignRepo;