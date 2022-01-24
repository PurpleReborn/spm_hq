import { storageKeys } from 'libs/keys';

export const setUserToken = (value) => {
  localStorage.setItem(storageKeys.token, value);
};

export const getUserToken = () => {
  const serialize = localStorage.getItem(storageKeys.token);
  return serialize || '';
};
