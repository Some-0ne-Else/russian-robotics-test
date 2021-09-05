import { BASE_URL } from './constants';

const checkRes = (res) => (res.ok
  ? res.json()
  : res.json().then((resJson) => Promise.reject(new Error(resJson))));

export const getUsersReq = () => fetch(`${BASE_URL}/users`).then((res) => checkRes(res));

export const getRolesReq = () => fetch(`${BASE_URL}/roles`).then((res) => checkRes(res));

export const createUserReq = ({
  surname,
  name,
  middleName,
  birthday,
  birthPlace,
  email,
  roleId,
  phoneNumber,
  registerDate,
  lastUpdate,
}) => fetch(`${BASE_URL}/users/`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    surname,
    name,
    middleName,
    birthday,
    birthPlace,
    email,
    roleId,
    phoneNumber,
    registerDate,
    lastUpdate,
  }),
}).then((res) => checkRes(res));

export const updateUserReq = ({
  id,
  surname,
  name,
  middleName,
  birthday,
  birthPlace,
  email,
  roleId,
  phoneNumber,
  registerDate,
  lastUpdate,
}) => fetch(`${BASE_URL}/users/${id}`, {
  method: 'PUT',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    surname,
    name,
    middleName,
    birthday,
    birthPlace,
    email,
    roleId,
    phoneNumber,
    registerDate,
    lastUpdate,
  }),
}).then((res) => checkRes(res));

export const deleteUserReq = ({ id }) => fetch(`${BASE_URL}/users/${id}`, {
  method: 'DELETE',
}).then((res) => checkRes(res));
