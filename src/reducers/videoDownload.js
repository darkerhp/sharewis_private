// 未実装
// TODO 動画ダウンロードのstateをentities.lectures.lectureから分離するように実装する
// 同時ダウンロードなどを考慮すると、ダウンロード状況をjobIdで管理する必要があるため
import { handleActions } from 'redux-actions';

const initialState = {
  /*
   * {
   *   [jobId] : {
   *     lectureId,
   *     percentage,
   *   }
   * }
   * */
  currentJob: {},
  queues: [],
};

const videoDownloadReducer = handleActions({
  BEGIN_DOWNLOAD_VIDEO: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  PROGRESS_DOWNLOAD_VIDEO: (state, action) => {
    const { lectureId, jobId, status } = action.payload;
    return {
      ...state,
      [jobId]: {
        ...state[lectureId],
        percentage: status,
      },
    };
  },
  FINISH_DOWNLOAD_VIDEO: (state, action) => {
    const lectureId = action.payload;
    // TODO 該当jobIdのデータを消す
    return state;
  },
  ERROR_DOWNLOAD_VIDEO: (state, action) => {
    const lectureId = action.payload;
    // TODO 該当jobIdのデータを消す
    return state;
  },
  CANCEL_DOWNLOAD_VIDEO: (state, action) => {
    const lectureId = action.payload;
    // TODO 該当jobIdのデータを消す
    return state;
  },
}, initialState);

export default videoDownloadReducer;

