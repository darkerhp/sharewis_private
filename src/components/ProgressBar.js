import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import BaseStyles from '../lib/baseStyles';

const { StyleSheet, View } = ReactNative;

const styles = StyleSheet.create({
  progressView: {
    flexDirection: 'row',
    height: 18,
    backgroundColor: '#cdcdcd',
    borderColor: '#cdcdcd',
    borderWidth: 1
  },
  currentProgress: {
    backgroundColor: BaseStyles.navBarBackgroundColor
  }
});

const ProgressBar = ({ progress }) => (
  <View style={styles.progressView}>
    <View style={[styles.currentProgress, { flex: progress }]} />
    <View style={{ flex: 1 - progress }} />
  </View>
);

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired
};

export default ProgressBar;
