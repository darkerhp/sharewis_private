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

const renderLecture = (key, lecture) => (
  lecture.kind === 'section'
    ? <Section key={key} lecture={lecture} />
    : <Lecture key={key} lecture={lecture} />
);

const LectureList = ({ lectures, containerStyle }) =>
  <View style={[styles.container, containerStyle]}>
    {lectures.map((lecture, i) => renderLecture(i, lecture))}
  </View>;

LectureList.propTypes = {
  lectures: PropTypes.array.isRequired,
  containerStyle: PropTypes.object.isRequired,
};

export default LectureList;
