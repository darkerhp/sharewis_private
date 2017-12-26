/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import NextLectureArea from '../CourseDetails/NextLectureArea';

jest.mock('bugsnag-react-native', () => 'Bugsnag');
jest.mock('react-native-i18n', () => ({ t: () => '' }));

describe('NextLectureArea', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <NextLectureArea
          containerStyleId={0}
          handlePressNextLecture={() => null}
          nextLecture={{
            type: 'lecture'
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
