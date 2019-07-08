/* eslint-disable no-case-declarations */
import { FETCH_MESSAGES, MESSAGE_POSTED, SELECT_CHANNEL, CHANNEL_CREATED } from "../actions";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_MESSAGES:
      return action.payload;
    case MESSAGE_POSTED:
      if (state.map(message => message.id).includes(action.payload.id)) {
        return state;
      }
      const copiedState = state.slice(0);
      copiedState.push(action.payload);
      return copiedState;
    case SELECT_CHANNEL:
      return action.payload;
    case CHANNEL_CREATED:
      return [];
    default:
      return state;
  }
}
