/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import ProgressBar from '../ProgressBar';

describe('ProgressBar', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProgressBar progress={20} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
