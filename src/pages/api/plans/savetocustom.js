import {apiHandler} from 'middlewares';
import {UsageRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await save2Custom();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function save2Custom() {    
    await UsageRepo.savePlan2Custom(req.body);

    return res.status(200).json({status:'ok'});
  }
}
