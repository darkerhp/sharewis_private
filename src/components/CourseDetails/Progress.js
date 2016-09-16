import React from 'react';
import ReactNative from 'react-native';
import ProgressBar from '../ProgressBar';

const { PropTypes } = React;
const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  progressText: {
    marginBottom: 5,
  },
});

const t = {
  lectureCompleteLabel: (progress, total) =>
    `${progress}/${total}のレクチャーが完了しました`,
};

const Progress = ({ completeLectureCount, totalLectureCount }) =>
  <View style={styles.container}>
    <Text style={styles.progressText}>
      {t.lectureCompleteLabel(completeLectureCount, totalLectureCount)}
    </Text>
    <ProgressBar progress={completeLectureCount / totalLectureCount} />
  </View>;

Progress.propTypes = {
  completeLectureCount: PropTypes.number.isRequired,
  totalLectureCount: PropTypes.number.isRequired,
};

export default Progress;
