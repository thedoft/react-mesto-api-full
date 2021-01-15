import { handlePromiseRes } from './utils';

export const BASE_URL = 'https://mesto.nomoreparties.co/v1/cohort-16';
export const headers = {
  authorization: '9dad3ee9-138f-48bd-8014-b648376a609a',
  'Content-Type': 'application/json'
};

export function getUserData() {
  return fetch(`${BASE_URL}/users/me`, {
    headers
  })
  .then(res => handlePromiseRes(res))
}

export function getInitialCards() {
  return fetch(`${BASE_URL}/cards`, {
    headers
  })
  .then(res => handlePromiseRes(res))
}

export function patchUserProfile({ name, about }) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers,
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
    body: JSON.stringify({
      avatar
    })
  })
  .then(res => handlePromiseRes(res))
}

export function addNewCard({ name, link }) {
  return fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    headers,
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
    headers
  })
  .then(res => handlePromiseRes(res))
}

export function changeLikeCardStatus({ _id }, method) {
  return fetch(`${BASE_URL}/cards/likes/${_id}`, {
    method: method,
    headers,
  })
  .then(res => handlePromiseRes(res))
}
