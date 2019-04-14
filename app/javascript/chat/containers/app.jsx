import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import MessageList from './message_list';
import ChannelList from './channel_list';
import logo from '../../../assets/images/logo.png';

const mql = window.matchMedia('(min-width: 800px)');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    return (
      <Sidebar
        sidebar={<ChannelList sidebarState={this.state.sidebarOpen} toggleSideBar={this.onSetSidebarOpen} selectedChannel={this.props.match.params.channel} />}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        transitions={true}
        styles={{ sidebar: { background: "white" } }}
      >
        <div className="right-container">
          <div className="navbar">
            <button type="button" className="open-channel-button" onClick={() => this.onSetSidebarOpen(true)}>
              <i className="fas fa-bars" />
            </button>
            <img src={logo} className="logo" alt="Logo" />
          </div>
          <MessageList selectedChannel={this.props.match.params.channel} />
        </div>
      </Sidebar>
    );
  }
}

export default App;
