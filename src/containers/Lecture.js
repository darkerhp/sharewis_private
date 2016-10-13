import React from 'react';
import ReactNative from 'react-native';
import Video from 'react-native-video';
import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions as RouterActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/lecture';
import SeekBar from '../components/Lecture/SeekBar';
import VideoControls from '../components/Lecture/VideoControls';
import * as ApiConstants from '../constants/Api';
import * as LectureUtils from '../utils/lecture';
import * as FileUtils from '../utils/file';


const { Component, PropTypes } = React;
const { Alert, StatusBar, StyleSheet, Text, View } = ReactNative;

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
    // values
    courseId: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    estimatedTime: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    isLastLecture: PropTypes.bool.isRequired,
    hasVideoInDevice: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired,
    lectures: PropTypes.shape({}).isRequired,
    order: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
    // actions
    updateLectureStatus: PropTypes.func.isRequired,
    setCurrentLectureId: PropTypes.func.isRequired,
    togglePlay: PropTypes.func.isRequired,
    changeVideoPlaySpeed: PropTypes.func.isRequired,
    updateVideoProgress: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
  };

  @autobind
  componentWillMount() {
    const { id, status, updateLectureStatus } = this.props;
    if (status === ApiConstants.LECTURE_STATUS_NOT_STARTED) {
      updateLectureStatus(id, ApiConstants.LECTURE_STATUS_VIEWED);
    }
  }

  @autobind
  componentWillReceiveProps(nextProps) {
    if (!nextProps.id) return;
    if (nextProps.id !== this.props.id) {
      const { title } = nextProps;
      RouterActions.refresh({});
    }
  }

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

  @autobind
  handlePressNextLecture() {
    // 一瞬Spinnerを表示する
    this.setState({ loading: true });
    setTimeout(() => this.setState({ loading: false }), 500);

    const {
      courseId,
      updateLectureStatus,
      id,
      order,
      lectures,
      setCurrentLectureId,
      status,
    } = this.props;

    if (status !== ApiConstants.LECTURE_STATUS_FINISHED) {
      updateLectureStatus(id, ApiConstants.LECTURE_STATUS_FINISHED);
    }

    const nextLecture = LectureUtils.getNextVideoLecture(courseId, lectures, false, order);
    setCurrentLectureId(nextLecture.id);
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
      currentTime, estimatedTime, isLastLecture, isPaused, speed, title,
      // actions
      togglePlay, changeVideoPlaySpeed,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.loading} />
        <StatusBar barStyle="light-content" />
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

const mapStateToProps = (state) => {
  const { entities, netInfo, ui, routes } = state;
  const { lectures } = entities;
  const lectureId = ui.lectureView.currentLectureId;
  const currentLecture = lectures[lectureId];
  return {
    lectures,
    ...currentLecture,
    ...ui.lectureView,
    ...ui.videoPlayer,
    isOnline: netInfo.isConnected,
    isLastLecture: lectureId === LectureUtils.getLastLectureId(currentLecture.courseId, lectures),
  };
};

const mapDispatchToProps = dispatch => ({ ...bindActionCreators(Actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Lecture);
