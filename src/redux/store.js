/* global __DEV__ */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

import { applyMiddleware, compose, createStore } from 'redux';
import Reactotron from 'reactotron-react-native';
import createReactotronEnhancer from 'reactotron-redux';
import { autoRehydrate } from 'redux-persist';

import rootReducer from './rootReducer';
import middleware from './middleware';

const middleWare = applyMiddleware(...middleware);

const configureStore = initialState => {
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
