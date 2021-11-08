import moment from 'moment';
const mongoose = require('mongoose');
const {User, Usage} = require('models');
const toObjectId = mongoose.Types.ObjectId;

const UsageRepo = {
  closeCustom,
  getHistory,
  getPlanUsage,
  switchPlan2Custom
};

async function getHistory(userId) {
  let history = await Usage.aggregate([
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

async function getPlanUsage(userId, historyDate) {
  let info = await Usage.aggregate([
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
      $match: {
        'history.historydate': historyDate,
        'history.status': {$lt: 2}
      }
    },
    {
      $project: {
        pagesplan: '$history.pagesplan', 
        pagesuse: '$history.pagesuse',
        profiesplan: '$history.profiesplan', 
        profiesuse: '$history.profiesuse',
        reportsplan: '$history.reportsplan', 
        reportsuse: '$history.reportsuse',
        csvplan: '$history.csvplan', 
        csvuse: '$history.csvuse'
      }
    }
  ]);

  return info[0];
}

async function closeCustom({userId, enddate}) {
  let temp = await Usage.findOne({userId: toObjectId(userId)});
  let lastRecord = temp.history.length > 0 ? temp.history[temp.history.length - 1] : null;
  if (lastRecord === null || lastRecord.status === 2 || lastRecord.plantype !== 'カスタム') 
    return;

  await Usage.updateOne(
    {userId: toObjectId(userId)},
    {$addToSet: {history: {
      historydate: enddate, 
      paytype: lastRecord.paytype,
      periodtype: lastRecord.periodtype,
      plantype: lastRecord.plantype,
      amount: lastRecord.amount,
      status: 2,
      pagesplan: 0,
      profiesplan: 0,
      reportsplan: 0,
      csvplan: 0,
      pagesuse: 0,
      profiesuse: 0,
      reportsuse: 0,
      csvuse: 0
    }}}
  );

  await User.updateOne({
    _id: toObjectId(userId)
  },
  {
    $set:{
      'plantype':'Free trial', 
      'paystart':enddate,
      'periodtype':0,
      'paytype':0
    }
  });
}

async function switchPlan2Custom({userId, search, profile, report, csv, startdate, enddate, usesearch, useprofile, usereport, usecsv}) {
  let temp = await Usage.findOne({userId: toObjectId(userId)});
  let lastRecord = temp.history.length > 0 ? temp.history[temp.history.length - 1] : null;
  if (lastRecord !== null && lastRecord.status <= 2) {
    await Usage.updateOne(
      {userId: toObjectId(userId)},
      {$addToSet: {history: {
        historydate: startdate, 
        paytype: lastRecord.paytype,
        periodtype: lastRecord.periodtype,
        plantype: lastRecord.plantype,
        amount: lastRecord.amount,
        status: 2,
        pagesplan: 0,
        profiesplan: 0,
        reportsplan: 0,
        csvplan: 0,
        pagesuse: 0,
        profiesuse: 0,
        reportsuse: 0,
        csvuse: 0
      }}}
    );
  }
  await Usage.updateOne(
    {userId: toObjectId(userId)},
    {$addToSet: {history: {
      historydate: startdate, 
      paytype: 2,
      periodtype: 3,
      plantype: 'カスタム',
      amount: 0,
      status: 0,
      pagesplan: search,
      profiesplan: profile,
      reportsplan: report,
      csvplan: csv,
      pagesuse: usesearch === '' ? 0 : usesearch,
      profiesuse: useprofile  === '' ? 0 : useprofile,
      reportsuse: usereport  === '' ? 0 : usereport,
      csvuse: usecsv  === '' ? 0 : usecsv
    }}}
  );

  await User.updateOne({
      _id: toObjectId(userId)
    },
    {
      $set:{
        'plantype':'カスタム', 
        'paystart':startdate,
        'payend':enddate,
        'periodtype':3,
        'paytype':2
      }
    });
}

export default UsageRepo;