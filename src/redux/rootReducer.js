import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import ui from '../modules/ui';
import routes from '../modules/routes';
import user from '../modules/user';
import netInfo from '../modules/netInfo';
import courses from '../modules/courses';
import lectures from '../modules/lectures';
import sections from '../modules/sections';
import products from '../modules/products'; // eslint-disable-line

const entities = combineReducers({
  courses,
  lectures,
  sections,
  products
});

const rootReducer = combineReducers({
  entities,
  ui,
  form,
  routes,
  user,
  netInfo
});

export default rootReducer;
