import { createSelector } from 'reselect';

export const snackCourseSelector = (state, props) =>
  state.entities.courses.filter(c => c.type === 'SnackCourse');

export const proCourseSelector = (state, props) =>
  state.entities.courses.filter(c => c.type === 'ProCourse');

export const purchasedProCourseSelector = createSelector(
  proCourseSelector,
  proCourses => proCourses.filter(c => c.isPurchased === true),
);

export const notPurchasedProCourseSelector = createSelector(
  proCourseSelector,
  proCourses => proCourses.filter(c => c.isPurchased === false),
);
