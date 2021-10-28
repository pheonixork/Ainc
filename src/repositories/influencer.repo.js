import _ from 'lodash';
import moment from 'moment';
const mongoose = require('mongoose');
const {Influencers, Campaign} = require('models');
const toObjectId = mongoose.Types.ObjectId;
import Constants from 'constants/constants';
import Lang from 'constants/lang';

const InfluencerRepo = {
  getInfluencer,
  getInfluencers,
  updateInfluencer,
  saveInfluencer,
};

async function getInfluencer(userId, accountId) {
  let record = await Influencers.findOne({userId: toObjectId(userId), _id: toObjectId(accountId)});
  return record;
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

async function saveInfluencer(userId, infId, infName, catType, categories) {
  let oldInflu = await Influencers.findOne({userId: toObjectId(userId), infId: infId, type: catType});
  let differs = categories;
  try {
    if (oldInflu) {
      let existsCamps = _.map(oldInflu.campaigns, itm=>{return itm.toString()});
      let differs = _.difference(existsCamps, categories);
      // remove member from omit campaigns
      for (let cmp in differs) {
        await Campaign.updateOne(
          {_id: toObjectId(differs[cmp])},
          {$pull: {members: {accountId: oldInflu._id}}}
        );
      }

      differs = _.difference(categories, existsCamps);
    } else {
      // add new influencer
      oldInflu =  await Influencers.create({
        userId: toObjectId(userId),
        infId: infId,
        name: infName,
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
        {$addToSet: {members: {accountId: oldInflu._id, name: infName}}}
      );
    }

  } catch (err) {
    throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e039};
  }

  return oldInflu._id.toString();
}

export default InfluencerRepo;