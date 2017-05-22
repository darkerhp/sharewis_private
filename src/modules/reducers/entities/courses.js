/**
 * @flow
 */
import _ from 'lodash';
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist/constants';

import Course from '../../models/Course';
import CourseMap from '../../models/CourseMap';

const initialState = new CourseMap();

const mergeEntities = (state, newCourses) =>
  state.merge(newCourses.map(course => new Course(course)));

const refreshEntities = newCourses => mergeEntities(initialState, newCourses);

const coursesReducer = handleActions({
  FETCH_MY_COURSE_SUCCESS: (state: CourseMap, action) => {
    const courses = action.payload.entities.courses;
    console.log('FETCH_MY_COURSE_SUCCESS', courses);
    if (!courses) return state;
    return mergeEntities(state, fromJS(courses));
  },
  FETCH_SNACK_COURSE_SUCCESS: (state: CourseMap, action) => {
    const courses = action.payload.entities.courses;
    if (!courses) return state;
    return mergeEntities(state, fromJS(courses));
  },
  FETCH_PRO_COURSE_SUCCESS: (state: CourseMap, action) => {
    const courses = action.payload.entities.courses;
    if (!courses) return state;
    return mergeEntities(state, fromJS(courses));
  },
  UPDATE_COURSE_DOWNLOADED_STATUS: (state, action) => {
    if (_.isEmpty(state)) return state;
    const updatedCourses = action.payload;
    return state.merge(updatedCourses);
  },
  // redux-persistのrehydrate用のreducer
  // Immutable.jsを使用する場合、変換が必要
  [REHYDRATE]: (state, action) => {
    if (!Object.prototype.hasOwnProperty.call(action.payload, 'entities')) return state;
    const courses = action.payload.entities.courses;
    if (_.isEmpty(courses)) return initialState;
    return refreshEntities(fromJS(courses));
  },
}, initialState);

export default coursesReducer;
