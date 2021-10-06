import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/campaigns`;
const userInfo = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const campaingService = {
  user: userSubject.asObservable(),
  get userValue () { return userSubject.value },
  getCampaignList,
  createCampaign,
};

function createCampaign(name, sns, type) {
  return fetchWrapper.post(`${baseUrl}/create`, { name, sns, type })
    .then(response => {
      if (response.status === 'ok') {
        return response.id;
      } else {
        return response.message;
      }
    });
}

function getCampaignList() {
  return fetchWrapper.get(baseUrl);
}
