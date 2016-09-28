import React from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import { Actions as RouterActions } from 'react-native-router-flux';
import RNFS from 'react-native-fs';

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
    id: PropTypes.number.isRequired,
    lectures: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    lectureCount: PropTypes.number.isRequired,
    lectureProgress: PropTypes.number.isRequired,
    loadCurrentLecture: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    isLectureDownloading: PropTypes.bool.isRequired,
    pressDownloadVideo: PropTypes.func.isRequired,
    beginDownloadVideo: PropTypes.func.isRequired,
    progressDownloadVideo: PropTypes.func.isRequired,
    finishDownloadVideo: PropTypes.func.isRequired,
    fetchDownloadStatus: PropTypes.func.isRequired,
  };

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
    return RouterActions.lecture({ title: lecture.title });
  }

  @autobind
  handlePressDownload(lecture) {
    const {
      id,
      lectures,
      isLectureDownloading,
      pressDownloadVideo,
      beginDownloadVideo,
      progressDownloadVideo,
      finishDownloadVideo,
    } = this.props;

    if (isLectureDownloading) {
      // TODO
      Alert.alert('エラー', '現在他のレクチャーをダウンロード中です');
      return;
    }

    pressDownloadVideo();

    const videoDirPath = FileUtils.getCourseVideosDirPath(id);
    const toFile = FileUtils.createVideoFileName(lecture.id, id);
    console.log(videoDirPath);

    (async() => {
      const isExistsDir = await RNFS.exists(videoDirPath);
      if (!isExistsDir) await RNFS.mkdir(videoDirPath);
      try {
        await RNFS.downloadFile({
          fromUrl: lecture.url,
          toFile,
          begin: (res) => {
            const { jobId, statusCode } = res;
            beginDownloadVideo(lectures, lecture.id, jobId, statusCode);
          },
          progress: (data) => {
            const percentage = Math.ceil((100 * data.bytesWritten) / data.contentLength);
            progressDownloadVideo(lectures, lecture.id, percentage);
          },
          progressDivider: 2,
        });
      } catch (err) {
        console.error(err);
        Alert.alert('エラー', 'ダウンロード中にエラーが発生しました。'); // TODO
      }
      finishDownloadVideo(lectures, lecture.id);
    })();
  }

  render() {
    const { id, lectures, lectureCount, lectureProgress, title, fetchDownloadStatus } = this.props;
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
        <View style={BaseStyles.ContainerWithNavbar}>
          <StatusBar barStyle="light-content" />
          <CourseInfoSection
            {...courseInfo}
            handlePressNextLecture={this.handlePressNextLecture}
            containerStyle={{ height: isCompleted ? QUARTER_DISPLAY_HEIGHT : HALF_DISPLAY_HEIGHT }}
          />
          <LectureList
            containerStyleId={styles.lectureContainer}
            lectures={lectures}
            courseId={id}
            handlePressLecture={this.handlePressLecture}
            handlePressDownload={this.handlePressDownload}
            fetchDownloadStatus={fetchDownloadStatus}
          />
        </View>
      </ScrollView>
    );
  }
}

export default CourseDetails;
