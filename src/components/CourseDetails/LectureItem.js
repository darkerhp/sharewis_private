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
  lectureDisabled: {
    ...Platform.select({
      android: {
        opacity: 0.2,
      },
      ios: {
        opacity: 0.4,
      },
    }),
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
  lectureNoTextCompleted: {
    fontSize: 14,
    color: 'white',
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
  lectureIcon: {
    color: BaseStyles.textColor,
    fontSize: 15,
  },
  durationWrapper: {
    flex: 1,
  },
  durationStyle: {
    fontSize: 8,
    padding: 3,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
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
const renderDownloadAction = (handlePressDelete, handlePressDownload, lecture) =>
  <TouchableOpacity
    style={styles.actionIconWrapper}
    onPress={() => (
      lecture.hasVideoInDevice ? handlePressDelete(lecture) : handlePressDownload(lecture)
    )}
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

const LectureItem = ({
  currentLecture,
  handlePressDelete,
  handlePressLecture,
  handlePressDownload,

}) => {
  const isAccessibleLecture = currentLecture.type === LECTURE_TYPE_VIDEO;
  return (
    <View style={styles.container}>
      <View
        style={currentLecture.status === LECTURE_STATUS_FINISHED
          ? styles.lectureNoTextWrapperCompleted
          : styles.lectureNoTextWrapper}
      >
        <Text
          style={[
            (currentLecture.status === LECTURE_STATUS_FINISHED
             ? styles.lectureNoTextCompleted
             : styles.lectureNoText),
            (!isAccessibleLecture ? styles.lectureDisabled : {}),
          ]}
        >{currentLecture.order}</Text>
      </View>

      <View
        style={[styles.lectureInfoWrapper, (!isAccessibleLecture ? styles.lectureDisabled : {})]}
      >
        <View style={styles.lectureIconWrapper}>
          <Icon
            style={styles.lectureIcon}
            name={LectureUtils.getLectureIconName(currentLecture)}
          />
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
        <Text
          style={[styles.lectureTitleText, (!isAccessibleLecture ? styles.lectureDisabled : {})]}
        >{currentLecture.title}</Text>
      </TouchableOpacity>

      {isAccessibleLecture && renderDownloadAction(
        handlePressDelete, handlePressDownload, currentLecture
      )}
    </View>
  );
};

LectureItem.propTypes = {
  // values
  currentLecture: PropTypes.shape({}).isRequired,
  // actions
  handlePressLecture: PropTypes.func.isRequired,
  handlePressDelete: PropTypes.func.isRequired,
  handlePressDownload: PropTypes.func.isRequired,
};

export default LectureItem;
