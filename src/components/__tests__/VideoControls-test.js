/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import VideoControls from '../Lecture/SeekBar';

jest.mock('react-native-button', () => 'Button');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

describe('VideoControls', () => {
  it('renders correctly #TODO', () => {
    // TODO fix issue unknown unmocked element raise error:
    // TypeError: Cannot read property '_tag' of undefined
    // const tree = renderer.create(
    //   <VideoControls
    //     isPaused
    //     onPressPlay={() => null}
    //     onPressSpeed={() => null}
    //     speed={1}
    //   />
    // ).toJSON();
    // expect(tree).toMatchSnapshot();
  });
});
