/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import EmptyList from '../CourseList/EmptyList';

jest.mock('react-native-loading-spinner-overlay', () => 'Spinner');
jest.mock('../../utils/linking', () =>
  () => 'redirectTo',
);


describe('EmptyList', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <EmptyList isFetching />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
