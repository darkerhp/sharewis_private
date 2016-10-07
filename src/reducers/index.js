import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import courseList from './courseList';
import courseDetails from './courseDetails';
import lecture from './lecture';
import routes from './routes';
import user from './user';
import netInfo from './netInfo';
import videoPlayer from './videoPlayer';

const rootReducer: Function = combineReducers({
  courseList,
  currentCourse: courseDetails,
  currentLecture: lecture,
  form,
  routes,
  user,
  netInfo,
  videoPlayer,
});

export default rootReducer;
