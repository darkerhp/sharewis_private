/* @flow */
import * as types from '../constants/ActionTypes';
import { loadCurrentLecture, completeCurrentLecture } from '../utils/reducers';


const initialState = {
  currentLecture: null,
  id: 0,
  imageUrl: null,  // TODO unused
  isFetching: false,
  isLectureDownloading: false,
  jobId: -1,
  lectureCount: 0,
  lectureProgress: 0,
  lectures: [],
  title: null,
};

// TODO 移動する
const lectureItemReducer = (state, action) => {
  if (state.id !== action.lectureId) return state;
  switch (action.type) {
    case types.BEGIN_DOWNLOAD_VIDEO:
      return {
        ...state,
        isDownloading: true,
      };
    case types.PROGRESS_DOWNLOAD_VIDEO:
      return {
        ...state,
        isDownloading: true,
        percentage: action.percentage,
      };
    case types.FINISH_DOWNLOAD_VIDEO:
      return {
        ...state,
        isDownloading: false,
        hasVideoInDevice: true,
      };
    case types.UPDATE_DOWNLOAD_STATUS:
      return {
        ...state,
        hasVideoInDevice: action.hasVideoInDevice,
      };
    default:
      return state;
  }
};

// TODO 移動する
const lectureListReducer = (state, action) => {
  switch (action.type) {
    case types.LOAD_COURSE:
    case types.BEGIN_DOWNLOAD_VIDEO:
    case types.FINISH_DOWNLOAD_VIDEO:
    case types.PROGRESS_DOWNLOAD_VIDEO:
    case types.UPDATE_DOWNLOAD_STATUS:
      return state.map(l => lectureItemReducer(l, action));
    default:
      return state;
  }
};


const courseDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COURSE_DETAILS_START:
      return {
        ...state,
        isFetching: state.lectures.length === 0,
      };
    case types.FETCH_COURSE_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case types.FETCH_COURSE_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lectureProgress: action.course.lecture_progress,
        lectures: action.lectures.map(
          ({ course_id, estimated_time, video_url, ...lecture }) => ({
            ...lecture,
            courseId: course_id,
            estimatedTime: estimated_time,
            videoUrl: video_url,
          }),
        ),
      };

    case types.LOAD_CURRENT_COURSE:
      return {
        ...state,
        ...action.currentCourse,
      };
    case types.LOAD_CURRENT_LECTURE:
      return loadCurrentLecture(state, action);
    case types.COMPLETE_CURRENT_LECTURE: {
      return completeCurrentLecture(state);
    }
    case types.PRESS_DOWNLOAD_VIDEO:
      return {
        ...state,
        isLectureDownloading: true,
      };
    case types.BEGIN_DOWNLOAD_VIDEO:
      return {
        ...state,
        lectures: lectureListReducer(state.lectures, action),
        jobId: action.jobId,
      };
    case types.PROGRESS_DOWNLOAD_VIDEO:
      return {
        ...state,
        lectures: lectureListReducer(state.lectures, action),
      };
    case types.FINISH_DOWNLOAD_VIDEO:
      return {
        ...state,
        isLectureDownloading: false,
        lectures: lectureListReducer(state.lectures, action),
        jobId: -1,
      };
    case types.UPDATE_DOWNLOAD_STATUS:
      return {
        ...state,
        lectures: lectureListReducer(state.lectures, action),
      };
    default:
      return state;
  }
};

export default courseDetailsReducer;
