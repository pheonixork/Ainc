import getConfig from 'next/config';
import {fetchWrapper} from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/keyaccount`;

export const keyaccountService = {
  newRequest,
  getStatus
};

function newRequest(datas) {
  return fetchWrapper.post(`${baseUrl}`, {datas});
}

function getStatus() {
  return fetchWrapper.get(`${baseUrl}`);
}