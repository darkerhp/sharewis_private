/* eslint-disable no-undef */
import { createAction } from 'redux-actions';
import { fromJS, OrderedMap } from 'immutable';
import reducer from '../entities/lectures';
import * as types from '../../constants/ActionTypes';
import { LECTURE_STATUS_FINISHED } from '../../constants/Api';

import Lecture from '../../models/Lecture';

const factory = (lectureId, props = {}) => (
  new OrderedMap({ [lectureId]: new Lecture({ id: lectureId, ...props }) })
);

describe('lectures reducer', () => {
  it('should handle COMPLETE_LECTURE', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId),
        createAction(types.COMPLETE_LECTURE)(lectureId),
      ),
    ).toEqual(factory(lectureId, { status: LECTURE_STATUS_FINISHED }));
  });

  it('should handle BEGIN_DOWNLOAD_VIDEO', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId),
        createAction(types.BEGIN_DOWNLOAD_VIDEO)({
          lectureId,
          jobId: 1,
          statusCode: 200,
        }),
      ),
    ).toEqual(
      factory(lectureId, { jobId: 1, statusCode: 200, isDownloading: true }),
    );
  });

  it('should handle PROGRESS_DOWNLOAD_VIDEO', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId),
        createAction(types.PROGRESS_DOWNLOAD_VIDEO)({
          lectureId,
          jobId: 1,
          progress: 99,
        }),
      ),
    ).toEqual(
      factory(lectureId, { jobId: 1, progress: 99, isDownloading: true }),
    );
  });

  it('should handle FINISH_DOWNLOAD_VIDEO', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId),
        createAction(types.FINISH_DOWNLOAD_VIDEO)(lectureId),
      ),
    ).toEqual(
      factory(lectureId, {
        hasVideoInDevice: true,
        isDownloading: false,
        jobId: -1,
        progress: 0,
      }),
    );
  });

  it('should handle ERROR_DOWNLOAD_VIDEO', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId),
        createAction(types.ERROR_DOWNLOAD_VIDEO)(lectureId),
      ),
    ).toEqual(
      factory(lectureId, {
        hasVideoInDevice: false,
        isDownloading: false,
        jobId: -1,
        progress: 0,
      }),
    );
  });

  it('should handle CANCEL_DOWNLOAD_VIDEO', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId),
        createAction(types.CANCEL_DOWNLOAD_VIDEO)(lectureId),
      ),
    ).toEqual(
      factory(lectureId, { isDownloading: false, jobId: -1 }),
    );
  });

  it('should handle FINISH_DELETE_VIDEO', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId),
        createAction(types.FINISH_DELETE_VIDEO)(lectureId),
      ),
    ).toEqual(
      factory(lectureId, { hasVideoInDevice: false, progress: 0 }),
    );
  });
});
