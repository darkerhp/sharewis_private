import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import mixpanelMiddleware from './middleware/mixpanel';
import netInfoMiddleware from './middleware/netInfo';

const loggerMiddleware = createLogger();

export default [
  thunkMiddleware,
  netInfoMiddleware,
  mixpanelMiddleware,
  loggerMiddleware,
];
