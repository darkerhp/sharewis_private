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
const { Dimensions, ScrollView, StatusBar, View } = ReactNative;

const { height } = Dimensions.get('window');
const HALF_DISPLAY_HEIGHT = (height - BaseStyles.navbarHeight) / 2;
const QUARTER_DISPLAY_HEIGHT = (height - BaseStyles.navbarHeight) / 4;

class CourseDetails extends Component {
  static propTypes = {
    course: PropTypes.shape({
      /* eslint-disable react/no-unused-prop-types */
      title: PropTypes.string.required,
      lectures: PropTypes.array.required,
      /* eslint-enable react/no-unused-prop-types */
    }),
    // lectures: PropTypes.arrayOf(PropTypes.shape({
    //   id: PropTypes.number.isRequired,
    //   title: PropTypes.string.isRequired,
    //   duration: PropTypes.number.isRequired,
    //   type: PropTypes.number.isRequired,
    // })).isRequired,
  };

  @autobind
  handlePressNextLecture() {
    const { course } = this.props;
    const nextLecture = CourseUtils.getNextLecture(course);
    RouterActions.lecture({
      title: nextLecture.title,
      lectureId: nextLecture.id,
      course,
    });
  }

  @autobind
  handlePressLecture(lecture) {
    const { course } = this.props;
    RouterActions.lecture({
      title: lecture.title,
      lectureId: lecture.id,
      course,
    });
  }

  render() {
    const { course } = this.props;
    const completeLectureCount = CourseUtils.completeLectureCount(course);
    const totalLectureCount = CourseUtils.totalLectureCount(course);
    const isCompleted = completeLectureCount === totalLectureCount;
    const courseInfo = {
      totalLectureCount,
      completeLectureCount,
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
            containerStyle={{ flex: 1 }}
            lectures={course.lectures}
            handlePressLecture={this.handlePressLecture}
          />
        </View>
      </ScrollView>
    );
  }
}

export default connectToProps(CourseDetails, 'courses');
