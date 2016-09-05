import React from 'react';
import ReactNative from 'react-native';

import ActionButton from 'react-native-action-button';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BaseStyles from '../../baseStyles';

const { PropTypes } = React;
const { View, StyleSheet, TouchableOpacity, Text } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  buttonColor: {
    color: 'white',
  },
  playButton: {
    fontSize: 40,
    height: 44,
  },
  playSpeedButton: {
    width: 58,
    height: 58,
    marginLeft: 10,
    borderRadius: 58 * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: BaseStyles.mainColorBlue,
  },
  rateButton: {
    fontSize: 20,
    height: 22,
  },
  fullScreenButton: {
    fontSize: 20,
    height: 22,
  },
});

const VideoControls = ({ isPaused, rate, onPressPlay, onPressRate, onPressFullScreen }) =>
  <View style={styles.container}>
    <ActionButton
      position={'left'}
      offsetY={0}
      size={78}
      icon={
        <Icon
          name={isPaused ? 'play-arrow' : 'pause'}
          style={[styles.buttonColor, styles.playButton]}
        />
      }
      buttonColor={BaseStyles.mainColorBlue}
      onPress={onPressPlay}
    />
    <TouchableOpacity onPress={onPressRate} style={{flex: 1, width: 58}}>
      <View style={[styles.playSpeedButton]}>
        <Text style={{fontSize: 18, color: 'white'}}>
          x{rate}{rate % 1 === 0 ? '.0' : ''}
        </Text>
      </View>
    </TouchableOpacity>
    {/* TODO fullScreenButton 実装する */}
    <ActionButton
      position={'right'}
      offsetY={7}
      size={62}
      icon={
        <Icon
          name={'fullscreen'}
          style={[styles.buttonColor, styles.fullScreenButton]}
        />
      }
      buttonColor={BaseStyles.mainColorBlue}
      onPress={onPressFullScreen}
    />
  </View>;

VideoControls.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  onPressPlay: PropTypes.func.isRequired,
};

export default VideoControls;
