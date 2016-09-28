import React from 'react';
import ReactNative from 'react-native';
import Video from 'react-native-video';
import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import { Actions as RouterActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import * as Actions from '../actions/lecture';
import SeekBar from '../components/Lecture/SeekBar';
import VideoControls from '../components/Lecture/VideoControls';
import * as LectureUtils from '../utils/lecture';
import { connectActions, connectState } from '../utils/redux';

const { Component, PropTypes } = React;
const { View, StyleSheet, StatusBar, Text } = ReactNative;

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
  lectureTitleTextWrapper: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextLectureButtonWrapper: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  nextLectureButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#579eff',
    minHeight: 60,
  },
  nextLectureButtonText: {
    color: 'white',
  },
});


@connectActions(Actions)
@connectState('currentLecture')
class Lecture extends Component {
  static propTypes = {
    lectures: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    // state
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isLastLecture: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired,
    speed: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    // actions
    loadCurrentLecture: PropTypes.func.isRequired,
    pressPlay: PropTypes.func.isRequired,
    pressSpeed: PropTypes.func.isRequired,
    completeCurrentLecture: PropTypes.func.isRequired,
    updateVideoProgress: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.id) return;
    if (nextProps.id !== this.props.id) {
      const { id, title } = nextProps;
      RouterActions.lecture({ title });
    }
  }

  @autobind
  handleValueChange(value) {
    if (this.video) {
      this.video.seek(value);
    }
  }

  @autobind
  handlePressNextLecture() {
    const { id, isCompleted, lectures, loadCurrentLecture, completeCurrentLecture } = this.props;

    if (!isCompleted) {
      completeCurrentLecture();
    }

    const nextLecture = LectureUtils.getLectureById(lectures, id + 1);
    loadCurrentLecture(lectures, nextLecture);
  }

  @autobind
  handleVideoProgress(data) {
    const { currentTime, updateVideoProgress } = this.props;
    if (currentTime !== data.currentTime) {
      updateVideoProgress(data.currentTime);
    }
  }

  render() {
    const {
      // state
      currentTime, duration, isLastLecture, isPaused, speed, title, url,
      // actions
      pressPlay, pressSpeed, updateVideoProgress,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={[styles.videoContainer, { marginTop: 64 }]}>
          <Video
            ref={ref => (this.video = ref)}
            // source can be a URL or a local file
            source={{ uri: url }}
            rate={speed}
            volume={1.0}
            muted={false}
            paused={isPaused}
            resizeMode="contain"
            repeat={false}
            playInBackground={false}
            playWhenInactive={false}
            // onError={e => console.log(e)
            style={styles.backgroundVideo}
            onProgress={this.handleVideoProgress}
            onEnd={this.handlePressNextLecture}
          />
        </View>
        <View style={{ flex: 1.5, backgroundColor: 'white' }}>
          <SeekBar
            currentTime={currentTime}
            duration={duration}
            onValueChange={this.handleValueChange}
            video={this.video}
          />
          <View style={styles.lectureTitleTextWrapper}>
            <Text>{title}</Text>
          </View>
          <VideoControls
            isPaused={isPaused}
            speed={speed}
            onPressPlay={pressPlay}
            onPressSpeed={pressSpeed}
          />
          <View style={styles.nextLectureButtonWrapper}>
            { isLastLecture ||
              <Button
                containerStyle={styles.nextLectureButton}
                style={styles.nextLectureButtonText}
                onPress={this.handlePressNextLecture}
              >
                {I18n.t('nextLecture')}
              </Button>
            }
          </View>
        </View>
      </View>
    );
  }
}


export default Lecture;
