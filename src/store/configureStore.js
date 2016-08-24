/* @flow */

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

const middleWare = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
);

const configureStore = (initialState: Object = {}): Function =>
  createStore(rootReducer, initialState, middleWare);


export default configureStore;
