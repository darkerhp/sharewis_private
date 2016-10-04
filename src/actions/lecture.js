/* @flow */
import { queueAction } from '../actions/netInfo';
import * as types from '../constants/ActionTypes';
import * as ApiConstants from '../constants/Api';
import { patchLectureStatus } from '../middleware/actApi';


// Actions Creators

export const fetchLectureStatusFailure = error => ({
  type: types.FETCH_LECTURE_STATUS_FAILURE,
  error,
});

export const fetchLectureStatusStart = () => ({
  type: types.FETCH_LECTURE_STATUS_START,
});

export const fetchLectureStatusSuccess = ({ course, lectures }) => ({
  type: types.FETCH_LECTURE_STATUS_SUCCESS,
  course,
  lectures,
});

export const loadCurrentLecture = (lectures, currentLecture) => ({
  type: types.LOAD_CURRENT_LECTURE,
  lectures,
  currentLecture,
});

export const pressFullScreen = () => ({
  type: types.PRESS_FULL_SCREEN,
});

export const pressPlay = () => ({
  type: types.PRESS_PLAY,
});

export const pressSpeed = () => ({
  type: types.PRESS_SPEED,
});

export const updateVideoProgress = currentTime => ({
  type: types.UPDATE_VIDEO_PROGRESS,
  currentTime,
});

// Used in courseList and courseDetails reducers
export const completeCurrentLecture = () => ({
  type: types.COMPLETE_CURRENT_LECTURE,
});


// Thunks

export const fetchLectureStatus = (courseId, lectureId, status) =>
  async (dispatch, getState) => {
    dispatch(fetchLectureStatusStart());
    try {
      const state = getState();
      const userId = state.user.userId;
      const currentLecture = state.currentLecture;
      let result;

      if (state.netInfo.isConnected) {
        result = await patchLectureStatus(userId, courseId, lectureId, status);
      } else {
        queueAction(fetchLectureStatus, [courseId, lectureId, status]);
        result = {
          course: state.course,
          lectures: state.course.lectures,
        };
      }

      if (status === ApiConstants.LECTURE_STATUS_FINISHED) {
        dispatch(completeCurrentLecture());
      } else {
        dispatch(loadCurrentLecture(result.lectures, { ...currentLecture, status }));
      }
      dispatch(fetchLectureStatusSuccess(result));
    } catch (error) {
      dispatch(fetchLectureStatusFailure());
      throw error;
    }
  };
