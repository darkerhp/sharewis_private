import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import entities from './entities';
import ui from './ui';
import routes from '../routes';
import user from './user';
import netInfo from '../netInfo';
import videoDownload from './videoDownload';

const rootReducer = combineReducers({
  entities,
  ui,
  form,
  routes,
  user,
  netInfo,
  //videoDownload,
});

export default rootReducer;
