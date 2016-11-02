/* eslint-disable no-undef */
import { createAction } from 'redux-actions';

import reducer from '../entities/lectures';
import * as types from '../../constants/ActionTypes';
import { LECTURE_STATUS_FINISHED } from '../../constants/Api';


describe('lectures reducer', () => {
  it('should handle COMPLETE_LECTURE', () => {
    const lectureId = 1;
    expect(
      reducer(
        { [lectureId]: { status: null } },
        createAction(types.COMPLETE_LECTURE)(lectureId),
      )
    ).toEqual({ [lectureId]: { status: LECTURE_STATUS_FINISHED } });
  });
});
