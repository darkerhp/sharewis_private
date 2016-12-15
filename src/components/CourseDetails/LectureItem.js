import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BaseStyles from '../../baseStyles';
import * as LectureUtils from '../../utils/lecture';
import {
  LECTURE_TYPE_VIDEO,
  LECTURE_TYPE_TEXT,
  LECTURE_TYPE_QUIZ,
  LECTURE_TYPE_PDF,
  LECTURE_TYPE_ATTACHMENT,
  LECTURE_TYPE_AUDIO,
  LECTURE_STATUS_FINISHED } from '../../constants/Api';
import Duration from '../Duration';
import DownloadAction from './DownloadAction';

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

const LectureItem = ({
  lecture,
  isOnline,
  handlePressDelete,
  handlePressLecture,
  handlePressDownload,
}) => {
  const isAccessibleLecture = (() => {
    switch (lecture.type) {
      case LECTURE_TYPE_VIDEO:
        return isOnline || lecture.hasVideoInDevice;
      case LECTURE_TYPE_TEXT:
        break;
      case LECTURE_TYPE_QUIZ:
      case LECTURE_TYPE_PDF:
      case LECTURE_TYPE_ATTACHMENT:
      case LECTURE_TYPE_AUDIO:
      default:
        return false;
    }
    return isOnline;
  })();

  return (
    <View style={styles.container}>
      <View
        style={lecture.status === LECTURE_STATUS_FINISHED
          ? styles.lectureNoTextWrapperCompleted
          : styles.lectureNoTextWrapper}
      >
        <Text
          style={[
            (lecture.status === LECTURE_STATUS_FINISHED
              ? styles.lectureNoTextCompleted
              : styles.lectureNoText),
            !isAccessibleLecture && styles.lectureDisabled,
          ]}
        >{lecture.order}</Text>
      </View>

      <View
        style={[
          styles.lectureInfoWrapper,
          !isAccessibleLecture && styles.lectureDisabled,
        ]}
      >
        <View style={styles.lectureIconWrapper}>
          <Icon
            style={styles.lectureIcon}
            name={lecture.getLectureIconName()}
          />
        </View>
        <Duration
          estimatedTime={lecture.estimatedTime}
          containerStyle={styles.durationWrapper}
          durationStyle={styles.durationStyle}
        />
      </View>

      <TouchableOpacity
        style={[styles.lectureTitleTextWrapper, !isAccessibleLecture && { flex: 6 }]}
        onPress={() => handlePressLecture(lecture)}
        disabled={!isAccessibleLecture}
      >
        <Text
          style={[styles.lectureTitleText, !isAccessibleLecture && styles.lectureDisabled]}
        >{lecture.title}</Text>
      </TouchableOpacity>

      {isAccessibleLecture &&
        <DownloadAction
          handlePressDelete={handlePressDelete}
          handlePressDownload={handlePressDownload}
          lecture={lecture}
        />
      }
    </View>
  );
};

LectureItem.propTypes = {
  // values
  lecture: PropTypes.shape({}).isRequired,
  isOnline: PropTypes.bool.isRequired,
  // actions
  handlePressLecture: PropTypes.func.isRequired,
  handlePressDelete: PropTypes.func.isRequired,
  handlePressDownload: PropTypes.func.isRequired,
};

export default LectureItem;
