import _ from 'lodash';
import { fromJS } from 'immutable';
import normalize from 'normalize-object';
import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist/constants';

import Course from '../../models/Course';
import CourseMap from '../../models/CourseMap';

const initialState = new CourseMap();

const mergeEntities = (state, newCourses) =>
  state.merge(newCourses.map(course => new Course(course)));

const coursesReducer = handleActions({
  FETCH_COURSES_LIST_SUCCESS: (state, action) => {
    const courses = action.payload.entities.courses;
    if (!courses) return state;
    return mergeEntities(state, fromJS(normalize(courses)));
  },
  UPDATE_COURSE_DOWNLOADED_STATUS: (state, action) => {
    if (_.isEmpty(state)) return state;
    const updatedCourses = action.payload;
    return state.merge(updatedCourses);
  },
  // redux-persistのrehydrate用のreducer
  // Immutable.jsを仕様する場合、変換が必要
  [REHYDRATE]: (state, action) => {
    if (!Object.prototype.hasOwnProperty.call(action.payload, 'entities')) return state;
    const courses = action.payload.entities.courses;
    if (!courses) return state;
    return mergeEntities(initialState, fromJS(normalize(courses)));
  },
}, initialState);

export default coursesReducer;
