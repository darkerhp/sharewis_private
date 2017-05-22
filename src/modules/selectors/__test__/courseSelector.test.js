/* eslint-disable no-undef */
import {
  courseSelector,
  snackCourseSelector,
  proCourseSelector,
  purchasedProCourseSelector,
  notPurchasedProCourseSelector,
} from '../../selectors/courseSelectors';

import Course from '../../models/Course';
import CourseMap from '../../models/CourseMap';

// test data
const courses = {
  1: { id: 1, type: 'ProCourse', isPurchased: true },
  2: { id: 2, type: 'ProCourse', isPurchased: false },
  3: { id: 3, type: 'SnackCourse', isPurchased: false },
};

const courseMap = new CourseMap(courses).map(course => new Course(course));


describe('courseSelector', () => {
  it('courseSelector should return courses', () => {
    const param = { courses: courseMap };
    let result;
    result = courseSelector({ entities: param });
    expect(result).toEqual(courseMap);
    result = courseSelector({}, param);
    expect(result).toEqual(courseMap);
  });

  it('snackCourseSelector should return snack courses', () => {
    const snackCourses = snackCourseSelector({}, { courses: courseMap });
    expect(snackCourses.size).toEqual(1);
    expect(snackCourses.first().type).toEqual('SnackCourse');
  });

  it('proCourseSelector should return pro course', () => {
    const proCourses = proCourseSelector({}, { courses: courseMap });
    expect(proCourses.size).toEqual(2);
  });

  it('purchasedProCourseSelector should return purchased pro course', () => {
    const proCourses = purchasedProCourseSelector({}, { courses: courseMap });
    expect(proCourses.size).toEqual(1);
    const proCourse = proCourses.first();
    expect(proCourse.type).toEqual('ProCourse');
    expect(proCourse.isPurchased).toEqual(true);
  });

  it('notPurchasedProCourseSelector should return not purchased pro course', () => {
    const proCourses = notPurchasedProCourseSelector({}, { courses: courseMap });
    expect(proCourses.size).toEqual(1);
    const proCourse = proCourses.first();
    expect(proCourse.type).toEqual('ProCourse');
    expect(proCourse.isPurchased).toEqual(false);
  });
});
