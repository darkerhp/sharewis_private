/* global __DEV__ */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import Reactotron from 'reactotron-react-native';
import createReactotronEnhancer from 'reactotron-redux';
import { autoRehydrate } from 'redux-persist';

import netInfoMiddleware from './middleware/netInfo';
import rootReducer from './reducers';


const loggerMiddleware = createLogger();
const middleWare = applyMiddleware(
  thunkMiddleware,
  netInfoMiddleware,
  loggerMiddleware
);

const configureStore = (initialState) => {
  let composition = compose(middleWare, autoRehydrate());

  if (__DEV__) {
    const reactotronEnhancer = createReactotronEnhancer(Reactotron, {
      // isActionImportant: action => action.type.match(/LOGIN/g),
    });
    composition = compose(reactotronEnhancer, composition);
  }

  return createStore(rootReducer, initialState, composition);
};


export default configureStore;
