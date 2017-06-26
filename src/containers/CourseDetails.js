/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import _ from 'lodash';
import autobind from 'autobind-decorator';
import I18n from 'react-native-i18n';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RNFS from 'react-native-fs';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { Client } from 'bugsnag-react-native';
import { connect } from 'react-redux';

import * as lecturesActions from '../modules/lectures';
import * as uiActions from '../modules/ui';
import LectureList from '../components/CourseDetails/LectureList';
import CourseInfoSection from '../components/CourseDetails/CourseInfoSection';
import * as FileUtils from '../utils/file';
import BaseStyles from '../lib/baseStyles';
import {
  getSectionMergedLectureList,
  getLectureProgress,
  getLectureTotalDuration,
  getNextNotCompletedLecture,
} from '../modules/selectors/lectureSelectors';

const {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} = ReactNative;

const HALF_DISPLAY_HEIGHT = (BaseStyles.deviceHeight - BaseStyles.navbarHeight) / 2;
const QUARTER_DISPLAY_HEIGHT = (BaseStyles.deviceHeight - BaseStyles.navbarHeight) / 4;

const styles = StyleSheet.create({
  lectureContainer: { flex: 1 },
});

const mapStateToProps = (state, props) => {
  const { entities: { courses, lectures }, netInfo, ui } = state;
  const { currentCourseId } = ui;
  const currentCourse = courses.get(currentCourseId.toString());
  return {
    ...currentCourse.toJS(),
    lectureProgress: getLectureProgress(state, props) || 0,
    lectures,
    sectionMergedLectureList: getSectionMergedLectureList(state, props),
    totalDuration: getLectureTotalDuration(state, props),
    isOnline: netInfo.isConnected,
    ...ui,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ..._.pickBy(lecturesActions, _.isFunction),
    ..._.pickBy(uiActions, _.isFunction),
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class CourseDetails extends Component {
  static propTypes = {
    // values
    id: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isLectureDownloading: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    lectures: ImmutablePropTypes.orderedMap.isRequired,
    sectionMergedLectureList: ImmutablePropTypes.list.isRequired,
    lectureCount: PropTypes.number.isRequired,
    lectureProgress: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    totalDuration: PropTypes.number.isRequired,
    // actions
    beginDownloadVideo: PropTypes.func.isRequired,
    finishDeleteVideo: PropTypes.func.isRequired,
    finishDownloadVideo: PropTypes.func.isRequired,
    cancelDownloadVideo: PropTypes.func.isRequired,
    errorDownloadVideo: PropTypes.func.isRequired,
    setCurrentLectureId: PropTypes.func.isRequired,
    pressDownloadVideo: PropTypes.func.isRequired,
    progressDownloadVideo: PropTypes.func.isRequired,
  };

  async componentWillMount() {
    const { fetchCourseDetails, fetchVideoInDeviceStatus, id } = this.props;
    try {
      await fetchCourseDetails(id);
      await fetchVideoInDeviceStatus(id);
    } catch (error) {
      new Client().notify(error);
      console.error(error);
      Alert.alert(I18n.t('errorTitle'), I18n.t('networkFailure'));
    }
  }

  @autobind
  handlePressNextLecture() {
    const { id, lectures } = this.props;
    const nextNotCompletedLecture = getNextNotCompletedLecture({}, { lectures, currentCourseId: id });
    this.handlePressLecture(nextNotCompletedLecture);
  }

  @autobind
  handlePressLecture(lecture) {
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
  async handlePressDownload(lecture) { // eslint-disable-line
    const {
      id,
      beginDownloadVideo,
      errorDownloadVideo,
      finishDownloadVideo,
      cancelDownloadVideo,
      isLectureDownloading,
      pressDownloadVideo,
      progressDownloadVideo,
    } = this.props;

    if (lecture.isDownloading) {
      await RNFS.stopDownload(lecture.jobId);
      this.handlePressDelete(lecture);
      return cancelDownloadVideo(lecture.id);
    } else if (isLectureDownloading) {
      return Alert.alert(I18n.t('errorTitle'), I18n.t('downloadAlreadyInProgress'));
    }

    pressDownloadVideo();

    const videoDirPath = FileUtils.getCourseVideosDirPath(id);
    const toFile = FileUtils.createVideoFileName(lecture.id, id);

    try {
      const isExists = await RNFS.exists(videoDirPath);
      if (!isExists) {
        await RNFS.mkdir(videoDirPath);
      }
      await RNFS.downloadFile({
        fromUrl: lecture.videoUrl,
        toFile,
        begin: (res) => {
          const { jobId, statusCode } = res;
          beginDownloadVideo(lecture.id, jobId, statusCode);
        },
        progress: ({ bytesWritten, contentLength, jobId }) => {
          const progress = bytesWritten / contentLength;
          progressDownloadVideo(lecture.id, jobId, progress);
        },
        progressDivider: 2,
      }).promise;
      finishDownloadVideo(lecture.id);
    } catch (error) {
      if (error.message !== 'Download has been aborted') {
        errorDownloadVideo(lecture.id);
        new Client().notify(error);
        Alert.alert(I18n.t('errorTitle'), I18n.t('networkFailure'));
        console.error(error);
      }
    }
  }

  render() {
    const {
      id,
      isFetching,
      isOnline,
      lectures,
      sectionMergedLectureList,
      lectureCount,
      lectureProgress,
      title,
      totalDuration,
    } = this.props;

    StatusBar.setBarStyle('light-content');

    if (isFetching) {
      return <SleekLoadingIndicator loading={isFetching} text={I18n.t('loading')} />;
    }

    const courseInfo = {
      totalLectureCount: lectureCount,
      completeLectureCount: lectureProgress,
      courseTitle: title,
      totalDuration,
      nextLecture: getNextNotCompletedLecture({}, { lectures, currentCourseId: id }),
    };

    return (
      <ScrollView
        style={{ flex: 1 }}
        showVerticalScrollIndicator={false}
        indicatorStyle={'white'}
      >
        <View
          style={{
            flex: 1,
            paddingTop: BaseStyles.navbarHeight,
            paddingBottom: BaseStyles.navbarHeight,
          }}
        >
          <CourseInfoSection
            {...courseInfo}
            handlePressNextLecture={this.handlePressNextLecture}
            containerStyle={{
              height: _.isEmpty(courseInfo.nextLecture)
                ? QUARTER_DISPLAY_HEIGHT : HALF_DISPLAY_HEIGHT,
            }}
          />
          {!lectures.isEmpty() &&
          <LectureList
            containerStyleId={styles.lectureContainer}
            lectureList={sectionMergedLectureList}
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
