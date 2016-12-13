import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

import Duration from '../Duration';

const { Platform, View, StyleSheet, Slider } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  slider: {
    flex: 1,
    ...Platform.select({
      android: {
        backgroundColor: '#eee',
      },
    }),
  },
  timeTextContainer: {
    justifyContent: 'center',
    width: 60,
    marginHorizontal: 10,
  },
  timeText: {
    color: '#bdbdbd',
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.9,
    padding: 0,
    textAlign: 'center',
  },
});

const SeekBar = ({
  currentTime,
  estimatedTime,
  isFullScreen,
  onValueChange,
  onSlidingComplete,
}) => {
  const timeEnd = estimatedTime - currentTime;
  return (
    <View style={styles.container}>
      <Duration
        estimatedTime={currentTime}
        format={'mm:ss'}
        containerStyle={styles.timeTextContainer}
        durationStyle={[styles.timeText, isFullScreen && { color: 'white' }]}
      />
      <Slider
        maximumValue={estimatedTime}
        value={currentTime}
        onSlidingComplete={value => onSlidingComplete(value)}
        onValueChange={value => onValueChange(value)}
        style={styles.slider}
      />
      <Duration
        estimatedTime={timeEnd < 0 ? 0 : timeEnd}
        format={'mm:ss'}
        containerStyle={styles.timeTextContainer}
        durationStyle={[styles.timeText, isFullScreen && { color: 'white' }]}
        prefixText={'-'}
      />
    </View>
  );
};


SeekBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  estimatedTime: PropTypes.number.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onSlidingComplete: PropTypes.func.isRequired,
};

export default SeekBar;
