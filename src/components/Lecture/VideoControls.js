import React from 'react';
import ReactNative from 'react-native';

import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/MaterialIcons';

import BaseStyles from '../../baseStyles';

const { PropTypes } = React;
const { View, StyleSheet, TouchableOpacity, Text } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  playButton: {
    width: 78,
    height: 78,
    borderRadius: 78 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseStyles.mainColorBlue,
  },
  playButtonIcon: {
    fontSize: 40,
    height: 44,
    color: 'white',
  },
  rateButton: {
    width: 62,
    height: 62,
    borderRadius: 62 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseStyles.mainColorBlue,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  fullScreenButton: {
    width: 62,
    height: 62,
    borderRadius: 62 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseStyles.mainColorBlue,
  },
  fullScreenButtonIcon: {
    fontSize: 28,
    height: 28,
    color: 'white',
  }
});

const VideoControls = ({ isPaused, rate, onPressPlay, onPressRate }) =>
  <View style={styles.container}>
    <Button
      containerStyle={styles.playButton}
      style={styles.buttonText}
      onPress={onPressPlay}
    >
      <Icon
        name={isPaused ? 'play-arrow' : 'pause'}
        style={[styles.buttonColor, styles.playButtonIcon]}
      />
    </Button>
    <Button
      containerStyle={styles.rateButton}
      style={styles.buttonText}
      onPress={onPressRate}
    >
      x{rate}{rate % 1 === 0 ? '.0' : ''}
    </Button>
    {/* TODO fullScreenButton 実装する */}
    <Button
      containerStyle={styles.rateButton}
      style={styles.buttonText}
      onPress={(e)=> console.log(e)}
    >
      <Icon
        name={'fullscreen'}
        style={[styles.buttonColor, styles.fullScreenButtonIcon]}
      />
    </Button>
  </View>;


VideoControls.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  onPressPlay: PropTypes.func.isRequired,
  rate: PropTypes.number.isRequired,
  onPressRate: PropTypes.func.isRequired,
  // isFullScreen: PropTypes.bool.isRequired,
  // onPressFullScreen: PropTypes.func.isRequired,
};

export default VideoControls;
