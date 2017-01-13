/* @flow */
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import Lecture from '../../models/Lecture';
import LectureMap from '../../models/LectureMap';

const initialState = new LectureMap();

const mergeEntities = (state, newLectures) =>
  state.merge(newLectures.map(lecture => new Lecture(lecture)));

const sectionsReducer = handleActions({
  FETCH_COURSE_DETAILS_SUCCESS: (state, action) => {
    const sections = action.payload.entities.sections;
    if (!sections) return state;
    return mergeEntities(state, fromJS(sections));
  },
}, initialState);

export default sectionsReducer;
