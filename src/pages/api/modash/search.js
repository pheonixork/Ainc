const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import getConfig from 'next/config';
import {apiWrapper} from 'helpers';

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.modashUrl}`;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getSearch();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getSearch() {
    const {type, sort, page, filter} = req.body;
    return apiWrapper.post(`${baseUrl}/${type}/search`, {
      sort: sort,
      page: page,
      filter: {},
    }).then(response => {
      return res.status(200).json({
        status: 'ok',
        data: response
      });  
    }).catch(e=>{
      return res.status(200).json({status: 'no'});  
    });  
  }
}
