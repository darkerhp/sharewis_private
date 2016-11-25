import React from 'react';
import ReactNative from 'react-native';
import I18n from 'react-native-i18n';
import { _ } from 'lodash';

import BaseStyles from '../../baseStyles';
import NextLectureArea from './NextLectureArea';
import Duration from '../Duration';
import Progress from './Progress';

const { PropTypes } = React;
const { Platform, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  container: { padding: 10 },
  lectureAreaContainer: { flex: 3 },
  courseTitleWrapper: { flex: 1 },
  courseTitleText: {
    color: BaseStyles.textColor,
    fontSize: 16,
    fontWeight: '900',
  },
  totalDurationWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  totalDuration: {
    ...Platform.select({
      android: {
        width: 130,  // Or text will be trimmed in english
      },
    }),
    textAlign: 'center',
    color: BaseStyles.textColor,
    fontSize: 10,
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: '#F2F2F2',
  },
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
  handlePressNextLecture,
}) =>
  <View style={[styles.container, containerStyle]}>
    <View style={styles.courseTitleWrapper}>
      <Text style={styles.courseTitleText}>{courseTitle}</Text>
    </View>

    {!_.isEmpty(nextLecture) &&
      <NextLectureArea
        nextLecture={nextLecture}
        handlePressNextLecture={handlePressNextLecture}
        hidden
        containerStyleId={styles.lectureAreaContainer}
      />
    }

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
  </View>;


CourseInfoSection.propTypes = {
  courseTitle: PropTypes.string.isRequired,
  totalLectureCount: PropTypes.number.isRequired,
  completeLectureCount: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  nextLecture: PropTypes.shape({}).isRequired,
  handlePressNextLecture: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  containerStyle: PropTypes.object.isRequired,
};

export default CourseInfoSection;
