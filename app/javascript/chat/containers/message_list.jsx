import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMessages, appendMessage } from '../actions/index';
import Message from '../components/message';
import MessageForm from './message_form';
import GifsContainer from './gifs_container';

class MessageList extends Component {
  componentWillMount() {
    this.fetchMessages();
  }

  componentDidMount() {
    this.subscribeActionCable(this.props);
  }

  componentWillReceiveProps(nextProps) { // For after switching channels
    if (this.props.selectedChannel != nextProps.selectedChannel) {
      this.subscribeActionCable(nextProps);
      App[`channel_${this.props.selectedChannel}`].unsubscribe();
    }
  }

  componentDidUpdate() {
    this.list.scrollTop = this.list.scrollHeight;
  }

  fetchMessages = () => {
    const { fetchMessages, selectedChannel } = this.props;
    fetchMessages(selectedChannel);
  }

  subscribeActionCable = (props) => {
    App[`channel_${props.selectedChannel}`] = App.cable.subscriptions.create(
      { channel: 'ChannelsChannel', name: props.selectedChannel },
      {
        received: (message) => {
          if (message.channel === props.selectedChannel) {
            this.props.appendMessage(message);
          }
        },
      },
    );
  }

  calcDate = (message) => {
    if (message === undefined) {
      return null;
    }
    const date = moment(message.created_at).format('YYYYMMDD');
    return date;
  }

  renderNameChunk = (nameChunk, index) => {
    const color = strToRGB(nameChunk[0].nickname);
    return (
      <div key={index}>
        <div style={{ color }} className="name-divider">
          {nameChunk[0].nickname}
        </div>
        {nameChunk.map(message => <Message message={message} key={message.id} />)}
      </div>
    );
  }

  groupByName = (dayChunk) => {
    const groupedByName = []
    let temp = []
    dayChunk.forEach((message, index) => {
      if (index === 0) {
        temp.push(message);
      } else if (message.nickname !== dayChunk[index-1].nickname) {
        groupedByName.push(temp);
        temp = [];
        temp.push(message);
      } else {
        temp.push(message);
      }
    });
    groupedByName.push(temp);

    return groupedByName.map((nameChunk, index) => (
      this.renderNameChunk(nameChunk, index)
    ));
  }

  renderDateChunk = (dayChunk, index) => {
    if (dayChunk.length > 0) {
      return (
        <div key={index}>
          <div className="date-divider text-center">
            {moment(dayChunk[0]).format('ddd, Do MMM YY')}
          </div>
          {this.groupByName(dayChunk)}
        </div>
      );
    }
    return (
      <div key="no-messages" />
    );
  }

  groupByDate = (messages) => {
    const groupedByDate = [];
    let temp = [];
    messages.forEach((message, index) => {
      if (index === 0) {
        temp.push(message);
      } else if (this.calcDate(message) !== this.calcDate(messages[index-1])) {
        groupedByDate.push(temp);
        temp = [];
        temp.push(message);
      } else {
        temp.push(message);
      }
    });
    groupedByDate.push(temp);

    return groupedByDate.map((dayChunk, index) => (
      this.renderDateChunk(dayChunk, index)
    ));
  }

  render() {
    const { messages, selectedChannel } = this.props;
    return (
      <div className="messages-container">
        <div className="channel-title">{`#${selectedChannel}`}</div>
        <div className="message-list" ref={(list) => { this.list = list; }}>
          {this.groupByDate(messages)}
        </div>
        <GifsContainer />
        <MessageForm selectedChannel={selectedChannel} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchMessages, appendMessage },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
