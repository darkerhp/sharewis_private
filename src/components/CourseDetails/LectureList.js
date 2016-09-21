import React from 'react';
import ReactNative from 'react-native';

import BaseStyles from '../../baseStyles';

import Lecture from './Lecture';
import Section from './Section';

const { PropTypes } = React;
const { View, StyleSheet } = ReactNative;

const styles = StyleSheet.create({
  container: {
    borderColor: BaseStyles.borderColor,
    borderTopWidth: 1,
  },
});

const renderLecture = (key, lecture, handlePressLecture) => (
  lecture.kind === 'section'
    ? <Section key={key} lecture={lecture} />
    : <Lecture key={key} lecture={lecture} handlePressLecture={handlePressLecture} />
);

const LectureList = ({ lectures, containerStyleId, handlePressLecture }) =>
  <View style={[styles.container, containerStyleId]}>
    {lectures.map((lecture, i) => renderLecture(i, lecture, handlePressLecture))}
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
};

export default LectureList;
