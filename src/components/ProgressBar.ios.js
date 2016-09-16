import React from 'react';
import ReactNative from 'react-native';

const { PropTypes } = React;
const { ProgressViewIOS, StyleSheet } = ReactNative;

const styles = StyleSheet.create({
  progressView: {
  },
});


const ProgressBar = ({ progress }) =>
  <ProgressViewIOS
    style={styles.progressView}
    progress={progress}
  />;

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
