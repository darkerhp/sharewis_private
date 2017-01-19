import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SeekBar from './SeekBar';
import BaseStyles from '../../baseStyles';

const { Platform, StyleSheet, Text, View } = ReactNative;

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
    backgroundColor: BaseStyles.backgroundColor,
  },
  playButtonIcon: {
    fontSize: 40,
    height: 44,
    color: 'white',
  },
  speedButton: {
    width: 62,
    height: 62,
    borderRadius: 62 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseStyles.backgroundColor,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  lectureTitleTextWrapper: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lectureTitle: {
    fontSize: 17,
    color: '#e0e0e0',
    fontWeight: 'bold',
  },
  fullScreenButton: {
    width: 62,
    height: 62,
    borderRadius: 62 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseStyles.backgroundColor,
  },
  fullScreenButtonIcon: {
    fontSize: 28,
    height: 28,
    color: 'white',
  },
});

const VideoControls = ({
  currentTime,
  estimatedTime,
  isFullScreen,
  isLoadingThumbnail,
  isPaused,
  onPressFullScreen,
  onPressPlay,
  onPressSpeed,
  onSlidingComplete,
  onValueChange,
  speed,
  title,
}) => (
  <View
    style={(isFullScreen ? {
      backgroundColor: 'transparent',
      borderRadius: 5,
      bottom: 20,
      left: 20,
      position: 'absolute',
      right: 20,
    } : { flex: 2, paddingBottom: 40, backgroundColor: 'white' })}
  >
    <SeekBar
      currentTime={currentTime}
      estimatedTime={estimatedTime}
      isFullScreen={isFullScreen}
      onSlidingComplete={onSlidingComplete}
      onValueChange={onValueChange}
    />
    <View style={styles.lectureTitleTextWrapper}>
      <Text style={styles.lectureTitle}>{title}</Text>
    </View>
    <View style={styles.container}>
      <Button
        containerStyle={[
          styles.playButton,
          isLoadingThumbnail && { backgroundColor: BaseStyles.disabledButtonColor },
        ]}
        style={styles.buttonText}
        onPress={() => onPressPlay()}
        disabled={isLoadingThumbnail}
      >
        <Icon
          name={isPaused ? 'play-arrow' : 'pause'}
          style={styles.playButtonIcon}
        />
      </Button>
      <Button
        containerStyle={styles.speedButton}
        style={styles.buttonText}
        onPress={() => onPressSpeed()}
      >
          x{speed}{speed % 1 === 0 ? '.0' : ''}
      </Button>
      <Button
        containerStyle={[
          styles.fullScreenButton,
          isLoadingThumbnail && { backgroundColor: BaseStyles.disabledButtonColor },
        ]}
        style={styles.buttonText}
        onPress={() => onPressFullScreen()}
        disabled={isLoadingThumbnail}
      >
        <Icon
          name={'fullscreen'}
          style={styles.fullScreenButtonIcon}
        />
      </Button>
    </View>
  </View>
  );


VideoControls.propTypes = {
  currentTime: PropTypes.number.isRequired,
  estimatedTime: PropTypes.number.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  isLoadingThumbnail: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  speed: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  //
  onPressFullScreen: PropTypes.func.isRequired,
  onPressPlay: PropTypes.func.isRequired,
  onPressSpeed: PropTypes.func.isRequired,
  onSlidingComplete: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default VideoControls;
