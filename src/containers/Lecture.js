/**
 * @flow
 */
import React from 'react';
import ReactNative from 'react-native';
import Video from 'react-native-video';
import autobind from 'autobind-decorator';

import * as Actions from '../actions/lecture';
import SeekBar from '../components/Lecture/SeekBar';
import VideoControls from '../components/Lecture/VideoControls';
import connectToProps from '../utils/reduxUtils';

const { Component, PropTypes } = React;
const { View, StyleSheet, Text, TouchableOpacity } = ReactNative;

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

class Lecture extends Component {
  static propTypes = {
    isPaused: PropTypes.bool.isRequired,
    pressPlay: PropTypes.func.isRequired,
    speed: PropTypes.number.isRequired,
    pressSpeed: PropTypes.func.isRequired,
    currentTime: PropTypes.number.isRequired,
    videoProgress: PropTypes.func.isRequired,
    lecture: PropTypes.shape({
      /* eslint-disable react/no-unused-prop-types */
      order: PropTypes.number,
      title: PropTypes.string,
      kind: PropTypes.string,
      duration: PropTypes.number,
      isCompleted: PropTypes.bool,
      type: PropTypes.string,
      /* eslint-enable react/no-unused-prop-types */
    }).isRequired,
  };

  @autobind
  handleValueChange(value) {
    if (this.video) {
      this.video.seek(value);
    }
  }

  render() {
    const {
      lecture,
      currentTime,
      isPaused,
      speed,
      videoProgress,
      pressPlay,
      pressSpeed,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.videoContainer, { marginTop: 64 }]}>
          <Video
            ref={ref => (this.video = ref)}
            source={{ uri: lecture.url }} // Can be a URL or a local file.
            rate={speed}
            volume={1.0}
            muted={false}
            paused={isPaused}
            resizeMode="contain"
            repeat={false}
            playInBackground={false}
            playWhenInactive={false}
            // onError={e => console.log(e)}
            style={styles.backgroundVideo}
            onProgress={data => videoProgress(data.currentTime)}
          />
        </View>
        <View style={{ flex: 1.5, backgroundColor: 'white' }}>
          <SeekBar
            currentTime={currentTime}
            duration={lecture.duration}
            onValueChange={this.handleValueChange}
            video={this.video}
          />
          {/* TODO LectureTitle 実装する */}
          <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'stretch' }}>
            <Text>{lecture.title}</Text>
          </View>
          <VideoControls
            isPaused={isPaused}
            speed={speed}
            onPressPlay={pressPlay}
            onPressSpeed={pressSpeed}
          />
          {/* TODO NextLecture 実装する */}
          <View style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'stretch' }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#579eff',
                minHeight: 60,
              }}
            >
              <Text style={{ color: 'white' }}>次のレクチャーに進む</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connectToProps(Lecture, 'lecture', Actions);
