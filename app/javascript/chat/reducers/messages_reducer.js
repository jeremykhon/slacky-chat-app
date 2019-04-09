/* eslint-disable no-case-declarations */
import { FETCH_MESSAGES, MESSAGE_POSTED } from "../actions";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_MESSAGES:
      return action.payload.messages;
    case MESSAGE_POSTED:
      const copiedState = state.slice(0);
      copiedState.push(action.payload);
      return copiedState;
    default:
      return state;
  }
}
