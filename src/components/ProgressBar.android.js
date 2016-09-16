import React from 'react';
import ReactNative from 'react-native';

const { PropTypes } = React;
const { ProgressBarAndroid, StyleSheet } = ReactNative;

const styles = StyleSheet.create({
  progressView: {
  },
});


const ProgressBar = ({ progress }) =>
  <ProgressBarAndroid
    style={styles.progressView}
    progress={progress}
  />;

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
