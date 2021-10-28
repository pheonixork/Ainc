import getConfig from 'next/config';
import {fetchWrapper} from 'helpers';

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/plans`;

export const planService = {
  getAllPlans,
  savePlans,
};

function savePlans(enterprise, advanced, performance, essentials, trial) {
  return fetchWrapper.post(`${baseUrl}/update`, {
    enterprise, advanced, performance, essentials, trial
  }).then(response => {
    return response;
  });
}

function getAllPlans() {
  return fetchWrapper.get(`${baseUrl}`);
}
