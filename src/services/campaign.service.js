import getConfig from 'next/config';

import {fetchWrapper} from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/campaigns`;

export const campaignService = {
  createCampaign,
  getCampagin,
  getCampaignDetail,
  getCampaignList,
  updateMemberStatus
};

function createCampaign(name, sns, type) {
  return fetchWrapper.post(`${baseUrl}/create`, { name, sns, type })
    .then(response => {
      return response;
    });
}

function getCampagin(campId) {
  return fetchWrapper.post(`${baseUrl}/detail`, {campId});
}

function getCampaignDetail(campId, type) {
  return fetchWrapper.post(`${baseUrl}/detailInfo`, {campId, type});
}

function getCampaignList(userId) {
  return fetchWrapper.get(`${baseUrl}?userId=${userId}`);
}

function updateMemberStatus(campId, step, accountId, status, amount=0) {
  return fetchWrapper.post(`${baseUrl}/updatememberstatus`, {campId, step, accountId, status, amount});
}
