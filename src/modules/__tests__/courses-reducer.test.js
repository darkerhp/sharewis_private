/* eslint-disable no-undef */
import { createAction } from 'redux-actions';
import { OrderedMap } from 'immutable';

import reducer, { UPDATE_COURSE_DOWNLOADED_STATUS } from '../courses';

import Course from '../models/Course';

jest.mock('bugsnag-react-native', () => 'Bugsnag');

const factory = (courseId, props = {}) => (
  new OrderedMap({ [courseId]: new Course({ id: courseId, ...props }) })
);

describe('courses reducer', () => {
  it('should handle UPDATE_COURSE_DOWNLOADED_STATUS', () => {
    const courseId = 1;
    expect(
      reducer(
        factory(courseId),
        createAction(UPDATE_COURSE_DOWNLOADED_STATUS)(
          factory(courseId, { hasDownloadedLecture: true }),
        ),
      ),
    ).toEqual(factory(courseId, { hasDownloadedLecture: true }));
  });
});
