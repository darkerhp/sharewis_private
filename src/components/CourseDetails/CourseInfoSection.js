import React from 'react';
import ReactNative from 'react-native';

import NextLectureArea from './NextLectureArea';
import Duration from '../Duration';
import Progress from './Progress';

const { PropTypes } = React;
const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  courseTitleWrapper: { flex: 1 },
  courseTitleText: { color: 'black', fontSize: 16, fontWeight: '900' },
  totalDurationWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  totalDuration: {
    color: 'black',
    fontSize: 10,
    padding: 5,
    backgroundColor: '#F2F2F2',
  },
});

const t = {
  totalDurationFormat: '計 h時間m分',
};

const CourseInfoSection = ({
  courseTitle,
  totalLectureCount,
  completeLectureCount,
  totalDuration,
  nextLecture,
  handlePressNextLecture,
  containerStyle,
}) => (
  <View style={[styles.container, containerStyle]}>
    <View style={styles.courseTitleWrapper}>
      <Text style={styles.courseTitleText}>{courseTitle}</Text>
    </View>

    <NextLectureArea
      nextLecture={nextLecture}
      handlePressNextLecture={handlePressNextLecture}
      containerStyle={{ flex: 3 }}
    />

    <Progress
      completeLectureCount={completeLectureCount}
      totalLectureCount={totalLectureCount}
    />

    <Duration
      duration={totalDuration}
      format={t.totalDurationFormat}
      containerStyle={styles.totalDurationWrapper}
      durationStyle={styles.totalDuration}
    />
  </View>
);


CourseInfoSection.propTypes = {
  courseTitle: PropTypes.string.isRequired,
  totalLectureCount: PropTypes.number.isRequired,
  completeLectureCount: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  nextLecture: PropTypes.object.isRequired, // TODO shape
  handlePressNextLecture: PropTypes.func.isRequired,
  containerStyle: PropTypes.object.isRequired,
};

export default CourseInfoSection;
