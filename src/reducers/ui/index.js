import { combineReducers } from 'redux';

import myCourseView from './myCourseView';
import courseView from './courseView';
import lectureView from './lectureView';
import videoPlayer from './videoPlayer';

export const reducers = {
  myCourseView,
  courseView,
  lectureView,
  videoPlayer,
};

export default combineReducers(reducers);
