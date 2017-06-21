/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import CourseInfoSection from '../CourseDetails/CourseInfoSection';

jest.mock('bugsnag-react-native', () => 'Bugsnag');
jest.mock('react-native-i18n', () => ({ t: () => '' }));
jest.mock('../Duration', () => 'Duration');
jest.mock('../CourseDetails/NextLectureArea', () => 'NextLectureArea');
jest.mock('../CourseDetails/Progress', () => 'Progress');

describe('CourseInfoSection', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <CourseInfoSection
        completeLectureCount={0}
        containerStyle={{}}
        courseTitle={'Title'}
        isCompleted={false}
        nextLecture={{}}
        totalLectureCount={10}
        totalDuration={100}
        handlePressNextLecture={() => null}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
