import React from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import Video from 'react-native-video';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions as RouterActions } from 'react-native-router-flux';

import * as FileUtils from '../../utils/file';
import SeekBar from './SeekBar';
import VideoControls from './VideoControls';

const { Component, PropTypes } = React;
const { Image, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
  },
  videoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 64,
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
});

class VideoLecture extends Component {
  static propTypes = {
    // values
    courseId: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    estimatedTime: PropTypes.number.isRequired,
    hasVideoInDevice: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    isPaused: PropTypes.bool.isRequired,
    isStarted: PropTypes.bool.isRequired,
    lectureContentStyleId: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
    // actions
    changeVideoPlaySpeed: PropTypes.func.isRequired,
    toggleFullScreen: PropTypes.func.isRequired,
    togglePlay: PropTypes.func.isRequired,
    updateVideoProgress: PropTypes.func.isRequired,
  };

  state = {
    seeking: false,
    isLoadingThumbnail: true,
  };

  @autobind
  getVideoUrl() {
    const { courseId, id, hasVideoInDevice, videoUrl } = this.props;
    return hasVideoInDevice ? `file://${FileUtils.createVideoFileName(id, courseId)}` : videoUrl;
  }

  @autobind
  handleValueChange() {
    this.setState({ seeking: true }); // 再生位置調整中はビデオを止める
  }

  @autobind
  handleSlidingComplete(value) {
    this.setState({ seeking: false });
    if (this.video) {
      this.video.seek(value);
    }
  }

  // 250ms毎に呼び出される
  @autobind
  handleVideoProgress(data) {
    const { currentTime, updateVideoProgress } = this.props;
    if (currentTime === data.currentTime) return;
    updateVideoProgress(data.currentTime);
  }

  @autobind
  handlePressFullScreen() {
    const { toggleFullScreen } = this.props;
    toggleFullScreen();
    RouterActions.refresh({ hideNavBar: true });
  }

  @autobind
  renderVideo() {
    const { isStarted, isPaused, speed, thumbnailUrl } = this.props;
    if (isStarted) {
      return (
        <Video
          muted={false}
          onEnd={this.handlePressNextLecture}
          onError={e => console.error(e)}
          onProgress={this.handleVideoProgress}
          paused={this.state.seeking || isPaused}
          playInBackground={false}
          playWhenInactive={false}
          rate={speed}
          ref={ref => (this.video = ref)}
          repeat={false}
          resizeMode="contain"
          source={{ uri: this.getVideoUrl() }}
          style={styles.backgroundVideo}
          volume={1.0}
        />
      );
    }
    return (
      <Image
        style={styles.backgroundVideo}
        source={{ uri: thumbnailUrl }}
        onLoadStart={() => this.setState({ isLoadingThumbnail: true })}
        onLoadEnd={() => this.setState({ isLoadingThumbnail: false })}
      />
    );
  }

  render() {
    const {
      // values
      currentTime,
      estimatedTime,
      isPaused,
      lectureContentStyleId,
      speed,
      title,
      // actions
      changeVideoPlaySpeed,
      toggleFullScreen,
      togglePlay,
    } = this.props;

    return (
      <View style={lectureContentStyleId}>
        <Spinner visible={this.state.isLoadingThumbnail} />
        <View style={styles.videoContainer}>
          {this.renderVideo()}
        </View>
        <View style={{ flex: 1.5, backgroundColor: 'white' }}>
          <SeekBar
            currentTime={currentTime}
            estimatedTime={estimatedTime}
            onSlidingComplete={this.handleSlidingComplete}
            onValueChange={this.handleValueChange}
          />
          <View style={styles.lectureTitleTextWrapper}>
            <Text style={styles.lectureTitle}>{title}</Text>
          </View>
          <VideoControls
            isPaused={isPaused}
            speed={speed}
            onPressFullScreen={this.handlePressFullScreen}
            onPressPlay={togglePlay}
            onPressSpeed={changeVideoPlaySpeed}
            isLoadingThumbnail={this.state.isLoadingThumbnail}
          />
        </View>
      </View>
    );
  }
}

export default VideoLecture;
