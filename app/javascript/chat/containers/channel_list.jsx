/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChannel, fetchMessages } from '../actions/index';
import { Link } from 'react-router-dom'; 

class ChannelList extends Component {
  handleClick = (channel) => {
    // this.props.selectChannel()
    this.props.fetchMessages(channel)
  }

  renderChannel = (channel) => {
    return (
      <div key={channel} >
        <Link className="channel-link" to={`/channels/${channel}`} onClick={() => this.handleClick(channel)}>
          #{channel}
        </Link>
      </div> 
    );
  }

  render() {
    const { channels } = this.props;
    return (
      <div className="col-2 left-container">
        <div className="channel-label">Channels</div>
        {channels.map(channel => this.renderChannel(channel))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { selectChannel, fetchMessages },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
