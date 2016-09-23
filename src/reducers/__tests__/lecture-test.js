/* eslint-disable no-undef */
import reducer from '../lecture';
import * as types from '../../constants/ActionTypes';

describe('Lecture reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isPaused: true,
      speed: 1,
      isFullScreen: false,
      duration: 0,
      currentTime: 0,
    });
  });

  it('should handle PRESS_PLAY', () => {
    expect(
      reducer({ isPaused: false }, { type: types.PRESS_PLAY })
    ).toEqual({
      isPaused: true,
    });
  });

  it('should handle PRESS_SPEED', () => {
    expect(
      reducer({ speed: 1 }, { type: types.PRESS_SPEED })
    ).toEqual({
      speed: 1.2,
    });

    // speed 2 to 1
    expect(
      reducer({ speed: 2 }, { type: types.PRESS_SPEED })
    ).toEqual({
      speed: 1,
    });
  });

  it('should handle UPDATE_VIDEO_PROGRESS', () => {
    expect(
      reducer({ currentTime: 0 }, { type: types.UPDATE_VIDEO_PROGRESS, currentTime: 1 })
    ).toEqual({
      currentTime: 1,
    });
  });
});
