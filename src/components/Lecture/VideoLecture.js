import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import KeepAwake from 'react-native-keep-awake';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';
import { Actions as RouterActions } from 'react-native-router-flux';
import { Client } from 'bugsnag-react-native';

import VideoControls from './VideoControls'; // eslint-disable-line
import FullScreenVideoControls from './FullScreenVideoControls'; // eslint-disable-line
import Lecture from '../../modules/models/Lecture';

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
    currentLecture: PropTypes.instanceOf(Lecture).isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    lectureContentStyleId: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    // actions
    changeVideoPlaySpeed: PropTypes.func.isRequired,
    onVideoEnd: PropTypes.func.isRequired,
    toggleFullScreen: PropTypes.func.isRequired,
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
    currentTime: 0,
    isPaused: false,
    isStarted: true,
  };

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
    if (this.state.currentTime === data.currentTime) return;
    this.setState({ currentTime: data.currentTime });
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
  handlePressPlay() {
    this.setState({ isPaused: !this.state.isPaused, isStarted: true });
  }

  @autobind
  renderVideo() {
    const { currentLecture, onVideoEnd, speed } = this.props;
    if (!this.state.isStarted) {
      // FIXME 動画レクチャー表示時にデフォルトで再生するように仕様変更したため、常に「this.state.isStarted = true」となるためここは通らない。
      return (
        <Image
          style={styles.backgroundVideo}
          source={{ uri: currentLecture.thumbnailUrl }}
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
        onEnd={onVideoEnd}
        onError={(e) => {
          new Client().notify(e);
          console.error(e);
        }}
        onProgress={this.handleVideoProgress}
        paused={this.state.seeking || this.state.isPaused}
        playInBackground={false}
        playWhenInactive={false}
        rate={speed}
        ref={ref => (this.video = ref)}
        repeat={false}
        resizeMode="contain"
        source={{ uri: currentLecture.getVideoUrl() }}
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
      changeVideoPlaySpeed,
      currentLecture,
      isFullScreen,
      lectureContentStyleId,
      speed,
    } = this.props;

    const videoControlsProps = {
      currentTime: this.state.currentTime,
      estimatedTime: currentLecture.estimatedTime,
      isFullScreen,
      isLoadingThumbnail: this.state.isLoadingThumbnail,
      isPaused: this.state.isPaused,
      onPressFullScreen: this.handlePressFullScreen,
      onPressPlay: this.handlePressPlay,
      onPressSpeed: changeVideoPlaySpeed,
      onSlidingComplete: this.handleSlidingComplete,
      onValueChange: this.handleValueChange,
      speed,
      title: currentLecture.title,
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

        <KeepAwake />
      </View>
    );
  }
}

export default VideoLecture;
