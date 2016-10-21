import { handleActions } from 'redux-actions';

const initialState = {
  isConnected: false,
  queuedLectureProgress: {}, // { [lectureId]: [status]  }
};

const netInfoReducer = handleActions({
  MIDDLEWARE_NETINFO: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  QUEUE_LECTURE_PROGRESS: (state, action) => {
    const { lectureId, status } = action.payload;
    return {
      ...state,
      queuedLectureProgress: {
        ...state.queuedLectureProgress,
        [lectureId]: status,
      },
    };
  },
  TRIGGERED_QUEUE_ACTIONS: (state, action) => ({
    ...state,
    queuedLectureProgress: {},
  }),
}, initialState);

export default netInfoReducer;

