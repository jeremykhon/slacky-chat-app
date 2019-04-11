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
      App[`channel_${this.props.selectedChannel}`].unsubscribe()
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
            this.fetchMessages(this.props.selectedChannel);
          }
        }
      }
    );
  }

  strToRGB = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
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

  renderNameChunk = (nameChunk, index) => {
    const color = this.strToRGB(nameChunk[0].nickname);
    return (
      <div key={index}>
        <div style={{ color }} className="name-divider">
          {nameChunk[0].nickname}
        </div>
        {nameChunk.map(message => <Message message={message} key={message.id} />)}
      </div>
    )
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
    })
    groupedByName.push(temp)
    
    return groupedByName.map((nameChunk, index) => {
      return (
        this.renderNameChunk(nameChunk, index)   
      )
    })
  }

  renderDateChunk = (dayChunk, index) => {
    if (dayChunk.length > 0) {
      return (
        <div key={index}>
          <div className="date-divider text-center">
            {this.calcLongDate(dayChunk[0])}
          </div>
          {this.groupByName(dayChunk)}
        </div>
      )
    } else {
      return (
        <div key="no-messages"></div>
      )
    }
  }

  groupByDate = (messages) => {
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
      return (
        this.renderDateChunk(dayChunk, index)   
      )
    })
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="col-12 right-container">
        <div className="channel-title">{`#${this.props.selectedChannel}`}</div>
        <div className="message-list" ref={(list) => { this.list = list; }}>
          {this.groupByDate(messages)}
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
