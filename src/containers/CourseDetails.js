/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';

import { _ } from 'lodash';
import autobind from 'autobind-decorator';
import { Actions as RouterActions } from 'react-native-router-flux';
import RNFS from 'react-native-fs';
import I18n from 'react-native-i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/courseDetails';
import * as LectureActions from '../actions/lecture';
import LectureList from '../components/CourseDetails/LectureList';
import CourseInfoSection from '../components/CourseDetails/CourseInfoSection';
import totalDuration from '../utils/courseDetails';
import * as LectureUtils from '../utils/lecture';
import * as FileUtils from '../utils/file';
import BaseStyles from '../baseStyles';
import {
  getSectionMergedLectures,
  getLectureProgress,
} from '../selectors/lectureSelectors';

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
    setCurrentLectureId: PropTypes.func.isRequired,
    pressDownloadVideo: PropTypes.func.isRequired,
    progressDownloadVideo: PropTypes.func.isRequired,
  };

  async componentWillMount() {
    const { fetchCourseDetails, id } = this.props;
    try {
      await fetchCourseDetails(id);
    } catch (error) {
      console.error(error);
      Alert.alert(I18n.t('errorTitle'), I18n.t('networkFailure'));
    }
  }

  componentDidMount() {
    const { id, lectures, fetchVideoInDeviceStatus } = this.props;
    _.isEmpty(lectures) || fetchVideoInDeviceStatus(id, lectures); // eslint-disable-line
  }

  @autobind
  handlePressNextLecture() {
    const { id, lectures } = this.props;
    const lecture = LectureUtils.getNextVideoLecture(id, lectures);
    this.handlePressLecture(lecture);
  }

  @autobind
  handlePressLecture(lecture) {
    console.log(lecture);
    const { setCurrentLectureId } = this.props;
    setCurrentLectureId(lecture.id);
    RouterActions.lecture();
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
    const courseInfo = {
      totalLectureCount: lectureCount,
      completeLectureCount: lectureProgress,
      courseTitle: title,
      totalDuration: totalDuration(lectures),
      nextLecture: LectureUtils.getNextVideoLecture(id, lectures),
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
            containerStyle={{
              height: _.isEmpty(courseInfo.nextLecture)
                ? QUARTER_DISPLAY_HEIGHT : HALF_DISPLAY_HEIGHT,
            }}
          />
          {!_.isEmpty(lectures) &&
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

const mapStateToProps = (state, props) => {
  const { entities: { courses }, netInfo, ui } = state;
  const { currentCourseId } = ui.courseDetailsView;

  return {
    ...courses[currentCourseId],
    lectureProgress: getLectureProgress(state, props),
    lectures: getSectionMergedLectures(state, props),
    isOnline: netInfo.isConnected,
    ...ui.courseDetailsView,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ ...Actions, ...LectureActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);
