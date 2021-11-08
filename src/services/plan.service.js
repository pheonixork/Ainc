import getConfig from 'next/config';
import {fetchWrapper} from 'helpers';

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/plans`;

export const planService = {
  closeCustom,
  getAllPlans,
  savePlans,
  switchToCustom,
};

function closeCustom(userId, enddate) {
  return fetchWrapper.post(`${baseUrl}/closecustom`, {userId, enddate});
}

function getAllPlans() {
  return fetchWrapper.get(`${baseUrl}`);
}

function savePlans(enterprise, advanced, performance, essentials, trial) {
  return fetchWrapper.post(`${baseUrl}/update`, {
    enterprise, advanced, performance, essentials, trial
  }).then(response => {
    return response;
  });
}

function switchToCustom(userId, search, profile, report, csv, startdate, enddate, usesearch, useprofile, usereport, usecsv) {
  return fetchWrapper.post(`${baseUrl}/switchtocustom`, {userId, search, profile, report, csv, startdate, enddate, usesearch, useprofile, usereport, usecsv});
}


