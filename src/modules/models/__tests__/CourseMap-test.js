/* eslint-disable no-undef */
import { courses } from '../../../lib/dummyData';

import Course from '../Course';
import CourseMap from '../CourseMap';

describe('CourseMap', () => {
  it('should return snack course', () => {
    const courseMap = new CourseMap(courses).map(course => new Course(course));
    const snackCourses = courseMap.getSnackCourses();
    expect(snackCourses.size).toEqual(1);
    expect(snackCourses.first().id).toEqual(999);
  });

  it('should return pro course', () => {
    const courseMap = new CourseMap(courses).map(course => new Course(course));
    const proCourses = courseMap.getProCourses();
    expect(proCourses.size).toEqual(2);
  });
});
