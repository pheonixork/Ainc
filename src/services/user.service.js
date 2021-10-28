import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
  user: userSubject.asObservable(),
  get userValue () { return userSubject.value },
  login,
  logout,
  createUser,
  getAll
};

function login(username, password) {
  return fetchWrapper.post(`${baseUrl}/authenticate`, {username, password})
    .then(user => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  return fetchWrapper.get(`${baseUrl}/logout`)
    .then(response => {
      localStorage.removeItem('user');
      userSubject.next(null);
    });
}

function createUser(args) {
 return fetchWrapper.post(`${baseUrl}/create`, {...args})
  .then(response => {
    return response;
  }); 
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}
