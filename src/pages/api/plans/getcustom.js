import {apiHandler} from 'middlewares';
import {UsageRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getCustom();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getCustom() {    
    let result = await UsageRepo.getPlanFromCustom(req.body);

    return res.status(200).json({status:'ok', data:result});
  }
}
