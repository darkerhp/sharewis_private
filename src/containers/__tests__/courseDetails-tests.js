/* eslint-disable no-undef */
/* eslint-disable no-console */
import React from 'react';
import 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';
import CourseDetails from '../CourseDetails';
import { courses } from '../../data/dummyData';

global.Promise = require.requireActual('promise');


// Mock the connectToProps method, we do not need the store
jest.mock('../../utils/redux', () =>
  (component, stateIgnored) => component
);
// Mock the router actions, we do not need redirect
jest.mock('react-native-router-flux', () => ({
  Actions: {
    lecture: kwargs =>
      new Promise(resolve => resolve(kwargs)),
  },
}));


describe('CourseDetails', () => {
  beforeEach(() => {
    instance = new CourseDetails({ course: courses[0] });
  });

  it('should have a pressLecture handler', (async) () => {
    const result = await instance.handlePressLecture(courses[0].lectures[1]);
    expect(result.title).toEqual('レクチャーA');
    expect(result.lectureId).toEqual(1);
  });

  it('should have a pressNextLecture handler', (async) () => {
    const result = await instance.handlePressNextLecture();
    expect(result.title).toEqual('レクチャーH');
    expect(result.lectureId).toEqual(8);
  });
});
