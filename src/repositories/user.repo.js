const { User } = require('models');

const UserRepo = {
  getUserByEmail,
};

async function getUserByEmail(val) {
  const user = await User.findOne({email:val});
  return user;
}

export default UserRepo;