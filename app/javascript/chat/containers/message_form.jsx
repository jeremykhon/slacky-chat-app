import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from '../utils/debounce';
import { createMessage, fetchGifs } from '../actions/index';
import GifsContainer from './gifs_container';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.debouncedFetchGifs = debounce(this.props.fetchGifs, 500);
  }

  componentDidMount() {
    this.focusForm();
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value }, () => this.debouncedFetchGifs(this.state.value));
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
      <div>
        <GifsContainer />
        <form onSubmit={this.handleSubmit} className="message-form noSelect">
          <input className="message-form-input form-control noSelect" type="text" value={this.state.value} placeholder={`Message #${this.props.selectedChannel}`} onChange={this.handleChange} ref={(form) => { this.form = form; }} />
          <button className="message-form-button noSelect" type="submit">Send</button>
        </form>
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
    { createMessage, fetchGifs },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
