const {User} = require('models');

const UserRepo = {
  getUserByEmail,
  getAllUsers,
  createUser
};

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

async function createUser(company, url, name, phone, email, password, addr) {
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
    addr: addr
  });

  return newUser._id.toString();
}

export default UserRepo;