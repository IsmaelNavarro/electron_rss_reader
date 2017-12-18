import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import 'app.scss'

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as promiseMiddleware from 'redux-promise';
import reducer from './Reducers';

import App from './Containers/App';

const storeEnhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware
  )
);

const store = createStore(
  reducer, storeEnhancer
);

ReactDOM.render(
  <Provider store={store}>
    <App {...this.props} />
  </Provider>,
  document.getElementById('root')
); 