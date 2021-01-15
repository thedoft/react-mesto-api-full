import { handlePromiseRes } from './utils';

export const BASE_URL = 'https://auth.nomoreparties.co';
export const headers = {
  'Content-Type': 'application/json'
};

export function register({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password
    }),
  })
    .then((res) => handlePromiseRes(res))
}

export function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password
    }),
    credentials: 'include',
  })
    .then((res) => handlePromiseRes(res))
}

export function getContent() {
  return fetch(`${BASE_URL}/users/me`, {
    headers,
    credentials: 'include',
  })
    .then((res) => handlePromiseRes(res))
}
