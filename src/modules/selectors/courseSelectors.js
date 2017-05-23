import _ from 'lodash';
import { createSelector } from 'reselect';

import CourseMap from '../models/CourseMap';

export const courseSelector = (state, props) => {
  const courses = _.has(state, 'entities.courses') ? state.entities.courses : props.courses;
  return courses || new CourseMap();
};

export const snackCourseSelector = createSelector(
  courseSelector,
  courses => courses.filter(c => c.type === 'SnackCourse'),
);

export const proCourseSelector = createSelector(
  courseSelector,
  courses => courses.filter(c => c.type === 'ProCourse'),
);

export const purchasedProCourseSelector = createSelector(
  proCourseSelector,
  proCourses => proCourses.filter(c => c.isPurchased === true),
);

export const notPurchasedProCourseSelector = createSelector(
  proCourseSelector,
  proCourses => proCourses.filter(c => c.isPurchased === false),
);
