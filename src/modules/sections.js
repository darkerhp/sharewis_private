/* eslint no-console: ["error", { allow: ["error", "log"] }] */
/* @flow */
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';

import _ from 'lodash';

import Lecture from './models/Lecture';
import LectureMap from './models/LectureMap';

// Actions

// Reducer
const initialState = new LectureMap();

const mergeEntities = (state, newSections) =>
  state.merge(newSections.map(section => new Lecture(section)));

const reducer = handleActions({
  FETCH_COURSE_DETAILS_SUCCESS: (state, action) => {
    const sections = action.payload.entities.sections;
    if (!sections) return state;
    return mergeEntities(state, fromJS(sections));
  },
  // redux-persistのrehydrate用のreducer
  // Immutable.jsを使用する場合、変換が必要
  [REHYDRATE]: (state, action) => {
    if (!Object.prototype.hasOwnProperty.call(action.payload, 'entities')) return state;
    const sections = action.payload.entities.sections;
    if (_.isEmpty(sections)) return initialState;
    return mergeEntities(initialState, fromJS(sections));
  },
}, initialState);

export default reducer;

// Action Creators

// side effects, only as applicable
// e.g. thunks, epics, etc
