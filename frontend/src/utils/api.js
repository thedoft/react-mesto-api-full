import { handlePromiseRes } from './utils';

export const BASE_URL = 'https://api.thedoft.mesto.students.nomoredomains.rocks';
export const headers = {
  'Content-Type': 'application/json; charset=utf-8',
};

export function register({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
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

export function signout() {
  return fetch(`${BASE_URL}/signout`, {
    headers,
    credentials: 'include',
  })
    .then((res) => handlePromiseRes(res))
}

export function getUserData() {
  return fetch(`${BASE_URL}/users/me`, {
    headers,
    credentials: 'include',
  })
    .then((res) => handlePromiseRes(res))
}

export function patchUserProfile({ name, about }) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      name,
      about
    })
  })
  .then(res => handlePromiseRes(res))
}

export function patchUserAvatar({ avatar }) {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      avatar
    })
  })
  .then(res => handlePromiseRes(res))
}

export function getInitialCards() {
  return fetch(`${BASE_URL}/cards`, {
    headers,
    credentials: 'include',
  })
  .then(res => handlePromiseRes(res))
}

export function addNewCard({ name, link }) {
  return fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(res => handlePromiseRes(res))
}

export function deleteCard({ _id }) {
  return fetch(`${BASE_URL}/cards/${_id}`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  })
  .then(res => handlePromiseRes(res))
}

export function changeLikeCardStatus({ _id }, method) {
  return fetch(`${BASE_URL}/cards/${_id}/likes`, {
    method,
    headers,
    credentials: 'include',
  })
  .then(res => handlePromiseRes(res))
}
