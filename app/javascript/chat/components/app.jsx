import React from 'react';
import MessageList from '../containers/message_list';
import ChannelList from '../containers/channel_list';

const App = () => {
  return (
    <div className="row app">
      <ChannelList selectedChannel={props.match.params.channel} />
      <MessageList selectedChannel={props.match.params.channel} />
    </div>
  );
};

export default App;
