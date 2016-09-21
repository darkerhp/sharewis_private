import React from 'react';
import ReactNative from 'react-native';

import Duration from '../Duration';

const { PropTypes } = React;
const { View, StyleSheet, Slider, Dimensions } = ReactNative;

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
    backgroundColor: 'white',
    fontWeight: 'normal',
    padding: 0,
  },
});

const SeekBar = ({ currentTime, duration, onValueChange }) => {
  const timeEnd = duration - currentTime;
  return (
    <View style={styles.container}>
      <Duration
        duration={currentTime}
        format={'mm:ss'}
        containerStyleId={styles.timeTextContainer}
        durationStyle={styles.timeText}
      />
      <Slider
        maximumValue={duration}
        value={currentTime}
        onValueChange={value => onValueChange(value)}
        style={styles.slider}
      />
      <Duration
        duration={timeEnd < 0 ? 0 : timeEnd}
        format={'mm:ss'}
        containerStyleId={styles.timeTextContainer}
        durationStyle={styles.timeText}
        prefixText={'-'}
      />
    </View>
  );
};


SeekBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default SeekBar;
