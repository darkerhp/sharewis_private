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

const renderLecture = params => (
  params.lecture.kind === LECTURE_KIND_SECTION
    ? <Section key={params.key} lecture={params.lecture} />
    : <LectureItem {...params} />
);

const LectureList = ({
  // values
  containerStyleId,
  courseId,
  isOnline,
  lectures,
  // actions
  handlePressDelete,
  handlePressDownload,
  handlePressLecture,
}) =>
  <View style={[styles.container, containerStyleId]}>
    {lectures.map((lecture, i) => renderLecture({
      key: i,
      courseId,
      isOnline,
      lecture,
      handlePressLecture,
      handlePressDownload,
      handlePressDelete,
    }))}
  </View>;

LectureList.propTypes = {
  // values
  containerStyleId: PropTypes.number.isRequired,
  courseId: PropTypes.number.isRequired,
  isOnline: PropTypes.bool.isRequired,
  lectures: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // actions
  handlePressLecture: PropTypes.func.isRequired,
  handlePressDelete: PropTypes.func.isRequired,
  handlePressDownload: PropTypes.func.isRequired,
};

export default LectureList;
