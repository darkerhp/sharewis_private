import React from 'react';
import ReactNative from 'react-native';

import BaseStyles from '../../baseStyles';

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

const renderLecture = (key, lecture, handlePressLecture, handlePressDownload) => (
  lecture.kind === 'section'
    ? <Section key={key} lecture={lecture} />
    : <LectureItem
      key={key}
      currentLecture={lecture}
      handlePressLecture={handlePressLecture}
      handlePressDownload={handlePressDownload}
    />
);

const LectureList = ({ lectures, containerStyleId, handlePressLecture, handlePressDownload }) =>
  <View style={[styles.container, containerStyleId]}>
    {lectures.map((lecture, i) => renderLecture(
      i,
      lecture,
      handlePressLecture,
      handlePressDownload)
    )}
  </View>;

LectureList.propTypes = {
  lectures: PropTypes.arrayOf(PropTypes.shape({
    /* eslint-disable react/no-unused-prop-types */
    order: PropTypes.number,
    title: PropTypes.string,
    kind: PropTypes.string,
    duration: PropTypes.number,
    isCompleted: PropTypes.bool,
    type: PropTypes.string,
    /* eslint-enable react/no-unused-prop-types */
  })).isRequired,
  handlePressLecture: PropTypes.func.isRequired,
  containerStyleId: PropTypes.number.isRequired,
  handlePressDownload: PropTypes.func.isRequired,
};

export default LectureList;
