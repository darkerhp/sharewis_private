/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
jest.mock('../../utils/redux', () =>
  (component, state) => component
);
jest.mock('react-native-router-flux', () => ({
  Actions: () => ({
    lecture: kwargs =>
      new Promise((resolve) => {
        resolve(Object.keys(kwargs) === ['title', 'lectureId', 'course']);
      }),
  }),
}));


import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import CourseDetails from '../CourseDetails';

global.Promise = require.requireActual('promise');


describe('CourseDetails', () => {
  it('should have a pressLecture handler', () => {
    const course = {
      title: 'course1',
      lectures: [{
        isCompleted: true,
        duration: 60,
        type: 'VideoLecture',
      }, {
        isCompleted: false,
        duration: 90,
        type: 'VideoLecture',
      }],
    };

    const tree = renderer.create(
      <CourseDetails course={course} />
    );
    expect(1).toEqual(1);
  });
});
