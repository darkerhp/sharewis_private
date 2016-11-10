import React from 'react';
import ReactNative from 'react-native';

import Video from 'react-native-video';
import autobind from 'autobind-decorator';

import * as FileUtils from '../../utils/file';
import SeekBar from './SeekBar';
import VideoControls from './VideoControls';

const { Component, PropTypes } = React;
const { StyleSheet, Text, View } = ReactNative;

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
    lectureContentStyleId: PropTypes.number.isRequired,
    lectures: PropTypes.shape({}).isRequired,
    speed: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
    // actions
    changeVideoPlaySpeed: PropTypes.func.isRequired,
    togglePlay: PropTypes.func.isRequired,
    updateVideoProgress: PropTypes.func.isRequired,
  };

  state = {
    seeking: false,
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
      togglePlay,
    } = this.props;

    return (
      <View style={lectureContentStyleId}>
        <View style={styles.videoContainer}>
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
            onPressPlay={togglePlay}
            onPressSpeed={changeVideoPlaySpeed}
          />
        </View>
      </View>
    );
  }

}

export default VideoLecture;
