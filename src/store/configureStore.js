import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import Reactotron from 'reactotron-react-native';
import createReactotronEnhancer from 'reactotron-redux';

const loggerMiddleware = createLogger();

const middleWare = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
);

const reactotronEnhancer = createReactotronEnhancer(Reactotron);

const configureStore = (initialState) =>
  createStore(rootReducer, initialState, compose(reactotronEnhancer, middleWare));

export default configureStore;
