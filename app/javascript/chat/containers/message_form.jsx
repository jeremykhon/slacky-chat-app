import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createMessage } from '../actions/index';

class MessageForm extends Component {
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
      this.props.createMessage(this.props.selectedChannel, this.state.value);
    };
    this.setState({ value: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="message-form noSelect">
        <input className="message-form-input form-control noSelect" type="text" value={this.state.value} onChange={this.handleChange} ref={(form) => { this.form = form; }} />
        <button className="message-form-button noSelect" type="submit">Send</button>
      </form>
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
    { createMessage },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
