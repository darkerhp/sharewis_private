import { combineReducers } from 'redux';

import courseListView from './courseListView';
import courseDetailsView from './courseDetailsView';
import lectureView from './lectureView';
import videoPlayer from './videoPlayer';

export const reducers = {
  courseListView,
  courseDetailsView,
  lectureView,
  videoPlayer,
};

export default combineReducers(reducers);
