import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import course from './course';
import courses from './courseList';
import lecture from './lecture';
import routes from './routes';
import user from './user';


const rootReducer: Function = combineReducers({
  course,
  courses,
  form,
  lecture,
  routes,
  user,
});


export default rootReducer;
