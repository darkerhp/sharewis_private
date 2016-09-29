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
  handlePressDelete,
  fetchDownloadStatus
) => (
  lecture.kind === LECTURE_KIND_SECTION
    ? <Section key={key} lecture={lecture} />
    :
    <LectureItem
      key={key}
      courseId={courseId}
      currentLecture={lecture}
      handlePressLecture={handlePressLecture}
      handlePressDownload={handlePressDownload}
      handlePressDelete={handlePressDelete}
      fetchDownloadStatus={fetchDownloadStatus}
    />
);

const LectureList = ({
  courseId,
  lectures,
  containerStyleId,
  handlePressLecture,
  handlePressDelete,
  handlePressDownload,
  fetchDownloadStatus }) =>
  <View style={[styles.container, containerStyleId]}>
    {lectures.map((lecture, i) => renderLecture(
      i,
      courseId,
      lecture,
      handlePressLecture,
      handlePressDownload,
      handlePressDelete,
      fetchDownloadStatus)
    )}
  </View>;

LectureList.propTypes = {
  // props
  containerStyleId: PropTypes.number.isRequired,
  courseId: PropTypes.number.isRequired,
  lectures: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // actions
  handlePressLecture: PropTypes.func.isRequired,
  handlePressDelete: PropTypes.func.isRequired,
  handlePressDownload: PropTypes.func.isRequired,
  fetchDownloadStatus: PropTypes.func.isRequired,
};

export default LectureList;
