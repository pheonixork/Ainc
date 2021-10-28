import {apiHandler} from 'middlewares';
import {UserRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getAllUsers();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getAllUsers() {
    let list = await UserRepo.getAllUsers();

    return res.status(200).json({status:'ok', users:list});
  }
}
