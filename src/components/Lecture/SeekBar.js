import React from 'react';
import ReactNative from 'react-native';

import Duration from '../Duration';

const { PropTypes } = React;
const { Platform, View, StyleSheet, Slider, Dimensions } = ReactNative;

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  slider: {
    width: (DEVICE_WIDTH - 90) * 0.8,
    ...Platform.select({
      android: {
        backgroundColor: '#eee',
      },
    }),
  },
  timeTextContainer: {
    flex: 1,
    justifyContent: 'center',
    width: 60,
  },
  timeText: {
    color: '#bdbdbd',
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.8,
    padding: 0,
    textAlign: 'center',
  },
});

const SeekBar = ({ currentTime, estimatedTime, onValueChange }) => {
  const timeEnd = estimatedTime - currentTime;
  return (
    <View style={styles.container}>
      <Duration
        estimatedTime={currentTime}
        format={'mm:ss'}
        containerStyleId={styles.timeTextContainer}
        durationStyleId={styles.timeText}
      />
      <Slider
        maximumValue={estimatedTime}
        value={currentTime}
        onValueChange={value => onValueChange(value)}
        style={styles.slider}
      />
      <Duration
        estimatedTime={timeEnd < 0 ? 0 : timeEnd}
        format={'mm:ss'}
        containerStyleId={styles.timeTextContainer}
        durationStyleId={styles.timeText}
        prefixText={'-'}
      />
    </View>
  );
};


SeekBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  estimatedTime: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default SeekBar;
