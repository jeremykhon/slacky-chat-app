/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import ChannelForm from './channel_form';
import {
  selectChannel, fetchMessages, createChannel, appendChannel,
} from '../actions/index';
import { logout } from '../api';

const style = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: '3',

  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#212326',
    border: 'none',
    padding: '30px 25px',
  },
};

class ChannelList extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };
  }

  componentDidMount() {
    this.subscribeActionCable(this.props);
  }


  subscribeActionCable = (props) => {
    App[`channel_all_channel`] = App.cable.subscriptions.create(
      { channel: 'AllChannelsChannel' },
      {
        received: (channel) => {
          props.appendChannel(channel);
        },
      },
    );
  }

  openModal = () => {
    this.props.toggleSideBar(!this.props.sidebarState);
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  handleClick = (channel) => {
    // this.props.selectChannel()
    this.props.toggleSideBar(!this.props.sidebarState);
    this.props.fetchMessages(channel.name);
  }

  renderChannel = (channel) => {
    return (
      <div className="channel-container" key={channel.id} >
        <Link className="channel-link" to={`/channels/${channel.name}`} onClick={() => this.handleClick(channel)}>
          # {channel.name}
        </Link>
      </div>
    );
  }

  render() {
    const { channels } = this.props;
    return (
      <div className="left-container">
        <div className="navbar" />
        <div className="channels">
          <div className="channel-label-container">
            <div className="channel-label">Channels</div>
            <i className="fas fa-plus-circle" onClick={this.openModal} style={{cursor: 'pointer'}} />
          </div>
          {channels.map(channel => this.renderChannel(channel))}
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            style={style}
            ariaHideApp={false}
          >
            <ChannelForm closeModal={this.closeModal} />
          </Modal>
        </div>
        <div className="logout">
          <button className="logout-button" type="button" onClick={logout}>Sign out</button>
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
    {
      selectChannel, fetchMessages, createChannel, appendChannel,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
