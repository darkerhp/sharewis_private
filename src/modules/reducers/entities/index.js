import { combineReducers } from 'redux';

import courses from './courses';
import lectures from '../../lectures';
import sections from './sections';
import products from './products';

export const reducers = {
  courses,
  lectures,
  sections,
  products,
};

export default combineReducers(reducers);
