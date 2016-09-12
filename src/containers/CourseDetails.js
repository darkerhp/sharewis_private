import React from 'react';
import ReactNative from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import Progress from '../components/CourseDetails/Progress';
import LectureList from '../components/CourseDetails/LectureList';
// import Section from '../components/CourseDetails/Section';
import Duration from '../components/Duration';
import BaseStyles from '../baseStyles';

import { lectures, course } from './dummyData';

const { Component } = React;
const {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} = ReactNative;
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 65 },
  courseInfoContainer: { height: (height - 65) / 2, padding: 10 },
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
  courseImage: {},
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
  nextLectureTitleText: {
    color: 'white',
    position: 'absolute',
    top: 30,
    left: 75,
    backgroundColor: 'rgba(0,0,0,0)',
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

const videoImageSrc = require('../components/CourseDetails/images/video.png');
const quizImageSrc = require('../components/CourseDetails/images/quiz.png');
const textImageSrc = require('../components/CourseDetails/images/text.png');

class CourseDetails extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  handleOnPressNextLecture(nextLecture) {
    RouterActions.lecture({
      lecture: nextLecture,
      title: nextLecture.title,
    });
  }

  getNextLecture(lectures) {
    filteredLecture = lectures
      .filter(l =>
        l.kind === 'lecture' && l.type === 'VideoLecture' && l.isCompleted === false
      ).sort((a, b) => {
        if (a.order === b.order) return 0;
        return a.order < b.order ? -1 : 1;
      });
    return filteredLecture[0] || {};
  }

  getNextLectureImageSrc(nextLecture) {
    switch (nextLecture.type) {
      case 'VideoLecture':
        return videoImageSrc;
      case 'QuizLecture':
        return quizImageSrc;
      case 'TextLecture':
        return textImageSrc;
      default:
        return videoImageSrc;
    }
  }

  render() {
    const totalLectureCount = lectures.filter(l => l.kind === 'lecture').length;
    const completeLectureCount = lectures.filter(l => l.isCompleted).length;
    const totalDuration = lectures.map(l => l.duration || 0).reduce((a, b) => a + b);
    // TODO testしにくいので移動する
    const nextLecture = this.getNextLecture(lectures);
    return (
      <ScrollView
        style={styles.container}
        automaticallyAdjustContentInsets={false}
      >
        <View style={styles.courseInfoContainer}>
          <View style={styles.courseTitleWrapper}>
            <Text>{course.title}</Text>
          </View>

          <View style={styles.nextLectureContainer} visible={false}>
            <TouchableOpacity
              onPress={() => this.handleOnPressNextLecture(nextLecture)}
            >
              <View style={styles.courseImageWrapper}>
                <Image
                  source={this.getNextLectureImageSrc(nextLecture)}
                  style={styles.courseImage}
                  resizeMode={Image.resizeMode.contain}
                />
                <Text style={styles.nextLectureTitleText}>{nextLecture.title}</Text>
              </View>
              <View style={styles.nextLectureTextWrapper}>
                <Text style={styles.nextLectureText}>{t.nextLecture}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Progress
            completeLectureCount={completeLectureCount}
            totalLectureCount={totalLectureCount}
          />

          <Duration
            duration={totalDuration}
            format={t.totalDurationFormat}
            containerStyle={styles.totalDurationWrapper}
            durationStyle={styles.totalDuration}
          />
        </View>

        <LectureList lectures={course.lectures} containerStyle={{flex: 1}} />
      </ScrollView>
    );
  }
}

CourseDetails.propTypes = {};
CourseDetails.defaultProps = {};
export default CourseDetails;
