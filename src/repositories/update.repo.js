import _ from 'lodash';
import moment from 'moment';
const mongoose = require('mongoose');
const {UpdateHistory} = require('models');
const toObjectId = mongoose.Types.ObjectId;
import Constants from 'constants/constants';
import Lang from 'constants/lang';

const UpdateRepo = {
  getlast,
};

async function getlast() {
  let record = await UpdateHistory.find().sort({'updated': -1}).limit(1);
  if (record.length < 1)
    return '';

  return record[0].updated;
}

export default UpdateRepo;