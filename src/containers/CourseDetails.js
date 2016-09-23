/* eslint-disable no-console */
import React from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import { Actions as RouterActions } from 'react-native-router-flux';

import LectureList from '../components/CourseDetails/LectureList';
import CourseInfoSection from '../components/CourseDetails/CourseInfoSection';
import * as CourseUtils from '../utils/course';
import * as LectureUtils from '../utils/lecture';
import connectToProps from '../utils/redux';
import BaseStyles from '../baseStyles';

const { Component, PropTypes } = React;
const {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} = ReactNative;

const { height } = Dimensions.get('window');
const HALF_DISPLAY_HEIGHT = (height - BaseStyles.navbarHeight) / 2;
const QUARTER_DISPLAY_HEIGHT = (height - BaseStyles.navbarHeight) / 4;

const styles = StyleSheet.create({
  lectureContainer: { flex: 1 },
});


class CourseDetails extends Component {
  static propTypes = {
    course: PropTypes.shape({
      /* eslint-disable react/no-unused-prop-types */
      title: PropTypes.string.required,
      lectures: PropTypes.array.required,
      /* eslint-enable react/no-unused-prop-types */
    }),
  };

  /*
  componentWillMount() { console.log('componentWillMount')};
  componentDidMount() { console.log('componentDidMount')};
  componentWillReceiveProps(nextProps) { console.log('componentWillReceiveProps', nextProps)};
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
  };
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', nextProps, nextState)
  };
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevProps, prevState)
  };
  componentWillUnmount() { console.log('componentWillUnmount')};
  */

  @autobind
  handlePressNextLecture() {
    const { course } = this.props;
    const lecture = LectureUtils.getNextVideoLecture(course.lectures);
    return this.handlePressLecture(lecture);
  }

  @autobind
  handlePressLecture(lecture) {
    const { course } = this.props;
    return RouterActions.lecture({
      title: lecture.title,
      lectureId: lecture.id,
      course,
    });
  }

  render() {
    const { course } = this.props;
    console.log(`in render with ${course.lecture_progress} lectures completed`);
    const isCompleted = course.lecture_progress === course.lecture_count;
    const courseInfo = {
      totalLectureCount: course.lecture_count,
      completeLectureCount: course.lecture_progress,
      isCompleted,
      courseTitle: course.title,
      totalDuration: CourseUtils.totalDuration(course),
      nextLecture: LectureUtils.getNextVideoLecture(course.lectures),
    };
    return (
      <ScrollView
        style={{ flex: 1 }}
        showVerticalScrollIndicator={false}
        indicatorStyle={'white'}
      >
        <View style={BaseStyles.ContainerWithNavbar}>
          <StatusBar barStyle="light-content" />
          <CourseInfoSection
            {...courseInfo}
            handlePressNextLecture={this.handlePressNextLecture}
            containerStyle={{ height: isCompleted ? QUARTER_DISPLAY_HEIGHT : HALF_DISPLAY_HEIGHT }}
          />
          <LectureList
            containerStyleId={styles.lectureContainer}
            lectures={course.lectures}
            handlePressLecture={this.handlePressLecture}
          />
        </View>
      </ScrollView>
    );
  }
}

export default connectToProps(CourseDetails, 'courses');
