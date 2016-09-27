import React from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BaseStyles from '../../baseStyles';
import * as LectureUtils from '../../utils/lecture';
import Duration from '../Duration';

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
  lectureIcon: {},
  estimatedTimeWrapper: {
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


const renderDownloadAction = () =>
  <TouchableOpacity style={styles.actionIconWrapper}>
    <Icon
      // name={'delete'}
      name={'cloud-download'}
      style={styles.actionIcon}
    />
  </TouchableOpacity>;

const Lecture = ({ lectures, currentLecture, handlePressLecture }) => {
  const isAccessibleLecture = currentLecture.type === 'VideoLecture';
  return (
    <View style={[styles.container, (!isAccessibleLecture ? { backgroundColor: 'lightgray' } : {})]}>
      <View
        style={currentLecture.isCompleted
                ? styles.lectureNoTextWrapperCompleted
                : styles.lectureNoTextWrapper}
      >
        <Text style={styles.lectureNoText}>{currentLecture.order}</Text>
      </View>

      <View style={styles.lectureInfoWrapper}>
        <View style={styles.lectureIconWrapper}>
          <Icon
            name={LectureUtils.getLectureIconName(currentLecture)}
            style={styles.lectureIcon}
          />
        </View>
        <Duration
          estimatedTime={currentLecture.estimatedTime}
          containerStyleId={styles.estimatedTimeWrapper}
        />
      </View>

      <TouchableOpacity
        style={[styles.lectureTitleTextWrapper, (!isAccessibleLecture ? { flex: 6 } : {})]}
        onPress={() => handlePressLecture(currentLecture, lectures)}
        disabled={!isAccessibleLecture}
      >
        <Text style={styles.lectureTitleText}>{currentLecture.title}</Text>
      </TouchableOpacity>

      {isAccessibleLecture && renderDownloadAction()}
    </View>
  );
};


Lecture.propTypes = {
  lectures: PropTypes.arrayOf(PropTypes.shape({})),
  currentLecture: PropTypes.shape({
    /* eslint-disable react/no-unused-prop-types */
    order: PropTypes.number,
    title: PropTypes.string,
    kind: PropTypes.string,
    estimatedTime: PropTypes.number,
    isCompleted: PropTypes.bool,
    type: PropTypes.string,
    /* eslint-enable react/no-unused-prop-types */
  }).isRequired,
  handlePressLecture: PropTypes.func.isRequired,
};


export default Lecture;
