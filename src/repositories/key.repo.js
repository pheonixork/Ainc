import _ from 'lodash';
const {Keys} = require('models');
const mongoose = require('mongoose');
const toObjectId = mongoose.Types.ObjectId;

const KeyRepo = {
  getStatus,
  setRequest
};

async function getStatus(userId) {
  let record = await Keys.findOne({userId:toObjectId(userId)});
  let status = false;
  if (record && record.status)
    status = true;

  return status;
}

async function setRequest(userId, datas) {  
  let tmp = _.filter(datas, itm=>itm !== '');

  await Keys.create({
    userId: toObjectId(userId),
    IDS: _.map(tmp, itm=> {
      return {key: itm, value: ''}
    }),
    status: true
  });
}

export default KeyRepo;