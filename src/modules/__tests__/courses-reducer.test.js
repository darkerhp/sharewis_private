/* eslint-disable no-undef */
import { createAction } from 'redux-actions';
import { OrderedMap } from 'immutable';

import reducer, { UPDATE_COURSE_DOWNLOADED_STATUS } from '../courses';
import { UPDATE_LECTURE_STATUS_SUCCESS } from '../lectures';

import Course from '../models/Course';

jest.mock('bugsnag-react-native', () => 'Bugsnag');
jest.mock('react-native-i18n', () => ({ currentLocale: () => '' }));

const factory = (courseId, props = {}) =>
  new OrderedMap({ [courseId]: new Course({ id: courseId, ...props }) });

describe('courses reducer', () => {
  it('should handle UPDATE_COURSE_DOWNLOADED_STATUS', () => {
    const courseId = 1;
    expect(
      reducer(
        factory(courseId),
        createAction(UPDATE_COURSE_DOWNLOADED_STATUS)(
          factory(courseId, { hasDownloadedLecture: true })
        )
      )
    ).toEqual(factory(courseId, { hasDownloadedLecture: true }));
  });

  it('should handle UPDATE_LECTURE_STATUS_SUCCESS', () => {
    const courseId = 1;
    const resultCourse = reducer(
      factory(courseId, { viewedAt: null }),
      createAction(UPDATE_LECTURE_STATUS_SUCCESS)({ courseId })
    ).first();
    expect(resultCourse.viewedAt).not.toBeNull();
  });
});
