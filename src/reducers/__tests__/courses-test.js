/* eslint-disable no-undef */
import { createAction } from 'redux-actions';

import reducer from '../entities/courses';
import * as types from '../../constants/ActionTypes';


describe('courses reducer', () => {
  it('should handle UPDATE_COURSE_DOWNLOADED_STATUS', () => {
    expect(
      reducer(
        {
          73: { id: '73' },
          180: { id: '180' },
        },
        createAction(types.UPDATE_COURSE_DOWNLOADED_STATUS)({
          73: { id: '73', hasDownloadedLecture: true },
          180: { id: '180', hasDownloadedLecture: false },
        }),
      ),
    ).toEqual({
      73: { id: '73', hasDownloadedLecture: true },
      180: { id: '180', hasDownloadedLecture: false },
    });
  });
});
