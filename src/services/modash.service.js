import moment from 'moment';
import getConfig from 'next/config';
import {fetchWrapper} from 'helpers';

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/modash`;

export const modashService = {
  getAccounts,
  getProfileOverview,
  getProfileReport,
  getInterests,
  getLanguages,
  getLocations,
};

function getAccounts(type, page, sort, filter) {
  return fetchWrapper.post(`${baseUrl}/search`, {
    type, sort, page, filter
  });
}

function getProfileOverview(userId, type) {
  return fetchWrapper.post(`${baseUrl}/overview`, {type, userId});
}

function getProfileReport(userId, userName, type) {
  return fetchWrapper.post(`${baseUrl}/report`, {type, userId, userName});
}

function getInterests(type) {
  return fetchWrapper.post(`${baseUrl}/interests`, {type});  
}

function getLanguages(type) {
  return fetchWrapper.post(`${baseUrl}/languages`, {type});   
}

function getLocations(type, keyword) {
  return fetchWrapper.post(`${baseUrl}/locations`, {type, keyword});   
}