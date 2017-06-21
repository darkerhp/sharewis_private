/* eslint-disable no-undef */
import { createAction } from 'redux-actions';
import { OrderedMap } from 'immutable';

import Lecture from '../models/Lecture';

import reducer, {
  FETCH_COURSE_DETAILS_SUCCESS,
  COMPLETE_LECTURE,
  BEGIN_DOWNLOAD_VIDEO,
  PROGRESS_DOWNLOAD_VIDEO,
  FINISH_DOWNLOAD_VIDEO,
  ERROR_DOWNLOAD_VIDEO,
  CANCEL_DOWNLOAD_VIDEO,
  FINISH_DELETE_VIDEO,
} from '../lectures';

const factory = (lectureId, props = {}) => (
  new OrderedMap({ [lectureId]: new Lecture({ id: lectureId, ...props }) })
);

jest.mock('bugsnag-react-native', () => 'Bugsnag');
jest.mock('react-native-i18n', () => ({ currentLocale: () => '' }));

describe('lectures reducer', () => {
  it('should handle FETCH_COURSE_DETAILS_SUCCESS', () => {
    const lectureId = 1;
    const payload = {
      entities: {
        lectures: {
          1: {
            body: null,
            courseId: 143,
            estimatedTime: 180,
            id: 1,
            kind: 'lecture',
            order: 204,
            status: 'not_started',
            thumbnailUrl: 'https://hoge.com/deliveries/a.jpg?image_crop_resized=200x120',
            title: 'Y-120 学習チェック例文',
            type: 'video',
            videoUrl: 'http://embed.wistia.com/deliveries/108d768d4ba077380ee8d5390ca1ee3cf8d447e3.bin',
          },
        },
      },
    };
    expect(
      reducer(
        factory(lectureId),
        createAction(FETCH_COURSE_DETAILS_SUCCESS)(payload),
      ),
    ).toEqual(factory(lectureId, { ...payload.entities.lectures[1] }));
  });

  it('should handle COMPLETE_LECTURE', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId),
        createAction(COMPLETE_LECTURE)(lectureId),
      ),
    ).toEqual(factory(lectureId, { status: Lecture.STATUS_FINISHED }));
  });

  it('should handle BEGIN_DOWNLOAD_VIDEO', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId),
        createAction(BEGIN_DOWNLOAD_VIDEO)({
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
        factory(lectureId, { jobId: 1 }),
        createAction(PROGRESS_DOWNLOAD_VIDEO)({
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
        factory(lectureId, { jobId: 1 }),
        createAction(FINISH_DOWNLOAD_VIDEO)(lectureId),
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
        createAction(ERROR_DOWNLOAD_VIDEO)(lectureId),
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
        createAction(CANCEL_DOWNLOAD_VIDEO)(lectureId),
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
        createAction(FINISH_DELETE_VIDEO)(lectureId),
      ),
    ).toEqual(
      factory(lectureId, { hasVideoInDevice: false, progress: 0 }),
    );
  });
});
