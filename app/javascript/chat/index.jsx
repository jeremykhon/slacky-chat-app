// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import ReduxPromise from 'redux-promise';
import { Router, Route, Switch } from 'react-router-dom';
import App from './containers/app';
import MessagesReducer from './reducers/messages_reducer';
import ChannelsReducer from './reducers/channels_reducer';
import GifsReducer from './reducers/gifs_reducer';
import history from './utils/history';
// internal modules
const chatContainer = document.getElementById('app');

window.addEventListener('resize', () => {
  document.body.height = window.innerHeight;
});

const initialState = {
  messages: [],
  channels: JSON.parse(chatContainer.dataset.channels),
  gifs: [],
};

const reducers = combineReducers({
  messages: MessagesReducer,
  channels: ChannelsReducer,
  gifs: GifsReducer,
});

const middlewares = [ReduxPromise];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const combinedMiddlewares = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(reducers, initialState, combinedMiddlewares);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/channels/:channel" component={App} />
      </Switch>
    </Router>
  </Provider>,
  chatContainer,
);
