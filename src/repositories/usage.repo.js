import moment from 'moment';
const mongoose = require('mongoose');
const {User, Usage, History, Plans} = require('models');
const toObjectId = mongoose.Types.ObjectId;
import {HistoryRepo} from 'repositories';

const UsageRepo = {
  closeCustom,
  getHistory,
  getPlanUsage,
  getPlanFromCustom,
  savePlan2Custom,
  switchPlan2Custom,
  ChangeUser2Free
};

async function getHistory(userId) {
  temp = await HistoryRepo.getHistory(userId);
  let history = temp.map(itm => {
    return {
      _id: itm._id.toString(),
      historydate: itm.historydate,
      amount: itm.amount,
      periodtype: itm.periodtype,
      paytype: itm.paytype,
      status: itm.status,
      plantype: itm.plantype,
    }
  })

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

  if (info.length < 1)
    return null;

  return info[0];
}

async function ChangeUser2Free(userId, startDate, endDate) {
  await User.updateOne({
    _id: toObjectId(userId)
  },
  {
    $set:{
      'plantype':'Free trial', 
      'paystart':startDate,
      'payend':endDate,
      'periodtype':0,
      'paytype':0,
      'paystatus':0,
    }
  });

  const planRecord = await Plans.findOne({type:'Free trial'});
  await Usage.updateOne(
    {userId: toObjectId(userId)},
    {$addToSet: {history: {
      historydate: startdate, 
      paytype: 0,
      periodtype: 0,
      plantype: 'Free trial',
      amount: 0,
      status: 0,
      pagesplan: planRecord.pages ?? 0,
      pagesuse: 0,
      profiesplan: planRecord.profies ?? 0,
      profiesuse: 0,
      reportsplan: planRecord.reports ?? 0,
      reportsuse: 0,
      csvplan: planRecord.csv ?? 0 ,
      csvuse: 0,
      updatemode: false
    }}}
  );
  
  await History.updateOne(
    {userId: toObjectId(userId)},
    {$addToSet: {history: {
      historydate: startdate, 
      paytype: 0,
      periodtype: 0,
      plantype: 'Free trial',
      amount: 0,
      status: 0
    }}}
  );
}

async function closeCustom({userId, enddate}) {
  let temp = await Usage.findOne({userId: toObjectId(userId)});
  let lastRecord = temp.history.length > 0 ? temp.history[temp.history.length - 1] : null;
  if (lastRecord === null || lastRecord.status === 2 || lastRecord.plantype !== 'カスタム') 
    return;

  await Usage.updateOne(
    {userId: toObjectId(userId), "history._id": toObjectId(lastRecord._id)},
    {$set: {"history.$.status": 2, "history.$.historyend": enddate}}
  );

  // Change to Free trial mode
  await ChangeUser2Free(userId, enddate, moment().add(15, 'days').format('YYYY/MM/DD'));
}

async function savePlan2Custom({userId, search, profile, report, csv, startdate, enddate, usesearch, useprofile, usereport, usecsv, updatemode}) {
  let temp = await Usage.findOne({userId: toObjectId(userId)});
  let lastRecord = temp.history.length > 0 ? temp.history[temp.history.length - 1] : null;
  try {
    if (lastRecord !== null && lastRecord.status < 2 && lastRecord.plantype === 'カスタム') {
      await Usage.updateOne(
        {userId: toObjectId(userId), 'history._id':lastRecord._id},
        {$set: {
          'history.$.historydate': startdate, 
          'history.$.historyend': enddate,
          'history.$.paytype': 2,
          'history.$.periodtype': 3,
          'history.$.plantype': 'カスタム',
          'history.$.amount': 0,
          'history.$.status': 0,
          'history.$.pagesplan': search,
          'history.$.profiesplan': profile,
          'history.$.reportsplan': report,
          'history.$.csvplan': csv,
          'history.$.pagesuse': usesearch === '' ? 0 : usesearch,
          'history.$.profiesuse': useprofile  === '' ? 0 : useprofile,
          'history.$.reportsuse': usereport  === '' ? 0 : usereport,
          'history.$.csvuse': usecsv  === '' ? 0 : usecsv,
          'history.$.updatemode': updatemode
        }});

      await User.updateOne({
        _id: toObjectId(userId)
      },
      {
        $set:{
          'paystart':startdate,
          'payend':enddate,
          "updateMode": updatemode
        }
      });
    }
  } catch (ex) {
    console.log(ex);
  }
}

async function getPlanFromCustom({userId}) {
  let temp = await Usage.findOne({userId: toObjectId(userId)});
  let lastRecord = temp.history.length > 0 ? temp.history[temp.history.length - 1] : null;
  if (lastRecord !== null && lastRecord.status < 2 && lastRecord.plantype === 'カスタム') {
    return {startdate: lastRecord.historydate, 
      enddate: lastRecord.historyend,
      search: lastRecord.pagesplan,
      profile: lastRecord.profiesplan,
      report: lastRecord.reportsplan,
      csv: lastRecord.csvplan,
      usesearch: lastRecord.pagesuse,
      useprofile: lastRecord.profiesuse,
      usereport: lastRecord.reportsuse,
      usecsv: lastRecord.csvuse,
      updatemode: lastRecord.updatemode
    }
  } else {
    return {
      startdate: '', 
      enddate: '',
      search: '',
      profile: '',
      report: '',
      csv: '',
      usesearch: '',
      useprofile: '',
      usereport: '',
      usecsv: '',
      updatemode: ''
    }
  }
}

async function switchPlan2Custom({userId, startdate}) {
  let temp = await Usage.findOne({userId: toObjectId(userId)});
  let lastRecord = temp.history.length > 0 ? temp.history[temp.history.length - 1] : null;
  try {
    if (lastRecord !== null && lastRecord.status < 2) {
      await Usage.updateOne(
        {userId: toObjectId(userId), "history._id": toObjectId(lastRecord._id)},
        {$set: {"history.$.status": 2, "history.$.historyend": startdate}}
      );

      await History.updateOne(
        {userId: toObjectId(userId)},
        {$addToSet: {history: {
          historydate: startdate, 
          paytype: lastRecord.paytype,
          periodtype: lastRecord.periodtype,
          plantype: lastRecord.plantype,
          amount: lastRecord.amount,
          status: 2
        }}}
      );
    }

    await Usage.updateOne(
      {userId: toObjectId(userId)},
      {$addToSet: {history: {
        paytype: 2,
        periodtype: 3,
        plantype: 'カスタム',
        amount: 0,
        status: 0,
        pagesplan: 0,
        profiesplan: 0,
        reportsplan: 0,
        csvplan: 0,
        pagesuse: 0,
        profiesuse: 0,
        reportsuse: 0,
        csvuse: 0,
        updatemode: false
      }}}
    );

    await User.updateOne({
      _id: toObjectId(userId)
    },
    {
      $set:{
        'plantype':'カスタム', 
        'paystart':'',
        'payend':'',
        'periodtype':3,
        'paytype':2,
        'paystatus':0,
      }
    });
  } catch (ex) {
    console.log(ex);
  }
}

export default UsageRepo;