import { combineReducers } from 'redux';

import courses from './courses';
import lectures from './lectures';

export const reducers = {
  courses,
  lectures,
};

export default combineReducers(reducers);
