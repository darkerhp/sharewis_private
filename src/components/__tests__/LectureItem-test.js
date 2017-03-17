/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import LectureItem from '../CourseDetails/LectureItem';

import Lecture from '../../models/Lecture';

jest.mock('../Duration', () => 'Duration');
jest.mock('bugsnag-react-native', () => 'Bugsnag');

describe('LectureItem', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <LectureItem
        isOnline
        handlePressDelete={() => null}
        handlePressDownload={() => null}
        handlePressLecture={() => null}
        lecture={new Lecture({
          status: 'not_started',
          order: 1,
          estimatedTime: 30,
          title: 'Title',
          type: 'video',
        })}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
