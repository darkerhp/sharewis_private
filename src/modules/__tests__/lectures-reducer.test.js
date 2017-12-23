/* eslint-disable no-undef */
import { createAction } from 'redux-actions';
import { OrderedMap } from 'immutable';

import Lecture from '../models/Lecture';

import reducer, {
  FETCH_COURSE_DETAILS_SUCCESS,
  UPDATE_LECTURE_STATUS_SUCCESS,
  BEGIN_DOWNLOAD_LECTURE,
  PROGRESS_DOWNLOAD_LECTURE,
  FINISH_DOWNLOAD_LECTURE,
  ERROR_DOWNLOAD_LECTURE,
  CANCEL_DOWNLOAD_LECTURE,
  FINISH_DELETE_VIDEO
} from '../lectures';

const factory = (lectureId, props = {}) =>
  new OrderedMap({ [lectureId]: new Lecture({ id: lectureId, ...props }) });

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
            thumbnailUrl:
              'https://hoge.com/deliveries/a.jpg?image_crop_resized=200x120',
            title: 'Y-120 学習チェック例文',
            type: 'video',
            videoUrl:
              'http://embed.wistia.com/deliveries/108d768d4ba077380ee8d5390ca1ee3cf8d447e3.bin'
          }
        }
      }
    };
    expect(
      reducer(
        factory(lectureId),
        createAction(FETCH_COURSE_DETAILS_SUCCESS)(payload)
      )
    ).toEqual(factory(lectureId, { ...payload.entities.lectures[1] }));
  });

  it('should handle UPDATE_LECTURE_STATUS_SUCCESS', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId, { status: Lecture.STATUS_NOT_STARTED }),
        createAction(UPDATE_LECTURE_STATUS_SUCCESS)({
          lectureId,
          status: Lecture.STATUS_FINISHED
        })
      )
    ).toEqual(factory(lectureId, { status: Lecture.STATUS_FINISHED }));
  });

  it('should handle BEGIN_DOWNLOAD_LECTURE', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId),
        createAction(BEGIN_DOWNLOAD_LECTURE)({
          lectureId,
          jobId: 1,
          statusCode: 200
        })
      )
    ).toEqual(
      factory(lectureId, { jobId: 1, statusCode: 200, isDownloading: true })
    );
  });

  it('should handle PROGRESS_DOWNLOAD_LECTURE', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId, { jobId: 1 }),
        createAction(PROGRESS_DOWNLOAD_LECTURE)({
          lectureId,
          jobId: 1,
          progress: 99
        })
      )
    ).toEqual(
      factory(lectureId, { jobId: 1, progress: 99, isDownloading: true })
    );
  });

  it('should handle FINISH_DOWNLOAD_LECTURE', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId, { jobId: 1 }),
        createAction(FINISH_DOWNLOAD_LECTURE)(lectureId)
      )
    ).toEqual(
      factory(lectureId, {
        isDownloaded: true,
        isDownloading: false,
        jobId: -1,
        progress: 0
      })
    );
  });

  it('should handle ERROR_DOWNLOAD_LECTURE', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId),
        createAction(ERROR_DOWNLOAD_LECTURE)(lectureId)
      )
    ).toEqual(
      factory(lectureId, {
        isDownloaded: false,
        isDownloading: false,
        jobId: -1,
        progress: 0
      })
    );
  });

  it('should handle CANCEL_DOWNLOAD_LECTURE', () => {
    const lectureId = 1;
    expect(
      reducer(
        factory(lectureId),
        createAction(CANCEL_DOWNLOAD_LECTURE)(lectureId)
      )
    ).toEqual(factory(lectureId, { isDownloading: false, jobId: -1 }));
  });

  it('should handle FINISH_DELETE_VIDEO', () => {
    const lectureId = 1;
    expect(
      reducer(factory(lectureId), createAction(FINISH_DELETE_VIDEO)(lectureId))
    ).toEqual(factory(lectureId, { isDownloaded: false, progress: 0 }));
  });
});
