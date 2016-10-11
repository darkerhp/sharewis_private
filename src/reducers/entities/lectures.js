/* @flow */
import * as types from '../../constants/ActionTypes';
import { ACT_API_CACHE } from '../../constants/Api';
import {
  fetchCourseDetailsSuccess,
  loadCurrentLecture,
  completeCurrentLecture,
} from '../../utils/reducers';


const getInitialState = () => ({
  currentLecture: null,
  fetchedAt: Date.now() - ACT_API_CACHE, // 1h ago
  id: 0,
  imageUrl: null,  // TODO unused
  isFetching: false,
  isLectureDownloading: false,
  jobId: -1,
  lectureCount: 0,
  lectureProgress: 0,
  lectures: [],
  title: null,
});

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
    case types.ERROR_DOWNLOAD_VIDEO:
      return {
        ...state,
        isDownloading: false,
        hasVideoInDevice: false,
      };
    case types.FINISH_DELETE_VIDEO:
      return {
        ...state,
        hasVideoInDevice: false,
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
    case types.ERROR_DOWNLOAD_VIDEO:
    case types.FINISH_DELETE_VIDEO:
      return state.map(l => lectureItemReducer(l, action));
    default:
      return state;
  }
};

const lecture = (state, action) => {
  switch (action.type) {
    case types.COMPLETE_LECTURE: {
      const { lectureId } = action.payload;
      const currentLecture = state.entities.lectures[lectureId];
      currentLecture.status = ApiConstants.LECTURE_STATUS_FINISHED;

      return {
        ...state,
        [lectureId]: currentLecture,
      };
    }
    default:
      return state;
  }
};


const courseDetailsReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case types.FETCH_COURSE_DETAILS_SUCCESS:
      return fetchCourseDetailsSuccess(state, action);
    case types.COMPLETE_CURRENT_LECTURE: {
      return completeCurrentLecture(state);
    }
    case types.BEGIN_DOWNLOAD_VIDEO:
      return {
        ...state,
        lectures: lectureListReducer(state.entities.lectures, action),
        jobId: action.jobId,
      };
    case types.PROGRESS_DOWNLOAD_VIDEO:
      return {
        ...state,
        lectures: lectureListReducer(state.entities.lectures, action),
      };
    case types.FINISH_DOWNLOAD_VIDEO:
      return {
        ...state,
        lectures: lectureListReducer(state.entities.lectures, action),
        jobId: -1,
      };
    case types.ERROR_DOWNLOAD_VIDEO:
      return {
        ...state,
        lectures: lectureListReducer(state.entities.lectures, action),
        jobId: -1,
      };
    case types.UPDATE_VIDEO_IN_DEVICE_STATUS:
      return {
        ...state,
        lectures: action.entities.lectures,
      };
    default:
      return state;
  }
};

export default courseDetailsReducer;
