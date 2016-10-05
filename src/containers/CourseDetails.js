import React from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import { Actions as RouterActions } from 'react-native-router-flux';
import RNFS from 'react-native-fs';
import I18n from 'react-native-i18n';
import Spinner from 'react-native-loading-spinner-overlay';

import * as Actions from '../actions/courseDetails';
import LectureList from '../components/CourseDetails/LectureList';
import CourseInfoSection from '../components/CourseDetails/CourseInfoSection';
import totalDuration from '../utils/courseDetails';
import * as LectureUtils from '../utils/lecture';
import { connectActions, connectState } from '../utils/redux';
import * as FileUtils from '../utils/file';
import BaseStyles from '../baseStyles';

const { Component, PropTypes } = React;
const {
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} = ReactNative;

const { height } = Dimensions.get('window');
const HALF_DISPLAY_HEIGHT = (height - BaseStyles.navbarHeight) / 2;
const QUARTER_DISPLAY_HEIGHT = (height - BaseStyles.navbarHeight) / 4;

const styles = StyleSheet.create({
  lectureContainer: { flex: 1 },
});

@connectActions(Actions)
@connectState('currentCourse')
class CourseDetails extends Component {
  static propTypes = {
    // values
    id: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isLectureDownloading: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    lectures: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    lectureCount: PropTypes.number.isRequired,
    lectureProgress: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    // actions
    beginDownloadVideo: PropTypes.func.isRequired,
    fetchCourseDetails: PropTypes.func.isRequired,
    fetchVideoInDeviceStatus: PropTypes.func.isRequired,
    finishDeleteVideo: PropTypes.func.isRequired,
    finishDownloadVideo: PropTypes.func.isRequired,
    errorDownloadVideo: PropTypes.func.isRequired,
    loadCurrentLecture: PropTypes.func.isRequired,
    pressDownloadVideo: PropTypes.func.isRequired,
    progressDownloadVideo: PropTypes.func.isRequired,
  };

  async componentWillMount() {
    try {
      await this.props.fetchCourseDetails();
    } catch (error) {
      Alert.alert(I18n.t('errorTitle'), I18n.t('networkFailure'));
    }
  }

  componentDidMount() {
    const { id, lectures, fetchVideoInDeviceStatus } = this.props;
    fetchVideoInDeviceStatus(id, lectures);
  }

  @autobind
  handlePressNextLecture() {
    const { lectures } = this.props;
    const lecture = LectureUtils.getNextVideoLecture(lectures);
    return this.handlePressLecture(lecture);
  }

  @autobind
  handlePressLecture(lecture) {
    const { lectures, loadCurrentLecture } = this.props;
    loadCurrentLecture(lectures, lecture);
    return RouterActions.lecture({
      title: lecture.title.length > 18
        ? `${lecture.title.substr(0, 17)}…`
        : lecture.title,
    });
  }

  @autobind
  handlePressDelete(lecture) {
    const { id, finishDeleteVideo } = this.props;
    const path = FileUtils.createVideoFileName(lecture.id, id);
    return RNFS.unlink(path)
      .then(() => finishDeleteVideo(lecture.id))
      .catch(err => Alert.alert(I18n.t('errorTitle'), I18n.t('deleteVideoFailure')));
  }

  @autobind
  handlePressDownload(lecture) {
    const {
      id,
      beginDownloadVideo,
      errorDownloadVideo,
      finishDownloadVideo,
      isLectureDownloading,
      pressDownloadVideo,
      progressDownloadVideo,
    } = this.props;

    if (!lecture.videoUrl) {
      Alert.alert('WTF?', lecture);
      return false;
    }
    if (isLectureDownloading) {
      return Alert.alert(I18n.t('errorTitle'), I18n.t('downloadAlreadyInProgress'));
    }

    pressDownloadVideo();

    const videoDirPath = FileUtils.getCourseVideosDirPath(id);
    const toFile = FileUtils.createVideoFileName(lecture.id, id);

    // TODO Utils & async/await化
    return RNFS.exists(videoDirPath)
      .then(res => res || RNFS.mkdir(videoDirPath))
      .then(() =>
        RNFS.downloadFile({
          fromUrl: lecture.videoUrl,
          toFile,
          begin: (res) => {
            const { jobId, statusCode } = res;
            beginDownloadVideo(lecture.id, jobId, statusCode);
          },
          progress: (data) => {
            const percentage = Math.ceil((100 * data.bytesWritten) / data.contentLength);
            progressDownloadVideo(lecture.id, percentage);
          },
          progressDivider: 2,
        }).promise
      )
      .then(() => finishDownloadVideo(lecture.id))
      .catch((err) => {
        console.error(err); // eslint-disable-line
        errorDownloadVideo(lecture.id);
        Alert.alert(I18n.t('errorTitle'), I18n.t('networkFailure'));
      });
  }

  render() {
    const {
      id,
      isFetching,
      isOnline,
      lectures,
      lectureCount,
      lectureProgress,
      title,
    } = this.props;
    const isCompleted = lectureCount === lectureProgress;
    const courseInfo = {
      totalLectureCount: lectureCount,
      completeLectureCount: lectureProgress,
      isCompleted,
      courseTitle: title,
      totalDuration: totalDuration(lectures),
      nextLecture: LectureUtils.getNextVideoLecture(lectures),
    };
    return (
      <ScrollView
        style={{ flex: 1 }}
        showVerticalScrollIndicator={false}
        indicatorStyle={'white'}
      >
        <Spinner visible={isFetching} />
        <View style={BaseStyles.ContainerWithNavbar}>
          <StatusBar barStyle="light-content" />
          <CourseInfoSection
            {...courseInfo}
            handlePressNextLecture={this.handlePressNextLecture}
            containerStyle={{ height: isCompleted ? QUARTER_DISPLAY_HEIGHT : HALF_DISPLAY_HEIGHT }}
          />
          {lectures.length > 0 &&
            <LectureList
              containerStyleId={styles.lectureContainer}
              lectures={lectures}
              courseId={id}
              isOnline={isOnline}
              handlePressLecture={this.handlePressLecture}
              handlePressDelete={this.handlePressDelete}
              handlePressDownload={this.handlePressDownload}
            />
          }
        </View>
      </ScrollView>
    );
  }
}

export default CourseDetails;
