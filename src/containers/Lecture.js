import React from 'react';
import ReactNative from 'react-native';
import Video from 'react-native-video';
import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import { Actions as RouterActions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';

import * as Actions from '../actions/lecture';
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
    isPaused: PropTypes.bool.isRequired,
    pressPlay: PropTypes.func.isRequired,
    speed: PropTypes.number.isRequired,
    pressSpeed: PropTypes.func.isRequired,
    currentTime: PropTypes.number.isRequired,
    videoProgress: PropTypes.func.isRequired,
    lectureId: PropTypes.number.isRequired,
    course: PropTypes.shape({
      /* eslint-disable react/no-unused-prop-types */
      order: PropTypes.number,
      title: PropTypes.string,
      kind: PropTypes.string,
      duration: PropTypes.number,
      isCompleted: PropTypes.bool,
      isStarted: PropTypes.bool,
      type: PropTypes.string,
      /* eslint-enable react/no-unused-prop-types */
    }).isRequired,
    nextLecture: PropTypes.shape({
      /* eslint-disable react/no-unused-prop-types */
      order: PropTypes.number,
      title: PropTypes.string,
      kind: PropTypes.string,
      duration: PropTypes.number,
      isCompleted: PropTypes.bool,
      type: PropTypes.string,
      /* eslint-enable react/no-unused-prop-types */
    }),
    pressNextLecture: PropTypes.func.isRequired,
    loadLecture: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { course, lectureId } = this.props;
    this.props.loadLecture(course, lectureId);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.lectureId) return;
    if (nextProps.lectureId !== this.props.lectureId) {
      const { course, lectureId } = nextProps;
      this.props.loadLecture(course, lectureId);
    }
  }

  @autobind
  handleValueChange(value) {
    if (this.video) {
      this.video.seek(value);
    }
  }

  @autobind
  handlePressNextLecture(course, lectureId) {
    const { nextLecture, pressNextLecture } = this.props;
    // update current lecture status to completed
    pressNextLecture(course, lectureId);
    RouterActions.refresh({
      title: nextLecture.title,
      lectureId: nextLecture.id,
    });
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
      lectureId,
      course,
      currentTime,
      isPaused,
      speed,
      videoProgress,
      nextLecture,
      pressPlay,
      pressSpeed,
    } = this.props;
    const lecture = LectureUtils.getLectureById(course.lectures, lectureId);
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={[styles.videoContainer, { marginTop: 64 }]}>
          <Video
            ref={ref => (this.video = ref)}
            // source can be a URL or a local file
            source={{ uri: lecture.url }}
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
            onEnd={() => this.handlePressNextLecture(course, lectureId)}
          />
        </View>
        <View style={{ flex: 1.5, backgroundColor: 'white' }}>
          <SeekBar
            currentTime={currentTime}
            duration={lecture.duration}
            onValueChange={this.handleValueChange}
            video={this.video}
          />
          <View style={styles.lectureTitleTextWrapper}>
            <Text>{lecture.title}</Text>
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
                onPress={() => this.handlePressNextLecture(course, lectureId)}
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


export default connectToProps(Lecture, 'currentLecture', Actions);
