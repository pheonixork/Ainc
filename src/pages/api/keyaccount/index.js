import {apiHandler} from 'middlewares';
import {KeyRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getRequestStatus();
    case 'POST':
      return await setRequest();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getRequestStatus() {
    let status = await KeyRepo.getStatus(req.user.id);

    return res.status(200).json({status:'ok', isNew:status});
  }

  async function setRequest() {
    const {datas} = req.body;
    let status = await KeyRepo.setRequest(req.user.id, datas);

    return res.status(200).json({status:'ok'});
  }
}
