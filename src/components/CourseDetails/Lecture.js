import React from 'react';
import ReactNative from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';
import momentDurationFormat from 'moment-duration-format'; // eslint-disable-line

const { Component, PropTypes } = React;
const { View, StyleSheet, Text, Slider, Dimensions } = ReactNative;

const lectureRowHeight = 48;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
  lectureNoTextWrapper: {
    flex: 1,
    height: lectureRowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DDDDDD',
    borderRightWidth: 1,
  },
  lectureNoText: {
    fontSize: 14,
    color: '#525252',
    fontWeight: '600',
  },
  lectureInfoWrapper: {

  },
  lectureIconWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  lectureIcon: {},
  durationWrapper: {
    flex: 1,
  },
  duration: {
    padding: 3,
    fontSize: 8,
    backgroundColor: '#F2F2F2',
    fontWeight: '600',
  },
  lectureTitleTextWrapper: {
    flex: 5,
    height: lectureRowHeight,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  lectureTitleText: {
    fontSize: 12,
    color: '#525252',
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

const Lecture = ({ lecture }) =>
  <View style={styles.container}>
    <View style={styles.lectureNoTextWrapper}>
      <Text style={styles.lectureNoText}>{lecture.order}</Text>
    </View>

    <View style={{
      flex:1,
      height: lectureRowHeight,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'}
    }>
      <View style={styles.lectureIconWrapper}>
        <Icon
          //name={'picture-as-pdf'}
          name={'play-circle-filled'}
          style={styles.lectureIcon}
        />
      </View>
      <View style={styles.durationWrapper}>
        <Text style={styles.duration}>
          {moment.duration(lecture.duration, 'seconds').format('mm:ss', { trim: false })}
        </Text>
      </View>
    </View>

    <View style={styles.lectureTitleTextWrapper}>
      <Text style={styles.lectureTitleText}>{lecture.title}</Text>
    </View>

    <View style={styles.actionIconWrapper}>
      <Icon
        //name={'delete'}
        name={'cloud-download'}
        style={styles.actionIcon}
      />
    </View>
  </View>;


Lecture.propTypes = {
  lecture: PropTypes.object.isRequired
};

export default Lecture;
