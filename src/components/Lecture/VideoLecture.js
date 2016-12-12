import React from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import Video from 'react-native-video';
import { Actions as RouterActions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';

import * as FileUtils from '../../utils/file';
import VideoControls from './VideoControls';
import FullScreenVideoControls from './FullScreenVideoControls';

const { Component, PropTypes } = React;
const {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  View,
} = ReactNative;

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
  loadingIndicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    isFullScreen: PropTypes.bool.isRequired,
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

  static toFullScreen() {
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);
    RouterActions.refresh({ hideNavBar: true });
  }

  static toPortrait() {
    Orientation.lockToPortrait();
    StatusBar.setHidden(false);
    RouterActions.refresh({ hideNavBar: false });
  }

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
    // TODO パフォーマンスに問題があるため、actionの呼び出し回数を減らしたほうが良さそう
    updateVideoProgress(data.currentTime);
  }

  @autobind
  handlePressFullScreen() {
    const { isFullScreen, toggleFullScreen } = this.props;
    if (isFullScreen) {
      VideoLecture.toPortrait();
    } else {
      VideoLecture.toFullScreen();
    }
    toggleFullScreen();
  }


  @autobind
  renderVideo() {
    const { isStarted, isPaused, speed, thumbnailUrl } = this.props;
    if (!isStarted) {
      return (
        <Image
          style={styles.backgroundVideo}
          source={{ uri: thumbnailUrl }}
          onLoadStart={() => this.setState({ isLoadingThumbnail: true })}
          onLoadEnd={() => this.setState({ isLoadingThumbnail: false })}
          resizeMode="contain"
        />
      );
    }

    return (
      <Video
        muted={false}
        onLoadStart={() => this.setState({ isLoadingThumbnail: true })}
        onLoad={() => this.setState({ isLoadingThumbnail: false })}
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

  @autobind
  renderIndicator() {
    if (!this.state.isLoadingThumbnail) return null;
    return (
      <View style={styles.loadingIndicatorWrapper}>
        <ActivityIndicator />
      </View>
    );
  }

  render() {
    const {
      currentTime,
      estimatedTime,
      isFullScreen,
      isPaused,
      lectureContentStyleId,
      speed,
      title,
      changeVideoPlaySpeed,
      togglePlay,
    } = this.props;

    const videoControlsProps = {
      currentTime,
      estimatedTime,
      isFullScreen,
      isLoadingThumbnail: this.state.isLoadingThumbnail,
      isPaused,
      onPressFullScreen: this.handlePressFullScreen,
      onPressPlay: togglePlay,
      onPressSpeed: changeVideoPlaySpeed,
      onSlidingComplete: this.handleSlidingComplete,
      onValueChange: this.handleValueChange,
      speed,
      title,
    };

    return (
      <View style={[lectureContentStyleId, isFullScreen && { flex: 1 }]}>
        <View style={(isFullScreen ? { flex: 1 } : styles.videoContainer)}>
          {this.renderVideo()}
          {this.renderIndicator()}
        </View>

        {isFullScreen
          ? <FullScreenVideoControls {...videoControlsProps} />
          : <VideoControls {...videoControlsProps} />}
      </View>
    );
  }
}

export default VideoLecture;
