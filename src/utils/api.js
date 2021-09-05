import { BASE_URL } from './constants';

const checkRes = (res) => {
  console.log(res);
  return res.ok ? res.json() : res.json().then((resJson) => Promise.reject(new Error(resJson)));
};

export const getUsersReq = () => fetch(`${BASE_URL}/users`)
  .then((res) => checkRes(res));

export const getRolesReq = () => fetch(`${BASE_URL}/roles`)
  .then((res) => checkRes(res));

export const loginReq = ({ email, password }) => fetch(`${BASE_URL}/login`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then((res) => checkRes(res));
