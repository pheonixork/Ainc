import getConfig from 'next/config';
import {fetchWrapper} from 'helpers';

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/plans`;

export const planService = {
  getAllPlans,
  savePlan,
};

function savePlan(name, sns, type) {
  return fetchWrapper.post(`${baseUrl}/save`, { name, sns, type })
    .then(response => {
      return response;
    });
}

function getAllPlans() {
  return fetchWrapper.get(`${baseUrl}`);
}
