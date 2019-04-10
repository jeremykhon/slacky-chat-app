import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMessages, appendMessage } from '../actions/index';
import Message from '../components/message';
import MessageForm from './message_form';

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
    }
  }

  componentDidUpdate() {
    this.list.scrollTop = this.list.scrollHeight;
  }

  fetchMessages = () => {
    this.props.fetchMessages(this.props.selectedChannel);
  }

  subscribeActionCable = (props) => {
    App[`channel_${props.selectedChannel}`] = App.cable.subscriptions.create(
      { channel: 'ChannelsChannel', name: props.selectedChannel },
      {
        received: (message) => {
          if (message.channel === props.selectedChannel) {
            props.appendMessage(message);
          }
        }
      }
    );
  }

  calcDate = (message) => {
    if (message === undefined) {
      return null;
    }
    const date = new Date(message.created_at).toLocaleDateString([], {year: '2-digit', month:'2-digit', day:'2-digit'})
    return date
  }

  calcLongDate = (message) => {
    if (message === undefined) {
      return null;
    }
    const date = new Date(message.created_at).toLocaleDateString([], {year: '2-digit', month:'short', day:'2-digit', weekday:'long'})
    return date
  }

  groupByDateName = (messages) => {
    const groupedByDate = []
    let temp = []
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
    })
    groupedByDate.push(temp)
    
    return groupedByDate.map((dayChunk, index) => {
      console.log(dayChunk)
      return (
        <div key={index}>
          <div className="date-divider text-center">
            {this.calcLongDate(dayChunk[0])}
          </div>
          {dayChunk.map(message => <Message message={message} key={message.id} />)}
        </div>
      )
    })
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="col-10 right-container">
        <div className="channel-title">{`#${this.props.selectedChannel}`}</div>
        <div className="message-list" ref={(list) => { this.list = list; }}>
          {this.groupByDateName(messages)}
        </div>
        {<MessageForm selectedChannel={this.props.selectedChannel}/>}
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
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
