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

const startFetching = state => ({ ...state, isFetching: true });
const stopFetching = state => ({ ...state, isFetching: false });

const uiReducer = handleActions({
  INIT_APP: (state, action) => ({ ...initialState }),
  FETCH_FB_EMAIL_FAILURE: stopFetching,
  FETCH_ACT_LOGIN_FAILURE: stopFetching,
  FETCH_FB_EMAIL_SUCCESS: startFetching,
  START_ACT_FACEBOOK_LOGIN: startFetching,
  START_ACT_EMAIL_LOGIN: startFetching,
  FETCH_ACT_LOGIN_SUCCESS: stopFetching,
  FETCH_COURSES_LIST_START: startFetching,
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
  FETCH_COURSE_DETAILS_START: startFetching,
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
  CANCEL_DOWNLOAD_VIDEO: (state, action) => ({
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
    currentTime: 0,
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

