import 'react-native';
// Note: test renderer must be required after react-native.
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import renderer from 'react-test-renderer';
import React from 'react';
import Root from '../root';

/* global describe, it, expect */

describe('Root', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Root />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
