import 'react-native';
// Note: test renderer must be required after react-native.
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import renderer from 'react-test-renderer';
import React from 'react';
import Root from '../Root';

/* global describe, it, expect, jest */
jest.mock('ActivityIndicatorIOS', (): ReactComponent => 'ActivityIndicatorIOS');
jest.mock('ProgressBarAndroid', (): ReactComponent => 'ProgressBarAndroid');
jest.mock('TouchableNativeFeedback', (): ReactComponent => 'TouchableNativeFeedback');
jest.mock('TextInput', (): ReactComponent => 'TextInput');

describe('Root', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Root />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
