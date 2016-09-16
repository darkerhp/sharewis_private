import React from 'react';
import ReactNative from 'react-native';

const { PropTypes } = React;
const { StyleSheet, View } = ReactNative;

const styles = StyleSheet.create({
  progressView: {
    flex: 1,
    height: 1,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
  },
  currentProgress: {
    backgroundColor: 'darkgray',
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
