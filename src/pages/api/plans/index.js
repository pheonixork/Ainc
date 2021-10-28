import {apiHandler} from 'middlewares';
import {PlansRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getAll();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getAll() {
    let list = await PlansRepo.getPlans();

    return res.status(200).json({status:'ok', plans:list});
  }
}
