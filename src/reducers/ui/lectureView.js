/* @flow */
// TODO video と lecture, lectures分けたほうがよさげ
import * as types from '../../constants/ActionTypes';
import * as ApiConstants from '../../constants/Api';
import replaceInList from '../../utils/list';

// export for unittesting
export const initialState = {
  isLastLecture: false,  // added in course reducer utils
};

const lectureViewReducer = (state = initialState, action) => {
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
    case types.LOAD_LECTURE: {
      return {
        ...state,
        ...action.lecture,
      };
    }
    default:
      return state;
  }
};

export default lectureViewReducer;
