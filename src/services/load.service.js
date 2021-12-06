import getConfig from 'next/config';

import {fetchWrapper} from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/load`;

export const loadService = {
  getlastupdated,
};

function getlastupdated() {
  return fetchWrapper.get(`${baseUrl}/lastupdated`);
}
