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
      return await getLanguages();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getLanguages() {
    const {type} = req.body;

    return apiWrapper.get(`${baseUrl}/${type}/languages`
    ).then(response => {
      return res.status(200).json({
        status: 'ok',
        data: response
      });  
    }).catch(e=>{
      console.log(e);
    });  
  }
}
