import React from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';

import BaseStyles from '../../baseStyles';

const { PropTypes } = React;
const { Platform, StyleSheet, TouchableOpacity } = ReactNative;

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

const renderIcon = (lecture) => {
  if (lecture.isDownloading) {
    return (
      <Progress.Circle
        size={30}
        thickness={3}
        progress={lecture.progress}
        color={BaseStyles.navBarBackgroundColor}
      />
    );
  }
  return (
    <Icon
      name={lecture.hasVideoInDevice ? 'delete' : 'cloud-download'}
      style={styles.actionIcon}
    />
  );
};

const DownloadAction = ({ handlePressDelete, handlePressDownload, lecture }) => (
  <TouchableOpacity
    style={styles.actionIconWrapper}
    onPress={() => (
      lecture.hasVideoInDevice ? handlePressDelete(lecture) : handlePressDownload(lecture)
    )}
  >
    {renderIcon(lecture)}
  </TouchableOpacity>
);

DownloadAction.propTypes = {
  // values
  lecture: PropTypes.shape({}).isRequired,
  // actions
  handlePressDelete: PropTypes.func.isRequired,
  handlePressDownload: PropTypes.func.isRequired,
};

export default DownloadAction;
