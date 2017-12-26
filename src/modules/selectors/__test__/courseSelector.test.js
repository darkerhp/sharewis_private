/* eslint-disable no-undef */
import {
  courseSelector,
  snackCourseSelector,
  proCourseSelector,
  purchasedProCourseSelector,
  notPurchasedProCourseSelector,
  getSortedPurchasedProCourses
} from '../../selectors/courseSelectors';

import Course from '../../models/Course';
import CourseMap from '../../models/CourseMap';

// test data
const courses = {
  1: {
    id: 1,
    type: 'ProCourse',
    isPurchased: true,
    viewedAt: '2017-07-13T00:00:00.000+09:00'
  },
  2: { id: 2, type: 'ProCourse', isPurchased: false, viewedAt: null },
  3: { id: 3, type: 'SnackCourse', isPurchased: false, viewedAt: null },
  4: {
    id: 4,
    type: 'ProCourse',
    isPurchased: true,
    viewedAt: '2017-07-14T00:00:00.000+09:00'
  }
};

const courseMap = new CourseMap(courses).map(course => new Course(course));

describe('courseSelectors', () => {
  it('courseSelector should return courses', () => {
    const param = { courses: courseMap };
    expect(courseSelector({ entities: param })).toEqual(courseMap);
    expect(courseSelector({}, param)).toEqual(courseMap);
  });

  it('snackCourseSelector should return snack courses', () => {
    const snackCourses = snackCourseSelector({}, { courses: courseMap });
    expect(snackCourses.size).toEqual(1);
    expect(snackCourses.first().type).toEqual('SnackCourse');
  });

  it('proCourseSelector should return pro course', () => {
    const proCourses = proCourseSelector({}, { courses: courseMap });
    expect(proCourses.size).toEqual(3);
  });

  it('purchasedProCourseSelector should return purchased pro course', () => {
    const proCourses = purchasedProCourseSelector({}, { courses: courseMap });
    expect(proCourses.size).toEqual(2);
    const proCourse = proCourses.first();
    expect(proCourse.type).toEqual('ProCourse');
    expect(proCourse.isPurchased).toEqual(true);
  });

  it('notPurchasedProCourseSelector should return not purchased pro course', () => {
    const proCourses = notPurchasedProCourseSelector(
      {},
      { courses: courseMap }
    );
    expect(proCourses.size).toEqual(1);
    const proCourse = proCourses.first();
    expect(proCourse.type).toEqual('ProCourse');
    expect(proCourse.isPurchased).toEqual(false);
  });

  it('getSortedPurchasedProCourses should return purchased pro courses sorted by viewedAt', () => {
    const proCourses = getSortedPurchasedProCourses({}, { courses: courseMap });
    const proCourse = proCourses.first();
    expect(proCourse.id).toEqual(4);
  });
});
