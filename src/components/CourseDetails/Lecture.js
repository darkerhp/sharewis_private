import React from 'react';
import ReactNative from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Duration from '../Duration';
import BaseStyles from '../../baseStyles';

const { PropTypes } = React;
const { View, StyleSheet, Text, TouchableOpacity } = ReactNative;

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
  lectureIcon: {},
  durationWrapper: {
    flex: 1,
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

const Lecture = ({ lecture, handlePressLecture }) =>
  <View style={styles.container}>
    <View style={styles.lectureNoTextWrapper}>
      <Text style={styles.lectureNoText}>{lecture.order}</Text>
    </View>

    <View style={styles.lectureInfoWrapper}>
      <View style={styles.lectureIconWrapper}>
        <Icon
          // name={'picture-as-pdf'} TODO レクチャータイプ毎にアイコンを変える
          name={'play-circle-filled'}
          style={styles.lectureIcon}
        />
      </View>
      <Duration duration={lecture.duration} containerStyle={styles.durationWrapper} />
    </View>

    <TouchableOpacity
      style={styles.lectureTitleTextWrapper}
      onPress={() => handlePressLecture(lecture)}
    >
      <Text style={styles.lectureTitleText}>{lecture.title}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.actionIconWrapper}>
      <Icon
        // name={'delete'}
        name={'cloud-download'}
        style={styles.actionIcon}
      />
    </TouchableOpacity>
  </View>;


Lecture.propTypes = {
  lecture: PropTypes.shape({
    /* eslint-disable react/no-unused-prop-types */
    order: PropTypes.number,
    title: PropTypes.string,
    kind: PropTypes.string,
    duration: PropTypes.number,
    isCompleted: PropTypes.bool,
    type: PropTypes.string,
    /* eslint-enable react/no-unused-prop-types */
  }).isRequired,
  handlePressLecture: PropTypes.func.isRequired,
};

export default Lecture;
