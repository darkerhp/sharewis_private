/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import EmptyList from '../CourseList/EmptyList';


describe('EmptyList', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <EmptyList />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
