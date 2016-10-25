import { handleActions } from 'redux-actions';

const initialState = {
  currentCourseId: 0,
  currentLectureId: 0,
  isFetching: false,
  isLastLecture: false,
  isLectureDownloading: false,
  // VideoPlayer
  currentTime: 0,
  isFullScreen: false,
  isPaused: true,
  speed: 1,
  //
  fetchedCourseDetailsAt: null,
  fetchedCourseListAt: null,
};

const speedList = [1, 1.2, 1.5, 2];

const uiReducer = handleActions({
  // TODO アクションを移植する 10/24
  FETCH_COURSES_LIST_START: (state, action) => ({
    ...state,
    isFetching: true,
  }),
  FETCH_COURSES_LIST_FAILURE: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
  FETCH_COURSES_LIST_SUCCESS: (state, action) => ({
    ...state,
    isFetching: false,
    fetchedCourseListAt: Date.now(),
  }),
  FETCH_COURSE_DETAILS_START: (state, action) => ({
    ...state,
    isFetching: true,
  }),
  FETCH_COURSE_DETAILS_FAILURE: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
  FETCH_COURSE_DETAILS_SUCCESS: (state, action) => ({
    ...state,
    isFetching: false,
    fetchedCourseDetailsAt: Date.now(),
  }),
  PRESS_DOWNLOAD_VIDEO: (state, action) => ({
    ...state,
    isLectureDownloading: true,
  }),
  FINISH_DOWNLOAD_VIDEO: (state, action) => ({
    ...state,
    isLectureDownloading: false,
  }),
  ERROR_DOWNLOAD_VIDEO: (state, action) => ({
    ...state,
    isLectureDownloading: false,
  }),
  SET_CURRENT_COURSE_ID: (state, action) => ({
    ...state,
    currentCourseId: action.payload,
  }),
  SET_CURRENT_LECTURE_ID: (state, action) => ({
    ...state,
    currentLectureId: action.payload,
  }),
  TOGGLE_PLAY: (state, action) => ({
    ...state,
    isPaused: !state.isPaused,
  }),
  CHANGE_VIDEO_PLAY_SPEED: (state, action) => {
    const currentIndex = speedList.indexOf(state.speed);
    const index = (currentIndex === speedList.length - 1) ? 0 : currentIndex + 1;
    return {
      ...state,
      speed: speedList[index],
    };
  },
  UPDATE_VIDEO_PROGRESS: (state, action) => ({
    ...state,
    currentTime: action.payload,
  }),
}, initialState);

export default uiReducer;

