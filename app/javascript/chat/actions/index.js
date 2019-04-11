/* eslint-disable import/prefer-default-export */
// TODO: add and export your own actions
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const MESSAGE_POSTED = "MESSAGE_POSTED";
export const SELECT_CHANNEL = "SELECT_CHANNEL";
export const FETCH_CHANNEL = "FETCH_CHANNEL";
export const CHANNEL_CREATED = "CHANNEL_CREATED";

const BASE_URL = '/api/v1';

export function fetchMessages(channel) {
  const promise = fetch(`${BASE_URL}/channels/${channel}/messages`, { credentials: "same-origin" })
    .then(response => response.json());
  return {
    type: FETCH_MESSAGES,
    payload: promise
  };
}

export function createMessage(channel, content) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  const body = { content };
  const promise = fetch(`${BASE_URL}/channels/${channel}/messages`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(body)
  }).then(response => response.json());

  return {
    type: MESSAGE_POSTED,
    payload: promise
  };
}


export function fetchChannels() {
  const promise = fetch(`${BASE_URL}/channels`, { credentials: "same-origin" })
    .then(response => response.json());
  return {
    type: FETCH_CHANNELS,
    payload: promise
  };
}


export function createChannel(name, callback) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  const body = { name };
  const promise = fetch(`${BASE_URL}/channels`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
  return {
    type: CHANNEL_CREATED,
    payload: promise
  };
}

export function selectChannel() {
  return {
    type: SELECT_CHANNEL,
    payload: []
  };
}

export function appendMessage(message) {
  return {
    type: MESSAGE_POSTED,
    payload: message
  };
}

export function appendChannel(channel) {
  return {
    type: CHANNEL_CREATED,
    payload: channel
  };
}