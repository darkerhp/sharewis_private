import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BaseStyles from '../../lib/baseStyles';
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
    borderColor: BaseStyles.navBarBackgroundColor,
    borderRightWidth: 1,
    backgroundColor: BaseStyles.navBarBackgroundColor,
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
}) => (
  <View style={styles.container}>
    <View
      style={lecture.isFinished()
          ? styles.lectureNoTextWrapperCompleted
          : styles.lectureNoTextWrapper}
    >
      <Text
        style={[
            (lecture.isFinished()
              ? styles.lectureNoTextCompleted
              : styles.lectureNoText),
          !lecture.canAccess(isOnline) && styles.lectureDisabled,
        ]}
      >{lecture.order}</Text>
    </View>

    <View
      style={[
        styles.lectureInfoWrapper,
        !lecture.canAccess(isOnline) && styles.lectureDisabled,
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
      style={[styles.lectureTitleTextWrapper, !lecture.canAccess(isOnline) && { flex: 6 }]}
      onPress={() => handlePressLecture(lecture)}
      disabled={!lecture.canAccess(isOnline)}
    >
      <Text
        style={[styles.lectureTitleText, !lecture.canAccess(isOnline) && styles.lectureDisabled]}
      >{lecture.title}</Text>
    </TouchableOpacity>

    {lecture.canAccess(isOnline) &&
      <DownloadAction
        handlePressDelete={handlePressDelete}
        handlePressDownload={handlePressDownload}
        lecture={lecture}
      />
    }
  </View>
  );

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
