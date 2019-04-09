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
      <li key={channel} >
        <Link to={`/channels/${channel}`} onClick={() => this.handleClick(channel)}>
          #{channel}
        </Link>
      </li> 
    );
  }

  render() {
    const { channels } = this.props;
    return (
      <ul className="col-xs-3 left-container">
        {channels.map(channel => this.renderChannel(channel))}
      </ul>
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
