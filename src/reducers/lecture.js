/* @flow */
// TODO video と lecture, lectures分けたほうがよさげ
import * as types from '../constants/ActionTypes';
import * as LectureUtils from '../utils/lecture';

const initialState = {
  isPaused: true,
  speed: 1,
  isFullScreen: false,
  duration: 0,
  currentTime: 0,
};

const speedList = [1, 1.2, 1.5, 2];

const lecture = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_CURRENT_LECTURE:
      return {
        ...state,
        ...action.currentLecture,
      };
    case types.LOAD_NEXT_LECTURE: {
      const newLectures = action.course.lectures.map(l => (
        l.id !== action.lectureId ? l : { ...l, isCompleted: true }
      ));
      return {
        ...state,
        lectureId: action.lectureId,
        course: {
          ...action.course,
          lectures: newLectures,
          lectureCount: action.course.lectureCount + 1,
        },
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
