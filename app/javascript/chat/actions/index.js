/* eslint-disable import/prefer-default-export */
// TODO: add and export your own actions
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const MESSAGE_POSTED = "MESSAGE_POSTED";
export const SELECT_CHANNEL = "SELECT_CHANNEL";


export function fetchMessages(channel) {
  const promise = fetch(`https://wagon-chat.herokuapp.com/${channel}/messages`)
    .then(response => response.json());
  return {
    type: FETCH_MESSAGES,
    payload: promise
  };
}

export function createMessage(channel, author, content) {
  const body = { author, content };
  const promise = fetch(`https://wagon-chat.herokuapp.com/${channel}/messages`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json());

  return {
    type: MESSAGE_POSTED,
    payload: promise
  };
}

export function selectChannel(channel) {
  return {
    type: SELECT_CHANNEL,
    payload: channel
  };
}
