/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import LectureList from '../CourseDetails/LectureList';

jest.mock('../CourseDetails/LectureItem', () => 'LectureItem');

describe('LectureList', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <LectureList
        courseId={0}
        lectures={[]}
        containerStyleId={0}
        handlePressDelete={() => null}
        handlePressDownload={() => null}
        handlePressLecture={() => null}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
