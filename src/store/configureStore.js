/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import Reactotron from 'reactotron-react-native';
import createReactotronEnhancer from 'reactotron-redux';
import rootReducer from '../reducers';


const loggerMiddleware = createLogger();
const middleWare = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
);

const reactotronEnhancer = createReactotronEnhancer(Reactotron, {
  isActionImportant: action => action.type.match(/LOGIN/g),
});
const composition = compose(reactotronEnhancer, middleWare);

const configureStore = initialState =>
  createStore(rootReducer, initialState, composition);

export default configureStore;
