import React from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import BaseStyles from '../../baseStyles';
import * as LectureUtils from '../../utils/lecture';
import { LECTURE_TYPE_VIDEO, LECTURE_STATUS_FINISHED } from '../../constants/Api';
import Duration from '../Duration';

const { Component, PropTypes } = React;
const { Platform, StyleSheet, Text, TouchableOpacity, View } = ReactNative;

const lectureRowHeight = 48;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderColor: BaseStyles.borderColor,
    borderBottomWidth: 1,
  },
  lectureNoTextWrapper: {
    flex: 1,
    height: lectureRowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BaseStyles.borderColor,
    borderRightWidth: 1,
  },
  lectureNoTextWrapperCompleted: { // FIXME lectureNoTextWrapperと共通化できる？
    flex: 1,
    height: lectureRowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BaseStyles.backgroundColor,
    borderRightWidth: 1,
    backgroundColor: BaseStyles.backgroundColor,
  },
  lectureNoText: {
    fontSize: 14,
    color: BaseStyles.textColor,
    fontWeight: '600',
  },
  lectureInfoWrapper: {
    flex: 1,
    height: lectureRowHeight,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lectureIconWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  durationWrapper: {
    flex: 1,
  },
  durationStyle: {
    ...Platform.select({
      android: {
        color: BaseStyles.textColor,
        width: 30,  // or seconds will be trimmed in android
      },
    }),
  },
  lectureTitleTextWrapper: {
    flex: 5,
    height: lectureRowHeight,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  lectureTitleText: {
    fontSize: 12,
    color: BaseStyles.textColor,
    fontWeight: 'bold',
  },
  actionIconWrapper: {
    flex: 1,
    height: lectureRowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    color: '#757575',
    fontSize: 32,
  },
});

// TODO components化
const renderDownloadAction = (handlePressDownload, lecture) =>
  <TouchableOpacity
    style={styles.actionIconWrapper}
    onPress={() => handlePressDownload(lecture)}
  >
    {lecture.isDownloading
      ?
      <AnimatedCircularProgress
        size={30}
        width={3}
        fill={lecture.percentage}
        rotation={0}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
      />
      :
      <Icon
        name={lecture.hasVideoInDevice ? 'delete' : 'cloud-download'}
        style={styles.actionIcon}
      />
    }
  </TouchableOpacity>;

class LectureItem extends Component {
  static propTypes = {
    currentLecture: PropTypes.shape({}).isRequired,
    handlePressLecture: PropTypes.func.isRequired,
    handlePressDownload: PropTypes.func.isRequired,
    fetchDownloadStatus: PropTypes.func.isRequired,
    courseId: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const { courseId, currentLecture, fetchDownloadStatus } = this.props;
    fetchDownloadStatus(courseId, currentLecture.id);
  }

  render() {
    const { currentLecture, handlePressLecture, handlePressDownload } = this.props;
    const isAccessibleLecture = currentLecture.type === LECTURE_TYPE_VIDEO;
    return (
      <View style={[styles.container, (!isAccessibleLecture ? { backgroundColor: 'lightgray' } : {})]}>
        <View
          style={currentLecture.status === LECTURE_STATUS_FINISHED
            ? styles.lectureNoTextWrapperCompleted
            : styles.lectureNoTextWrapper}
        >
          <Text style={styles.lectureNoText}>{currentLecture.order}</Text>
        </View>

        <View style={styles.lectureInfoWrapper}>
          <View style={styles.lectureIconWrapper}>
            <Icon name={LectureUtils.getLectureIconName(currentLecture)} />
          </View>
          <Duration
            estimatedTime={currentLecture.estimatedTime}
            containerStyleId={styles.durationWrapper}
            durationStyleId={styles.durationStyle}
          />
        </View>

        <TouchableOpacity
          style={[styles.lectureTitleTextWrapper, (!isAccessibleLecture ? { flex: 6 } : {})]}
          onPress={() => handlePressLecture(currentLecture)}
          disabled={!isAccessibleLecture}
        >
          <Text style={styles.lectureTitleText}>{currentLecture.title}</Text>
        </TouchableOpacity>

        {isAccessibleLecture && renderDownloadAction(handlePressDownload, currentLecture)}
      </View>
    );
  }
}

export default LectureItem;
