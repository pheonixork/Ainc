import {apiHandler} from 'middlewares';
import {HistoryRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await saveCustomHistory();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function saveCustomHistory() {    
    let result = await HistoryRepo.saveCustomHistory(req.body);

    return res.status(200).json({status:'ok', data:result});
  }
}
