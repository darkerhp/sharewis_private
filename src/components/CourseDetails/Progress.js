import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import I18n from 'react-native-i18n';
import ProgressBar from '../ProgressBar';
import BaseStyle from '../../lib/baseStyles';

const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  progressText: {
    marginBottom: 5,
    color: BaseStyle.textColor,
  },
});


const Progress = ({ completeLectureCount, totalLectureCount }) =>
  (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        {`${completeLectureCount}/${totalLectureCount} ${I18n.t('progressText')}`}
      </Text>
      <ProgressBar progress={completeLectureCount / totalLectureCount} />
    </View>
  );

Progress.propTypes = {
  completeLectureCount: PropTypes.number.isRequired,
  totalLectureCount: PropTypes.number.isRequired,
};

export default Progress;
