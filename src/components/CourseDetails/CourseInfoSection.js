import React from 'react';
import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

import NextLectureArea from './NextLectureArea';
import Duration from '../Duration';
import Progress from './Progress';

const { PropTypes } = React;
const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  container: { padding: 10 },
  lectureAreaContainer: { flex: 3 },
  courseTitleWrapper: { flex: 1 },
  courseTitleText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '900',
  },
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


const CourseInfoSection = ({
  courseTitle,
  totalLectureCount,
  completeLectureCount,
  totalDuration,
  isCompleted,
  nextLecture,
  handlePressNextLecture,
  containerStyle,
}) =>
  <View style={[styles.container, containerStyle]}>
    <View style={styles.courseTitleWrapper}>
      <Text style={styles.courseTitleText}>{courseTitle}</Text>
    </View>

    {!isCompleted ?
      <NextLectureArea
        nextLecture={nextLecture}
        handlePressNextLecture={handlePressNextLecture}
        hidden
        containerStyleId={styles.lectureAreaContainer}
      /> : null
    }

    <Progress
      completeLectureCount={completeLectureCount}
      totalLectureCount={totalLectureCount}
    />

    <Duration
      duration={totalDuration}
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
  isCompleted: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  nextLecture: PropTypes.shape({
    /* eslint-disable react/no-unused-prop-types */
    order: PropTypes.number,
    title: PropTypes.string,
    kind: PropTypes.string,
    duration: PropTypes.number,
    isCompleted: PropTypes.bool,
    type: PropTypes.string,
    /* eslint-enable react/no-unused-prop-types */
  }).isRequired,
  handlePressNextLecture: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  containerStyle: PropTypes.object.isRequired,
};

export default CourseInfoSection;
