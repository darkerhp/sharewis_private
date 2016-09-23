/* eslint-disable no-console */
import React from 'react';
import ReactNative from 'react-native';
import Video from 'react-native-video';
import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import { Actions as RouterActions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';

import * as lectureActions from '../actions/lecture';
import * as courseActions from '../actions/course';
import SeekBar from '../components/Lecture/SeekBar';
import VideoControls from '../components/Lecture/VideoControls';
import * as LectureUtils from '../utils/lecture';
import connectToProps from '../utils/redux';

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


class Lecture extends Component {
  static propTypes = {
    currentLecture: PropTypes.shape().isRequired,
    videoProgress: PropTypes.func.isRequired,
    nextLecture: PropTypes.shape(),
    getNextLecture: PropTypes.func.isRequired,
    loadLecture: PropTypes.func.isRequired,
    // Following sounds like params for props.video, not lecture
    isPaused: PropTypes.bool.isRequired,
    pressPlay: PropTypes.func.isRequired,
    speed: PropTypes.number.isRequired,
    pressSpeed: PropTypes.func.isRequired,
    currentTime: PropTypes.number.isRequired,
  };

  componentWillMount() {
    const { currentLecture, loadLecture } = this.props;
    loadLecture(currentLecture);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentLecture) return;
    const { currentLecture } = nextProps;
    if (currentLecture !== this.props.currentLecture) {
      this.props.loadLecture(currentLecture);

      // RouterActions.refresh({
      //   title: nextLecture.title,
      //   currentLecture: nextLecture.id,
      //   course,
      // });
    }
  }

  @autobind
  handleValueChange(value) {
    if (this.video) {
      this.video.seek(value);
    }
  }

  @autobind
  handleVideoProgress(data) {
    const { currentTime, videoProgress } = this.props;
    if (currentTime !== data.currentTime) {
      videoProgress(data.currentTime);
    }
  }

  render() {
    const {
      currentLecture,
      currentTime,
      getNextLecture,
      isPaused,
      nextLecture,
      pressPlay,
      pressSpeed,
      speed,
      videoProgress,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={[styles.videoContainer, { marginTop: 64 }]}>
          <Video
            ref={ref => (this.video = ref)}
            // source can be a URL or a local file
            source={{ uri: currentLecture.url }}
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
            onEnd={lecture => getNextLecture(lecture.id)}
          />
        </View>
        <View style={{ flex: 1.5, backgroundColor: 'white' }}>
          <SeekBar
            currentTime={currentTime}
            duration={currentLecture.duration}
            onValueChange={this.handleValueChange}
            video={this.video}
          />
          <View style={styles.lectureTitleTextWrapper}>
            <Text>{currentLecture.title}</Text>
          </View>
          <VideoControls
            isPaused={isPaused}
            speed={speed}
            onPressPlay={pressPlay}
            onPressSpeed={pressSpeed}
          />
          <View style={styles.nextLectureButtonWrapper}>
            {nextLecture &&
              <Button
                containerStyle={styles.nextLectureButton}
                style={styles.nextLectureButtonText}
                onPress={lecture => getNextLecture(lecture.id)}
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


export default connectToProps(Lecture, 'lecture', { ...lectureActions, ...courseActions });
