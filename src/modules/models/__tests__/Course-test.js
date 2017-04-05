/* eslint-disable no-undef */
import Course from '../Course';

describe('Course Model', () => {
  describe('check course type', () => {
    it('pro course', () => {
      const course = new Course({ type: Course.TYPE_PRO });
      expect(course.isProCourse()).toBeTruthy();
      expect(course.isSnackCourse()).toBeFalsy();
    });

    it('snack course', () => {
      const course = new Course({ type: Course.TYPE_SNACK });
      expect(course.isProCourse()).toBeFalsy();
      expect(course.isSnackCourse()).toBeTruthy();
    });
  });
});
