import moment from 'moment';
const mongoose = require('mongoose');
const {User, Usage, History} = require('models');
const toObjectId = mongoose.Types.ObjectId;

const HistoryRepo = {
  getHistory,
};

async function getHistory(userId) {
  let history = await History.aggregate([
    {
      $match: {
        userId: toObjectId(userId),
      }
    },
    {
      $unwind: {
        path:"$history"
      }
    },
    {
      $project: {
        _id: '$history._id',
        historydate: '$history.historydate',
        amount: '$history.amount',
        periodtype: '$history.periodtype',
        status: '$history.status',
        paytype: '$history.paytype',
        plantype: '$history.plantype',
      }
    }
  ]);

  return history;
}

export default HistoryRepo;