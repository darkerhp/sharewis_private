import React from 'react';
import ReactNative from 'react-native';

import Progress from '../components/CourseDetails/Progress';
import LectureList from '../components/CourseDetails/LectureList';

const { Component, PropTypes } = React;
const { View, StyleSheet, Text, Image } = ReactNative;


const styles = StyleSheet.create({
  barContainer: { flex: 1, paddingTop: 65 },
  courseInfosContainer: { flex: 1, padding: 15 },
  lectureListContainer: { flex: 1 },
  courseTitleWrapper: { flex: 1 },
  courseTitleText: { color: 'black', fontSize: 24, fontWeight: '900' },
  courseImageWrapper: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  courseImage: { width: 300, height: 100 },
  totalDurationWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  totalDuration: {
    color: 'black',
    fontSize: 10,
    padding: 5,
    backgroundColor: '#F2F2F2',
  },
});

const lectures = [
  { section: { id: 1, title: 'セクション１' } }
];
const slide1ImageSrc = require('../components/Onboarding/images/slide1.png');

class CourseDetails extends Component {

  render() {
    return (
      <View style={styles.barContainer}>
        <View style={styles.courseInfosContainer}>
          <View style={styles.courseTitleWrapper}>
            <Text>差がつくビジネス戦略講座 | 事業開発・Platform戦略(R)・ITマーケティング</Text>
          </View>
          <View style={styles.courseImageWrapper}>
            <Image source={slide1ImageSrc} style={styles.courseImage}/>
          </View>
          <Progress completeLectureCount={10} totalLectureCount={50}/>
          <View style={styles.totalDurationWrapper}>
            <Text style={styles.totalDuration}>計４時間１分</Text>
          </View>
        </View>
        <View style={styles.lectureListContainer}>
          <LectureList lectures={} />
        </View>
      </View>
    );
  }
}

CourseDetails.propTypes = {};
CourseDetails.defaultProps = {};

export default CourseDetails;
