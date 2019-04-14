import { FETCH_CHANNELS, CHANNEL_CREATED, CHANNEL_APPENDED } from '../actions';

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
    case CHANNEL_APPENDED:
      if (state.map(channel => channel.id).includes(action.payload.id)) {
        return state;
      }
      const copiedChannels = state.slice(0);
      copiedChannels.push(action.payload);
      return copiedChannels;
    default:
      return state;
  }
}
