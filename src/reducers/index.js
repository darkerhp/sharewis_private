import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import course from './course';
import courses from './courses';
import lecture from './lecture';
import routes from './routes';
import user from './user';


const rootReducer: Function = combineReducers({
  courseList: courses,
  currentCourse: course,
  currentLecture: lecture,
  form,
  routes,
  user,
});


export default rootReducer;
