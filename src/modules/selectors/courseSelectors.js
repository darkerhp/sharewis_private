import _ from 'lodash';
import { createSelector } from 'reselect';

export const courseSelector = (state, props) => (
  _.has(state, 'entities.courses') ? state.entities.courses : props.courses
);

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
