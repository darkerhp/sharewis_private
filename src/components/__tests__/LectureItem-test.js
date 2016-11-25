/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import LectureItem from '../CourseDetails/LectureItem';

jest.mock('../Duration', () => 'Duration');

describe('LectureItem', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <LectureItem
        isOnline
        handlePressDelete={() => null}
        handlePressDownload={() => null}
        handlePressLecture={() => null}
        lecture={{
          status: 'not_started',
          order: 1,
          estimatedTime: 30,
          title: 'Title',
          type: 'video',
        }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
