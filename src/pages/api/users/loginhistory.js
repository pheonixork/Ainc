import {apiHandler} from 'middlewares';
import {UserRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getLoginHistory();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getLoginHistory() {
    const {userId} = req.body;
    let list = await UserRepo.getLoginHistory(userId);

    return res.status(200).json({status:'ok', data:list});
  }
}
