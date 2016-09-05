/* eslint-disable no-undef */
import reducer from '../lecture';
import * as types from '../../constants/ActionTypes';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        isPaused: false,
        speed: 1,
        isFullScreen: false,
      },
    );
  });

  it('should handle PRESS_PLAY', () => {
    expect(
      reducer(undefined, { type: types.PRESS_PLAY })
    ).toEqual({
      isPaused: true,
      speed: 1,
      isFullScreen: false,
    });
  });

  it('should handle PRESS_SPEED', () => {
    expect(
      reducer(undefined, { type: types.PRESS_SPEED })
    ).toEqual({
      isPaused: false,
      speed: 1.2,
      isFullScreen: false,
    });

    // speed 2 to 1
    expect(
      reducer({ speed: 2 }, { type: types.PRESS_SPEED })
    ).toEqual({
      speed: 1,
    });
  });
});
