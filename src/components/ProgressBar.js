import React from 'react';
import ReactNative from 'react-native';

const { PropTypes } = React;
const { StyleSheet, View } = ReactNative;

const styles = StyleSheet.create({
  progressView: {
    flexDirection: 'row',
    height: 18,
    backgroundColor: '#cdcdcd',
    borderColor: '#cdcdcd',
    borderWidth: 1,
  },
  currentProgress: {
    backgroundColor: '#427fda',
  },
});


const ProgressBar = ({ progress }) =>
  <View style={styles.progressView}>
    <View style={[styles.currentProgress, { flex: progress }]} />
    <View style={{ flex: 1 - progress }} />
  </View>;

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
