import moment from 'moment';
import getConfig from 'next/config';
import {fetchWrapper} from 'helpers';

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/test`;

export const testService = {
  getInterests,
};

function getInterests(type) {
  return fetchWrapper.get(`${baseUrl}/interests`);  
}

