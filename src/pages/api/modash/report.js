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
      return await getReport();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getReport() {
    const {type, userId, userName} = req.body;

    let result = await apiWrapper.get(`${baseUrl}/${type}/profile/${userId}/report`)
    .then(response => {
      return response;
    }).catch(e=>{
      return null;
    });  
    if (result === null || result.error !== false)
      return res.status(200).json({status: 'no'});        

    let lookalikes = await apiWrapper.post(`${baseUrl}/${type}/search`, {
      sort: {},
      page: 0,
      filter: {
        influencer: {
          "relevance": ['@' + userName],
        }
      },
    }).then(response => {
      return response;
    }).catch(e=>{
      return null;
    });  
    if (lookalikes !== null && lookalikes.error === false) {
      result.profile.lookalikes = lookalikes.lookalikes;
    }

    return res.status(200).json({
        status: 'ok',
        data: result
      });  
  }
}
