import React from 'react';
import ReactNative from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
require('moment-duration-format');

import BaseStyles from '../../baseStyles';

const { PropTypes } = React;
const { View, StyleSheet, Text, Slider, Dimensions } = ReactNative;

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  slider: {
    width: DEVICE_WIDTH - 132,
  },
  timeStart: {
    justifyContent: 'center',
    marginTop: 16,
    marginLeft: 10,
    marginRight: 10,
    width: 45,
    height: 7,
  },
  timeEnd: {
    justifyContent: 'center',
    marginTop: 16,
    marginLeft: 10,
    marginRight: 10,
    width: 45,
    height: 7,
  },
  timeStartText: {
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
  },
  timeEndText: {
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
  },
});

const SeekBar = ({ currentTime, duration, onValueChange }) =>
  <View style={styles.container}>
    <View style={styles.timeStart}>
      <Text
        style={styles.timeStartText}>{moment.duration(currentTime, 'seconds').format('mm:ss', { trim: false })}</Text>
    </View>
    <Slider maximumValue={duration} value={currentTime} onValueChange={(value) => this.refs.video.seek(value)}
            style={styles.slider}/>
    <View style={styles.timeEnd}>
      <Text
        style={styles.timeEndText}>-{moment.duration(duration - currentTime, 'seconds').format('mm:ss', { trim: false })}</Text>
    </View>
  </View>;

SeekBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.string.isRequired,
  handleValueChange: PropTypes.func.isRequired,
};

export default SeekBar;
