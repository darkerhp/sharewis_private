import { handleActions } from 'redux-actions';

const initialState = {
  currentCourseId: 0,
  currentLectureId: 0,
  isFetching: false,
  isLastLecture: false,
  isLectureDownloading: false,
  // VideoPlayer
  isFullScreen: false,
  speed: 1.0,
  //
  fetchedCourseDetailsAt: null,
  fetchedMyCourseAt: null,
  //
  isFinishOnboarding: false,
};

const speedList = [1.0, 1.2, 1.5, 2.0];

const startFetching = state => ({ ...state, isFetching: true });
const stopFetching = state => ({ ...state, isFetching: false });

const uiReducer = handleActions({
  INIT_APP: (state, action) => ({ ...initialState }),
  FETCH_ACT_LOGIN_FAILURE: stopFetching,
  FETCH_ACT_LOGIN_SUCCESS: stopFetching,
  FETCH_ACT_SIGNUP_FAILURE: stopFetching,
  FETCH_ACT_SIGNUP_SUCCESS: stopFetching,
  FETCH_FB_EMAIL_FAILURE: stopFetching,
  FETCH_FB_EMAIL_SUCCESS: startFetching,
  START_ACT_EMAIL_LOGIN: startFetching,
  START_ACT_EMAIL_SIGNUP: startFetching,
  START_ACT_FACEBOOK_LOGIN: startFetching,
  FETCH_MY_COURSE_START: startFetching,
  FETCH_MY_COURSE_FAILURE: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }),
  FETCH_MY_COURSE_SUCCESS: (state, action) => ({ // TODO isFetchingをLocal Stateに変更して削除予定
    ...state,
    isFetching: false,
    fetchedMyCourseAt: Date.now(),
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
    // レクチャー画面表示前に呼ばれるアクション
    ...state,
    currentLectureId: action.payload,
    currentTime: 0,
    isPaused: true,
    isStarted: false,
  }),
  TOGGLE_FULL_SCREEN: (state, action) => ({
    ...state,
    isFullScreen: !state.isFullScreen,
  }),
  CHANGE_VIDEO_PLAY_SPEED: (state, action) => {
    const currentIndex = speedList.indexOf(state.speed);
    const index = (currentIndex === speedList.length - 1) ? 0 : currentIndex + 1;
    return {
      ...state,
      speed: speedList[index],
    };
  },
  FINISH_ONBOARDING: (state, action) => ({
    ...state,
    isFinishOnboarding: true,
  }),
}, initialState);

export default uiReducer;

