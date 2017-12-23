import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

import BaseStyles from '../../lib/baseStyles';
import NextLectureArea from './NextLectureArea';
import Duration from '../Duration';
import Progress from './Progress';
import Lecture from '../../modules/models/Lecture';

const { Platform, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  container: { padding: 10 },
  lectureAreaContainer: { flex: 3 },
  courseTitleWrapper: { flex: 1 },
  courseTitleText: {
    color: BaseStyles.textColor,
    fontSize: 16,
    fontWeight: '900'
  },
  totalDurationWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  totalDuration: {
    ...Platform.select({
      android: {
        width: 130 // Or text will be trimmed in english
      }
    }),
    textAlign: 'center',
    color: BaseStyles.textColor,
    fontSize: 10,
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: '#F2F2F2'
  }
});

const CourseInfoSection = ({
  // values
  completeLectureCount,
  containerStyle,
  courseTitle,
  nextLecture,
  totalLectureCount,
  totalDuration,
  // actions
  handlePressNextLecture
}) => (
  <View style={[styles.container, containerStyle]}>
    <View style={styles.courseTitleWrapper}>
      <Text style={styles.courseTitleText}>{courseTitle}</Text>
    </View>

    {nextLecture && (
      <NextLectureArea
        nextLecture={nextLecture}
        handlePressNextLecture={handlePressNextLecture}
        hidden
        containerStyle={styles.lectureAreaContainer}
      />
    )}

    <Progress
      completeLectureCount={completeLectureCount}
      totalLectureCount={totalLectureCount}
    />

    <Duration
      estimatedTime={totalDuration}
      format={I18n.t('totalDurationFormat')}
      containerStyleId={styles.totalDurationWrapper}
      durationStyleId={styles.totalDuration}
    />
  </View>
);

CourseInfoSection.propTypes = {
  courseTitle: PropTypes.string.isRequired,
  totalLectureCount: PropTypes.number.isRequired,
  completeLectureCount: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  nextLecture: PropTypes.instanceOf(Lecture),
  handlePressNextLecture: PropTypes.func.isRequired,
  containerStyle: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

CourseInfoSection.defaultProps = {
  nextLecture: null
};

export default CourseInfoSection;
