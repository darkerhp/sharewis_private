import React from 'react';
import ReactNative from 'react-native';

import moment from 'moment';
import momentDurationFormat from 'moment-duration-format'; // eslint-disable-line

import Progress from '../components/CourseDetails/Progress';
import Lecture from '../components/CourseDetails/Lecture';
import Section from '../components/CourseDetails/Section';

const { Component, PropTypes } = React;
const { View, StyleSheet, Text, Image, ScrollView, Dimensions, TouchableOpacity } = ReactNative;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 65 },
  courseInfosContainer: { height: (height - 65) / 2, padding: 10 },
  lectureListContainer: {
    flex: 1,
    borderColor: '#DDDDDD',
    borderTopWidth: 1,
  },
  courseTitleWrapper: { flex: 1 },
  courseTitleText: { color: 'black', fontSize: 24, fontWeight: '900' },
  nextLectureContainer: {
    flex: 3,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  courseImageWrapper: {
    flex: 2,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  courseImage: {
    // width: width - 20,
  },
  nextLectureTextWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#579eff',
  },
  nextLectureText: {
    color: 'white',
    fontWeight: '900',
  },
  totalDurationWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  totalDuration: {
    color: 'black',
    fontSize: 10,
    padding: 5,
    backgroundColor: '#F2F2F2',
  },
});

const t = {
  nextLecture: '次のレクチャーへ',
  totalDurationFormat: '計 h時間m分',
};

// Dummy data
const lectures = [
  { title: 'セクション１', kind: 'section' },
  { order: 1, title: 'レクチャーA', kind: 'lecture', duration: 30, isCompleted: true },
  { order: 2, title: 'レクチャーB', kind: 'lecture', duration: 60, isCompleted: true },
  { order: 3, title: 'レクチャーC', kind: 'lecture', duration: 90, isCompleted: true },
  { title: 'セクション2', kind: 'section' },
  { order: 4, title: 'レクチャーD', kind: 'lecture', duration: 30, isCompleted: false },
  { order: 5, title: 'レクチャーE', kind: 'lecture', duration: 60, isCompleted: false },
  { order: 6, title: 'レクチャーF', kind: 'lecture', duration: 90, isCompleted: false },
  { title: 'セクション3', kind: 'section' },
  { order: 7, title: 'レクチャーG', kind: 'lecture', duration: 30, isCompleted: false },
  { order: 8, title: 'レクチャーH', kind: 'lecture', duration: 60, isCompleted: false },
  { order: 9, title: 'レクチャーI', kind: 'lecture', duration: 90, isCompleted: false },
  { title: 'セクション4', kind: 'section' },
  { order: 10, title: 'レクチャーJ', kind: 'lecture', duration: 30, isCompleted: false },
  { order: 11, title: 'レクチャーK', kind: 'lecture', duration: 60, isCompleted: false },
  { order: 12, title: 'レクチャーL', kind: 'lecture', duration: 90, isCompleted: false },
];

const course = {
  title: '差がつくビジネス戦略講座 | 事業開発・Platform戦略(R)・ITマーケティング',
  lectures: lectures,
};

const videoImageSrc = require('../components/CourseDetails/images/video.png');

class CourseDetails extends Component {

  render() {
    const totalLectureCount = lectures.filter(e => e.kind === 'lecture').length;
    const completeLectureCount = lectures.filter(e => e.isCompleted).length;
    const totalDuration = lectures.map(e => e.duration || 0).reduce((a, b) => a + b);
    return (
      <ScrollView
        style={styles.container}
        automaticallyAdjustContentInsets={false}
      >
        <View style={styles.courseInfosContainer}>
          <View style={styles.courseTitleWrapper}>
            <Text>{course.title}</Text>
          </View>

          <View style={styles.nextLectureContainer}>
            <TouchableOpacity>
              <View style={styles.courseImageWrapper}>
                <Image source={videoImageSrc} style={styles.courseImage} resizeMode={Image.resizeMode.contain} />
              </View>
              <View style={styles.nextLectureTextWrapper}>
                <Text style={styles.nextLectureText}>{t.nextLecture}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Progress completeLectureCount={completeLectureCount} totalLectureCount={totalLectureCount} />

          <View style={styles.totalDurationWrapper}>
            <Text
              style={styles.totalDuration}
            >{moment.duration(totalDuration, 'seconds').format(t.totalDurationFormat, { trim: false })}</Text>
          </View>
        </View>

        <View style={styles.lectureListContainer}>
          {course.lectures.map((lecture, i) =>
            lecture.kind === 'section'
              ? <Section key={i} lecture={lecture} />
              : <Lecture key={i} lecture={lecture} />)
          }
        </View>
      </ScrollView>
    );
  }
}

CourseDetails.propTypes = {};
CourseDetails.defaultProps = {};

export default CourseDetails;
