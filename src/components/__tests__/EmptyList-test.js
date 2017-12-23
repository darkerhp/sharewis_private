/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import EmptyList from '../CourseList/EmptyList';

jest.mock('../../utils/linking', () => () => 'redirectTo');
jest.mock('react-native-i18n', () => ({
  currentLocale: () => '',
  t: () => 'Required'
}));

describe('EmptyList', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<EmptyList isFetching />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
