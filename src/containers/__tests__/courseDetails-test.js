/* eslint-disable no-undef */
/* eslint-disable no-console */
import React from 'react';
import 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';
import CourseDetails from '../CourseDetails';
import { courses } from '../../data/dummyData';
import {
  loadCurrentLecture,
  pressDownloadVideo,
  beginDownloadVideo,
  progressDownloadVideo,
  finishDownloadVideo,
  errorDownloadVideo,
} from '../../actions/courseDetails';

global.Promise = require.requireActual('promise');


// Mock the connectToProps method, we do not need the store
jest.mock('../../utils/redux', () => ({
  connectState: state => component => component,
  connectActions: action => component => component,
}));
// Mock the router actions, we do not need redirect
jest.mock('react-native-router-flux', () => ({
  Actions: {
    lecture: kwargs =>
      new Promise(resolve => resolve(kwargs)),
  },
}));
// Mock the RNFS
jest.mock('react-native-fs', () => ({
  exists: path => new Promise(resolve => resolve(path)),
  unlink: path => new Promise(resolve => resolve(path)),
  downloadFile: path => new Promise(resolve => resolve(path)),
}));


describe('CourseDetails', () => {
  beforeEach(() => {
    instance = new CourseDetails({ ...courses[0] });
    instance.props.loadCurrentLecture = loadCurrentLecture;
    instance.props.pressDownloadVideo = pressDownloadVideo;
    instance.props.beginDownloadVideo = beginDownloadVideo;
    instance.props.progressDownloadVideo = progressDownloadVideo;
    instance.props.finishDownloadVideo = finishDownloadVideo;
    instance.props.errorDownloadVideo = errorDownloadVideo;
  });

  it('should have a pressLecture handler', async () => {
    const result = await instance.handlePressLecture(courses[0].lectures[1]);
    expect(result).toEqual({
      title: 'レクチャーA',
    });
  });

  it('should have a pressNextLecture handler', async () => {
    const result = await instance.handlePressNextLecture();
    expect(result).toEqual({
      title: 'レクチャーH',
    });
  });

  it('should have a pressDownload handler', async () => {
    await instance.handlePressDownload({
      id: 1, url: 'hoge',
    });
  });

  it('should have a pressDelete handler', async () => {
    await instance.handlePressDelete({
      id: 1, url: 'hoge',
    });
  });
});
