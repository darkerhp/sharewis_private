/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Progress from '../CourseDetails/Progress';

jest.mock('react-native-i18n', () => ({ t: () => '' }));
jest.mock('../ProgressBar', () => 'ProgressBar');

describe('Progress', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Progress
        completeLectureCount={0}
        totalLectureCount={10}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
