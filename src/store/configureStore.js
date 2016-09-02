import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import Reactotron from 'reactotron-react-native';
import createReactotronEnhancer from 'reactotron-redux';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

const middleWare = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
);

const reactotronEnhancer = createReactotronEnhancer(Reactotron);

const configureStore = (initialState) =>
  createStore(rootReducer, initialState, compose(reactotronEnhancer, middleWare));

export default configureStore;
