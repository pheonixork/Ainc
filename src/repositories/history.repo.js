import moment from 'moment';
const mongoose = require('mongoose');
const {User, Usage, History} = require('models');
const toObjectId = mongoose.Types.ObjectId;

const HistoryRepo = {
  getHistory,
  saveCustomHistory
};

async function saveCustomHistory({userId, rowId, historyDate, amount, period, status, pay}) {
  if (rowId === 0)
    await History.updateOne(
      {userId: toObjectId(userId)},
      {$addToSet: {history: {
        historydate: historyDate, 
        paytype: pay,
        periodtype: period,
        plantype: 'カスタム',
        amount: amount,
        status: status,
        memo: 'A操作'
      }}}
    );
  else
    await History.updateOne(
      {userId: toObjectId(userId), 'history._id':toObjectId(rowId)},
      {$set: {history: {
        'history.$.historydate': historyDate, 
        'history.$.paytype': pay,
        'history.$.periodtype': period,
        'history.$.amount': amount,
        'history.$.status': status,
      }}}
    );


  let temp = await History.findOne({userId: toObjectId(userId)});
  let lastRecord = temp.history[temp.history.length - 1];

  return lastRecord._id.toString();
}

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
        memo: '$history.memo'
      }
    }
  ]);

  return history;
}

export default HistoryRepo;