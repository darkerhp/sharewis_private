import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';

import BaseStyles from '../../lib/baseStyles';

const { StyleSheet, TouchableOpacity } = ReactNative;

const lectureRowHeight = 48;
const styles = StyleSheet.create({
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
