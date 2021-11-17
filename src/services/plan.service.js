import getConfig from 'next/config';
import {fetchWrapper} from 'helpers';

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/plans`;

export const planService = {
  closeCustom,
  getAllPlans,
  getUserInfo,
  getUsage,
  getCustomInfo,
  getHistory,
  savePlans,
  switchToCustom,
  saveToCustom,
  saveCustomHistory,
};

function getUsage(userId) {
  return fetchWrapper.post(`${baseUrl}/getusage`, {userId});
}

function getUserInfo(userId) {
  return fetchWrapper.post(`${baseUrl}/getuserinfo`, {userId}); 
}

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

function switchToCustom(userId, startdate) {
  return fetchWrapper.post(`${baseUrl}/switchtocustom`, {userId, startdate});
}

function saveToCustom(userId, search, profile, report, csv, startdate, enddate, usesearch, useprofile, usereport, usecsv, updatemode) {
  return fetchWrapper.post(`${baseUrl}/savetocustom`, {userId, search, profile, report, csv, startdate, enddate, usesearch, useprofile, usereport, usecsv, updatemode});
}

function getCustomInfo(userId) {
  return fetchWrapper.post(`${baseUrl}/getcustom`, {userId});
}

function getHistory(userId) {
  return fetchWrapper.post(`${baseUrl}/gethistory`, {userId});
}

function saveCustomHistory(userId, data, rowId) {
  return fetchWrapper.post(`${baseUrl}/savecustomhistory`, {userId, rowId, ...data});
}