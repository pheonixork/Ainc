import moment from 'moment';
import getConfig from 'next/config';
import {apiWrapper} from 'helpers';

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.modashUrl}`;

export const modashService = {
  getInstagramAccounts,
  getYoutubeAccounts,
  getTiktokAccounts,
};

function getInstagramAccounts(page, sort, filter) {
  return apiWrapper.post(`${baseUrl}/instagram/search`, {
    sort: sort,
    page: page,
    filter: {
      
    }
  });
}

function getYoutubeAccounts(page, sort, filter) {
  return apiWrapper.post(`${baseUrl}/youtube/search`, {
    sort: sort,
    page: page,
    filter: {
      
    }
  });
}

function getTiktokAccounts(page, sort, filter) {
  return apiWrapper.post(`${baseUrl}/tiktok/search`, {
    sort: sort,
    page: page,
    filter: {
      
    }
  });
}