/* @flow */
// TODO video と lecture, lectures分けたほうがよさげ
import * as types from '../constants/ActionTypes';
import * as ApiConstants from '../constants/Api';
import * as LectureUtils from '../utils/lecture';
import replaceInList from '../utils/list';

// export for unittesting
export const apiData = {
  courseId: 0,
  estimatedTime: 0,
  hasVideoInDevice: false,  // added in course reducer
  id: 0,
  isLastLecture: false,  // added in course reducer utils
  kind: null,
  order: 0,
  status: ApiConstants.LECTURE_STATUS_NOT_STARTED,
  title: undefined,
  type: null,
  videoUrl: undefined,
};

const initialState = {
  ...apiData,
  currentTime: 0,
  isFullScreen: false,  // TODO
  isPaused: true,
  lectures: [],
  speed: 1,
};

const speedList = [1, 1.2, 1.5, 2];

const lecture = (state = initialState, action) => {
  switch (action.type) {
    case types.COMPLETE_CURRENT_LECTURE: {
      let { lectures, ...currentLecture } = state;
      currentLecture.status = ApiConstants.LECTURE_STATUS_FINISHED;
      lectures = replaceInList(lectures, currentLecture);
      return {
        lectures,
        ...currentLecture,
      };
    }
    case types.LOAD_CURRENT_LECTURE: {
      const currentLecture = {
        ...action.currentLecture,
        status: action.currentLecture.status === ApiConstants.LECTURE_STATUS_NOT_STARTED
        ? ApiConstants.LECTURE_STATUS_VIEWED
        : action.currentLecture.status,
      };
      return {
        ...state,
        lectures: action.lectures,
        ...currentLecture,
      };
    }
    case types.PRESS_PLAY:
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    case types.PRESS_SPEED: {
      const currentIndex = speedList.indexOf(state.speed);
      const index = (currentIndex === speedList.length - 1) ? 0 : currentIndex + 1;
      return {
        ...state,
        speed: speedList[index],
      };
    }
    case types.UPDATE_VIDEO_PROGRESS:
      return {
        ...state,
        currentTime: action.currentTime,
      };
    default:
      return state;
  }
};

export default lecture;
