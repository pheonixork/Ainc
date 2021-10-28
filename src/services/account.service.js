import getConfig from 'next/config';
import {fetchWrapper} from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/influencers`;

export const accountService = {
  getDetail,
  updateAccount,
  saveAccount,
};

function getDetail(id) {
  return fetchWrapper.post(`${baseUrl}/getdetail`, {id});
}

function updateAccount(id, star, memo) {
  return fetchWrapper.post(`${baseUrl}/update`, {id, star, memo});
}

function saveAccount(id, cattype, categories) {
  let infname = id;
  return fetchWrapper.post(`${baseUrl}/save`, {id, infname, cattype, categories})
    .then(response => {
      return response;
    });
}
