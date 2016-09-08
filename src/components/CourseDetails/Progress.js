import React from 'react';
import ReactNative from 'react-native';

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
  barsContainer: {
    flexDirection: 'row',
    height: 18,
    borderWidth: 1,
    borderColor: '#cdcdcd',
  },
  barComplete: {
    backgroundColor: '#427fda',
  },
  barIncomplete: {
    backgroundColor: '#cdcdcd',
  },
});

const t = {
  lectureCompleteLable: 'レクチャーが完了しました',
};

const Progress = ({ completeLectureCount, totalLectureCount }) => {
  const completePercentage = completeLectureCount > 0
    ? (completeLectureCount / totalLectureCount) * 100 : 0;
  const incompletePercentage = 100 - completePercentage;
  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>{completeLectureCount}/{totalLectureCount}{t.lectureCompleteLable}</Text>
      <View style={styles.barsContainer}>
        <View style={[styles.barComplete, { flex: completePercentage }]} />
        <View style={[styles.barIncomplete, { flex: incompletePercentage }]} />
      </View>
    </View>
  );
};

Progress.propTypes = {
  completeLectureCount: PropTypes.number.isRequired,
  totalLectureCount: PropTypes.number.isRequired,
};

export default Progress;
