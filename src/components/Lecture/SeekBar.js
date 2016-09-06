import React from 'react';
import ReactNative from 'react-native';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format'; // eslint-disable-line

const { PropTypes } = React;
const { View, StyleSheet, Text, Slider, Dimensions } = ReactNative;

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  slider: {
    width: (DEVICE_WIDTH - 90) * 0.9,
  },
  timeTextContainer: {
    justifyContent: 'center',
    width: 45,
  },
  timeText: {
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
  },
});

const SeekBar = ({ currentTime, duration, onValueChange }) => {
  const timeEnd = duration - currentTime;
  return (
    <View style={styles.container}>
      <View style={styles.timeTextContainer}>
        <Text style={styles.timeText}>
          {moment.duration(currentTime, 'seconds').format('mm:ss', { trim: false })}
        </Text>
      </View>
      <Slider
        maximumValue={duration}
        value={currentTime}
        onValueChange={value => onValueChange(value)}
        style={styles.slider}
      />
      <View style={styles.timeTextContainer}>
        <Text style={styles.timeText}>
          -{moment.duration(timeEnd < 0 ? 0 : timeEnd, 'seconds').format('mm:ss', { trim: false })}
        </Text>
      </View>
    </View>
  );
};


SeekBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default SeekBar;
