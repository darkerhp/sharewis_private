/* global __DEV__ */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

import { AsyncStorage } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import Reactotron from 'reactotron-react-native';
import createReactotronEnhancer from 'reactotron-redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
const middleWare = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
);

// To purge the storage, set to true
const PURGE_STORAGE = false;


const configureStore = (initialState) => {
  let composition = compose(middleWare, autoRehydrate());

  if (__DEV__) {
    const reactotronEnhancer = createReactotronEnhancer(Reactotron, {
      // isActionImportant: action => action.type.match(/LOGIN/g),
    });
    composition = compose(reactotronEnhancer, composition);
  }

  const store = createStore(rootReducer, initialState, composition);

  if (PURGE_STORAGE) {
    persistStore(store, { storage: AsyncStorage }).purge();
  } else {
    persistStore(store, { storage: AsyncStorage }, () =>
      console.log('rehydration complete')
    );
  }

  return store;
};


export default configureStore;
