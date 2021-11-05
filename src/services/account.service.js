import getConfig from 'next/config';
import {fetchWrapper} from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/influencers`;

export const accountService = {
  getCampaingsDetail,
  getCampaigns,
  updateAccount,
  updateAmongCampiangs,
};

function getCampaingsDetail(id) {
  return fetchWrapper.post(`${baseUrl}/getCampaingsDetail`, {id});
}

function getCampaigns(infId, catType) {
  return fetchWrapper.post(`${baseUrl}/getcampaigns`, {infId, catType});
}

function updateAccount(id, star, memo) {
  return fetchWrapper.post(`${baseUrl}/update`, {id, star, memo});
}

function updateAmongCampiangs(id, cattype, categories) {
  let infname = id;
  return fetchWrapper.post(`${baseUrl}/save`, {id, infname, cattype, categories})
    .then(response => {
      return response;
    });
}
