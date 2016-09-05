import React from 'react';
import ReactNative from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import BaseStyles from '../../baseStyles';

const { PropTypes } = React;
const { View, StyleSheet } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  playButton: {
    fontSize: 40,
    height: 40,
    color: 'white',
  },
  rateButton: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  fullScreenButton: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

const VideoControls = ({ isPaused, onPressPlay }) =>
  <View style={styles.container}>
    <ActionButton
      position={'left'}
      offsetY={0}
      size={78}
      icon={<Icon name={isPaused ? 'ios-play' : 'ios-pause'} style={styles.playButton} />}
      buttonColor={BaseStyles.mainColorBlue}
      onPress={onPressPlay}
    />
    {/* TODO rateButton 実装する */}
    <ActionButton
      position={'center'}
      offsetY={0}
      icon={<Icon name={isPaused ? 'ios-play' : 'ios-pause'} style={styles.rateButton} />}
      buttonColor={BaseStyles.mainColorBlue}
      onPress={onPressPlay}
    />
    {/* TODO fullScreenButton 実装する */}
    <ActionButton
      position={'right'}
      offsetY={0}
      icon={<Icon name={isPaused ? 'ios-play' : 'ios-pause'} style={styles.fullScreenButton} />}
      buttonColor={BaseStyles.mainColorBlue}
      onPress={onPressPlay}
    />
  </View>;

VideoControls.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  onPressPlay: PropTypes.func.isRequired,
};

export default VideoControls;
