const md5 = require('md5');
import moment from 'moment';
const mongoose = require('mongoose');
const {History, User, Usage, Plans, LoginHistory} = require('models');
const toObjectId = mongoose.Types.ObjectId;

const UserRepo = {
  createUser,
  changePwd,
  getAllUsers,
  getLoginHistory,
  getUserByEmail,
  getUserInfo,  
  updateLoginAt,
  updateUser
};

async function getUserInfo(id) {
  const user = await User.findOne({_id:toObjectId(id)})
  return user;
}

async function getUserByEmail(val) {
  const user = await User.findOne({email:val});
  return user;
}

async function getLoginHistory(userId) {
  const record = await LoginHistory.findOne({_id:toObjectId(userId)});
  if (!record)
    return [];
  return record.history;
}

async function getAllUsers() {
  let users = await User.aggregate([
    {
      $project: {
        name: 1,
        email: 1,
        password: 1,
        company: 1,
        url: 1,
        addr: 1,
        phone: 1,
        plantype: 1,
        periodtype: 1,
        paytype: 1,
        payend: 1,
        perms: 1,
        loginAt: 1,
        cdate: "$createdAt"
      }
    }
  ]);
  return users;
}

async function changePwd(userId, pwd) {
  await User.updateOne(
    {_id: toObjectId(userId)},
    {$set: {"password": md5(pwd)}}
  );
}

async function updateLoginAt(userId, loginAt) {
  await User.updateOne(
    {_id: userId},
    {$set: {"loginAt": loginAt}}
  );

  await LoginHistory.updateOne(
    {_id: userId},
    {$addToSet: {history: loginAt}},
    {upsert:true}
  );
}

async function updateUser(userId, {company, url, name, phone, email, addr, password}) {
  let obj = {name: name, email: email, company: company, url: url, addr: addr, phone: phone};
  if (password) {
    obj.password = md5(password);
  }

  await User.updateOne(
    {_id: toObjectId(userId)},
    {$set: obj}
  );
}

async function createUser(company, url, name, phone, email, password, addr, paystart, payend) {
  let newId = -9;

  try {
    const planRecord = await Plans.findOne({type:'Free trial'});
    if (!planRecord)
      return -2;
    

    const existUser = await User.findOne({email: email});
    if (existUser)
      return -1;

    let newUser = await User.create({
      company: company, 
      url: url, 
      name: name, 
      phone: phone, 
      email: email, 
      password: md5(password), 
      addr: addr,
      paystart: paystart,
      payend: payend,
      paystatus: 0,
    });

    await Usage.create({
      userId: newUser._id,
      history: [{
        historydate: paystart,
        historyend: payend,
        status: 0,
        pagesplan: planRecord.pages ?? 0,
        pagesuse: 0,
        profiesplan: planRecord.profies ?? 0,
        profiesuse: 0,
        reportsplan: planRecord.reports ?? 0,
        reportsuse: 0,
        csvplan: planRecord.csv ?? 0 ,
        csvuse: 0,
        }],
    });

    await History.create({
      userId: newUser._id,
      history: [{
        historydate: paystart,
        status: 0,
      }]
    });

    newId = newUser._id.toString();
  } catch (e) {
    return -9;
  }

  return newId;
}

export default UserRepo;