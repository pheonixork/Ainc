import moment from 'moment';
const mongoose = require('mongoose');
const {User, Usage, Plans} = require('models');
const toObjectId = mongoose.Types.ObjectId;

const UserRepo = {
  createUser,
  changePwd,
  getAllUsers,
  getUserByEmail,
  getUserInfo,  
};

async function getUserInfo(id) {
  const user = await User.findOne({_id:toObjectId(id)})
  return user;
}

async function getUserByEmail(val) {
  const user = await User.findOne({email:val});
  return user;
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
        cdate: "$createdAt"
      }
    }
  ]);
  return users;
}

async function changePwd(userId, pwd) {
  await User.updateOne(
    {_id: toObjectId(userId)},
    {$set: {"password": pwd}}
  );
}

async function createUser(company, url, name, phone, email, password, addr, paystart, payend) {
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
    password: password, 
    addr: addr,
    paystart: paystart,
    payend: payend,
  });

  await Usage.create({
    userId: newUser._id,
    history: [{
      historydate: paystart,
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

  return newUser._id.toString();
}

export default UserRepo;