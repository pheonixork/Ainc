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
      return await getLocations();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getLocations() {
    const {type} = req.body;

    return apiWrapper.get(`${baseUrl}/${type}/locations`
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
