/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Duration from '../Duration';

describe('Duration', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Duration estimatedTime={100} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
