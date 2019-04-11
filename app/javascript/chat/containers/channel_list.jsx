/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChannel, fetchMessages } from '../actions/index';
import { Link } from 'react-router-dom'; 

class ChannelList extends Component {
  handleClick = (channel) => {
    // this.props.selectChannel()
    this.props.toggleSideBar(!this.props.sidebarState);
    this.props.fetchMessages(channel);
  }

  renderChannel = (channel) => {
    return (
      <div className="channel-container" key={channel} >
        <Link className="channel-link" to={`/channels/${channel}`} onClick={() => this.handleClick(channel)}>
          # {channel}
        </Link>
      </div> 
    );
  }

  render() {
    const { channels } = this.props;
    return (
      <div>
        <div className="navbar"></div>
        <div className="channels">
          <div className="channel-label">Channels</div>
          {channels.map(channel => this.renderChannel(channel))}
        </div>
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
