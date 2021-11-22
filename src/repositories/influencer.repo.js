import _ from 'lodash';
import moment from 'moment';
const mongoose = require('mongoose');
const {Influencers, Campaign} = require('models');
const toObjectId = mongoose.Types.ObjectId;
import {CampaignRepo} from '.';
import Constants from 'constants/constants';
import Lang from 'constants/lang';

const InfluencerRepo = {
  getUsersCampaings,
  getInfluencers,
  getCampaignsWithInfId,
  updateInfluencer,
  saveInfluencer,
};

async function getUsersCampaings(userId, accountId) {
  let list = await Influencers.aggregate([
    {
      $match: {
        userId: toObjectId(userId), 
        _id: toObjectId(accountId)
      }
    },
    {
      $project: {
        _id: 0,
        infId: 1, 
        type: 1,
        name: 1,
        email: 1,
        link: 1,
        star: 1,
        memo: 1,
        campaigns:1
      }
    },
    {
      $unwind: {
        path:"$campaigns"
      }
    },
    {
      $lookup: {
        from: 'campaigns',
        localField: 'campaigns',
        foreignField: '_id',
        as: 'camp_doc'
      }
    },
    {
      $unwind: {
        path: "$camp_doc"
      }
    },
    {
      $project: {
        cid: "$campaigns",
        infId: 1,
        type: 1,
        name: 1,
        email: 1,
        link: 1,
        star: 1,
        memo: 1,
        cname: "$camp_doc.name",
        csns: "$camp_doc.sns",
        ctype: "$camp_doc.type",
        cmems: {$size:"$camp_doc.members"},
        cdate: "$camp_doc.createdAt",
      }
    }
  ]);

  return list;
}

async function getCampaignsWithInfId(userId, infId, catType) {
  let record = await Influencers.findOne({userId: toObjectId(userId), infId: infId});
  let selected = record && record.campaigns ? record.campaigns : [];

  const cmpList = await CampaignRepo.getCampaignList(userId);
  let results = !cmpList ? [] : _.filter(cmpList, itm => itm.sns === catType);
  results = _.map(results, itm => {
    return {id: itm._id.toString(), name: itm.name, sns: itm.sns, type: itm.type, mems: itm.mems};
  });

  return {campaigns: results, selected: selected};
}

async function getInfluencers(userId, catType='') {
  let matchCondition = {userId: toObjectId(userId)};
  if (catType !== '')
    matchCondition.type = catType;

  let list = await Influencers.aggregate([
    {
      $match: matchCondition
    },
    {
      $project: {
        _id: 1,
        infId: 1,
        name: 1,
        email: 1,
        link: 1,
        type: 1,
        star: 1,
        followers: 1,
        engage: 1,
        cdate: '$createdAt'
      }
    }
  ]).then((response) => {
    let results = _.map(response, itm => {
      return {...itm, _id: itm._id.toString(), cdate: moment(itm.cdate).format('YYYY/M/D')};
    });

    return results;
  });

  return list;
}

async function updateInfluencer(userId, id, star, memo) {
  let oldInfluencer = await Influencers.findOne({_id: toObjectId(id), userId: toObjectId(userId)});
  if (oldInfluencer && oldInfluencer.campaigns) {
    for (let i = 0; i < oldInfluencer.campaigns.length; i ++) {
      await Campaign.updateOne(
        {_id: oldInfluencer.campaigns[i], "members.accountId": toObjectId(id)},
        {$set: {"members.$.star": star, "members.$.memo": memo}}
      );
    }
  }
  
  await Influencers.updateOne(
    {
      _id: toObjectId(id),
      userId: toObjectId(userId),
    },
    {
      star: star,
      memo: memo
    });

  return true;
}

async function saveInfluencer(userId, infId, info, catType, categories) {
  let oldInflu = await Influencers.findOne({userId: toObjectId(userId), infId: infId, type: catType});
  let differs = categories;

  try {
    if (oldInflu) {
      let existsCamps = _.map(oldInflu.campaigns, itm=>{return itm.toString()});
      differs = _.difference(existsCamps, categories);
      // remove member from omit campaigns
      for (let cmp in differs) {
        await Campaign.updateOne(
          {_id: toObjectId(differs[cmp])},
          {$pull: {members: {accountId: oldInflu._id}}}
        );
      }

      differs = _.difference(categories, existsCamps);
      await Influencers.updateOne(
        {_id:oldInflu._id},
        {$set: {campaigns: _.map(categories, itm => {return toObjectId(itm)})}}
      );
    } else {
      // add new influencer
      oldInflu =  await Influencers.create({
        userId: toObjectId(userId),
        infId: infId,
        name: info.profile.fullname,
        link: info.profile.url,
        followers: info.profile.followers,
        engage: info.profile.engagement,
        avatar: info.profile.picture,
        type: catType,
        campaigns: _.map(categories, itm => {
          return toObjectId(itm);
        })
      });
    }

    // add member to new campaigns
    for (let cmp in differs) {
      await Campaign.updateOne(
        {_id: toObjectId(differs[cmp])},
        {$addToSet: {
          members: {
            accountId: oldInflu._id, 
            infId: infId, 
            name: oldInflu.name,
            link: oldInflu.link,
            followers: oldInflu.followers,
            engage: oldInflu.engage,
            avatar: oldInflu.avatar
          }}
        }
      );
    }

  } catch (err) {
    throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e039};
  }

  return oldInflu._id.toString();
}

export default InfluencerRepo;