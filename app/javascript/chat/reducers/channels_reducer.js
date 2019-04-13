import { FETCH_CHANNELS, CHANNEL_CREATED } from '../actions';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_CHANNELS:
      return action.payload;
    case CHANNEL_CREATED:
      if (state.map(channel => channel.id).includes(action.payload.id)) {
        return state;
      }
      const copiedState = state.slice(0);
      copiedState.push(action.payload);
      return copiedState;
    default:
      return state;
  }
}
