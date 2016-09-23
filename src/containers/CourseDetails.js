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
    currentCourse: PropTypes.shape({}),
  };

  @autobind
  handlePressNextLecture() {
    const { currentCourse } = this.props;
    const nextLecture = LectureUtils.getNextVideoLecture(currentCourse.lectures);
    RouterActions.lecture({ currentLecture: nextLecture });
  }


  render() {
    const { currentCourse } = this.props;
    console.log(`in render with ${currentCourse.lectureProgress} lectures completed`);
    const isCompleted = currentCourse.lectureProgress === currentCourse.lectureCount;
    const courseInfo = {
      totalLectureCount: currentCourse.lectureCount,
      completeLectureCount: currentCourse.lectureProgress,
      isCompleted,
      courseTitle: currentCourse.title,
      totalDuration: CourseUtils.totalDuration(currentCourse),
      nextLecture: LectureUtils.getNextVideoLecture(currentCourse.lectures),
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
            lectures={currentCourse.lectures}
            handlePressLecture={lecture => RouterActions.lecture({ currentLecture: lecture })}
          />
        </View>
      </ScrollView>
    );
  }
}

export default connectToProps(CourseDetails, 'courses');
