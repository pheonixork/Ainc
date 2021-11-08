import getConfig from 'next/config';

import {fetchWrapper} from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/campaigns`;

export const campaignService = {
  addNewReport,
  addNewReportYoutube,
  addNewReportTiktok,
  createCampaign,
  getCampagin,
  getCampaignDetail,
  getCampaignList,
  updateMemberAmount,
  updateMemberStatus,
  updateReport,
  updateReportYoutube,
  updateReportTiktok
};

function addNewReport(campId, memId, rtype) {
  return fetchWrapper.post(`${baseUrl}/addnewreport`, {campId, memId, rtype});
}

function addNewReportYoutube(campId, memId) {
  return fetchWrapper.post(`${baseUrl}/addnewreportyoutube`, {campId, memId});
}

function addNewReportTiktok(campId, memId) {
  return fetchWrapper.post(`${baseUrl}/addnewreporttiktok`, {campId, memId});
}

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

function updateMemberAmount(campId, memId, amount) {
  return fetchWrapper.post(`${baseUrl}/updatememberamount`, {campId, memId, amount});
}

function updateMemberStatus(campId, step, memId, status) {
  return fetchWrapper.post(`${baseUrl}/updatememberstatus`, {campId, step, memId, status});
}

function updateReport(campId, memId, rtype, detail={}) {
  return fetchWrapper.post(`${baseUrl}/updateReport`, {campId, memId, rtype, detail});
}

function updateReportYoutube(campId, memId, detail=undefined) {
  return fetchWrapper.post(`${baseUrl}/updateReportYoutube`, {campId, memId, detail});
}

function updateReportTiktok(campId, memId, detail=undefined) {
  return fetchWrapper.post(`${baseUrl}/updateReportTiktok`, {campId, memId, detail});
}