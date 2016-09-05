/* eslint-disable no-undef */
import reducer from '../lecture';
import * as types from '../../constants/ActionTypes';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        isPaused: false,
        rate: 1,
        isFullScreen: false,
      },
    );
  });

  it('should handle PRESS_PLAY', () => {
    expect(
      reducer(undefined, { type: types.PRESS_PLAY })
    ).toEqual({
      isPaused: true,
      rate: 1,
      isFullScreen: false,
    });
  });

  it('should handle PRESS_RATE', () => {
    expect(
      reducer(undefined, { type: types.PRESS_RATE })
    ).toEqual({
      isPaused: false,
      rate: 1.2,
      isFullScreen: false,
    });

    // rate 2 to 1
    expect(
      reducer({ rate: 2 }, { type: types.PRESS_RATE })
    ).toEqual({
      rate: 1,
    });
  });
});
