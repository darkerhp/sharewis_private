/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import SeekBar from '../Lecture/SeekBar';

jest.mock('../Duration', () => 'Duration');
jest.mock('Slider', () => 'Slider');

describe('SeekBar', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <SeekBar
        currentTime={10}
        estimatedTime={100}
        onValueChange={() => null}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
