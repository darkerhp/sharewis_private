import { combineReducers } from 'redux';

import courses from './courses';
import lectures from './lectures';
import sections from './sections';

export const reducers = {
  courses,
  lectures,
  sections,
};

export default combineReducers(reducers);
