import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createChannel, fetchMessages } from '../actions/index';
import history from '../history';

class ChannelForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentDidMount() {
    this.focusForm();
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  focusForm = () => { 
    this.form.focus();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.value) {
      this.props.createChannel(this.state.value);
      this.props.closeModal();
      history.push(`/channels/${this.state.value}`);
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="channel-form noSelect">
        <div className="create-channel-title">Create a Channel</div>
        <input className="channel-form-input form-control noSelect" type="text" value={this.state.value} onChange={this.handleChange} placeholder={'secret_chat'} ref={(form) => { this.form = form; }} />
        <div className="channel-form-buttons-container">
          <button className="channel-form-cancel noSelect" type="button" onClick={this.props.closeModal}>Cancel</button>
          <button className="channel-form-button noSelect" type="submit">Create</button>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { createChannel, fetchMessages},
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(ChannelForm);
