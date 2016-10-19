import React from 'react';
import ReactNative from 'react-native';

import Video from 'react-native-video';
import autobind from 'autobind-decorator';

import * as FileUtils from '../../utils/file';
import SeekBar from './SeekBar';
import VideoControls from './VideoControls';

const { Component, PropTypes } = React;
const { View, StyleSheet, Text } = ReactNative;


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
    id: PropTypes.number.isRequired,
    hasVideoInDevice: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired,
    lectureContentStyleId: PropTypes.number.isRequired,
    lectures: PropTypes.shape({}).isRequired,
    speed: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
    // actions
    togglePlay: PropTypes.func.isRequired,
    changeVideoPlaySpeed: PropTypes.func.isRequired,
    updateVideoProgress: PropTypes.func.isRequired,
  };

  @autobind
  getVideoUrl() {
    const { courseId, id, hasVideoInDevice, videoUrl } = this.props;
    return hasVideoInDevice ? `file://${FileUtils.createVideoFileName(id, courseId)}` : videoUrl;
  }

  @autobind
  handleValueChange(value) {
    if (this.video) {
      this.video.seek(value);
    }
  }

  // 250ms毎に呼び出される
  @autobind
  handleVideoProgress(data) {
    const { currentTime, updateVideoProgress } = this.props;
    if (Math.ceil(currentTime) === Math.ceil(data.currentTime)) return;
    // 秒次でactionを実行
    updateVideoProgress(data.currentTime);
  }

  render() {
    const {
      // values
      currentTime, estimatedTime, isPaused, speed, title, lectureContentStyleId,
      // actions
      togglePlay, changeVideoPlaySpeed,
    } = this.props;

    return (
      <View style={lectureContentStyleId}>
        <View style={styles.videoContainer}>
          <Video
            ref={ref => (this.video = ref)}
            source={{ uri: this.getVideoUrl() }}
            rate={speed}
            volume={1.0}
            muted={false}
            paused={isPaused}
            resizeMode="contain"
            repeat={false}
            playInBackground={false}
            playWhenInactive={false}
            onError={e => console.error(e)} // eslint-disable-line
            style={styles.backgroundVideo}
            onProgress={this.handleVideoProgress}
            onEnd={this.handlePressNextLecture}
          />
        </View>
        <View style={{ flex: 1.5, backgroundColor: 'white' }}>
          <SeekBar
            currentTime={currentTime}
            estimatedTime={estimatedTime}
            onValueChange={this.handleValueChange}
            video={this.video}
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
