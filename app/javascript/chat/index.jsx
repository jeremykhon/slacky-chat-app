// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise';
import { Router, Route, Switch } from 'react-router-dom';
import App from './containers/app';
import MessagesReducer from './reducers/messages_reducer';
import ChannelsReducer from './reducers/channels_reducer';
import history from './history'
// internal modules
const chatContainer = document.getElementById('app');

const initialState = {
  messages: [],
  channels: JSON.parse(chatContainer.dataset.channels)
};

const reducers = combineReducers({
  messages: MessagesReducer,
  channels: ChannelsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const middlewares = composeEnhancers(applyMiddleware(ReduxPromise, logger));

const store = createStore(reducers, initialState, middlewares);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/channels/:channel" component={App} />
      </Switch>
    </Router>
  </Provider>,
  chatContainer
);