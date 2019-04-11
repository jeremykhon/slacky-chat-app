import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createChannel } from '../actions/index';

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
    };
    this.props.closeModal()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="channel-form noSelect">
        <input className="channel-form-input form-control noSelect" type="text" value={this.state.value} onChange={this.handleChange} ref={(form) => { this.form = form; }} />
        <button className="channel-form-button noSelect" type="submit">Send</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { createChannel },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(ChannelForm);
