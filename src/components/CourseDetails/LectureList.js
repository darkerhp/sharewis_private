import React from 'react';
import ReactNative from 'react-native';

import BaseStyles from '../../baseStyles';
import { LECTURE_KIND_SECTION } from '../../constants/Api';
import LectureItem from './LectureItem';
import Section from './Section';

const { PropTypes } = React;
const { View, StyleSheet } = ReactNative;

const styles = StyleSheet.create({
  container: {
    borderColor: BaseStyles.borderColor,
    borderTopWidth: 1,
  },
});

const renderLecture = (
  key,
  courseId,
  lecture,
  handlePressLecture,
  handlePressDownload,
  fetchDownloadStatus
) => (
  lecture.kind === LECTURE_KIND_SECTION
    ? <Section key={key} lecture={lecture} />
    : <LectureItem
      key={key}
      courseId={courseId}
      currentLecture={lecture}
      handlePressLecture={handlePressLecture}
      handlePressDownload={handlePressDownload}
      fetchDownloadStatus={fetchDownloadStatus}
    />
);

const LectureList = ({
  courseId,
  lectures,
  containerStyleId,
  handlePressLecture,
  handlePressDownload,
  fetchDownloadStatus }) =>
  <View style={[styles.container, containerStyleId]}>
    {lectures.map((lecture, i) => renderLecture(
      i,
      courseId,
      lecture,
      handlePressLecture,
      handlePressDownload,
      fetchDownloadStatus)
    )}
  </View>;

LectureList.propTypes = {
  lectures: PropTypes.arrayOf(PropTypes.shape({
    /* eslint-disable react/no-unused-prop-types */
    order: PropTypes.number,
    title: PropTypes.string,
    kind: PropTypes.string,
    estimatedTime: PropTypes.number,
    status: PropTypes.string,
    type: PropTypes.string,
    /* eslint-enable react/no-unused-prop-types */
  })).isRequired,
  handlePressLecture: PropTypes.func.isRequired,
  containerStyleId: PropTypes.number.isRequired,
  handlePressDownload: PropTypes.func.isRequired,
  fetchDownloadStatus: PropTypes.func.isRequired,
  courseId: PropTypes.number.isRequired,
};

export default LectureList;
