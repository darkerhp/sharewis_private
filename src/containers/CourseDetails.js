/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import { Actions as RouterActions } from 'react-native-router-flux';

import * as Actions from '../actions/courseDetails';
import LectureList from '../components/CourseDetails/LectureList';
import CourseInfoSection from '../components/CourseDetails/CourseInfoSection';
import totalDuration from '../utils/course';
import * as LectureUtils from '../utils/lecture';
import { connectActions, connectState } from '../utils/redux';
import BaseStyles from '../baseStyles';

const { Component, PropTypes } = React;
const {
  Dimensions,
  ScrollView, StatusBar,
  StyleSheet,
  View,
} = ReactNative;

const { height } = Dimensions.get('window');
const HALF_DISPLAY_HEIGHT = (height - BaseStyles.navbarHeight) / 2;
const QUARTER_DISPLAY_HEIGHT = (height - BaseStyles.navbarHeight) / 4;

const styles = StyleSheet.create({
  lectureContainer: { flex: 1 },
});


@connectActions(Actions)
@connectState('currentCourse')
class CourseDetails extends Component {
  static propTypes = {
    lectures: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    lectureCount: PropTypes.number.isRequired,
    lectureProgress: PropTypes.number.isRequired,
    loadCurrentLecture: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  @autobind
  handlePressNextLecture() {
    const { lectures } = this.props;
    const lecture = LectureUtils.getNextVideoLecture(lectures);
    return this.handlePressLecture(lecture);
  }

  // eslint-disable-next-line class-methods-use-this
  handlePressLecture(lecture) {
    const { lectures, loadCurrentLecture } = this.props;
    loadCurrentLecture(lecture);
    return RouterActions.lecture({
      title: lecture.title,
      lectures,
    });
  }

  render() {
    const { lectures, lectureCount, lectureProgress, title } = this.props;
    const isCompleted = lectureCount === lectureProgress;
    const courseInfo = {
      totalLectureCount: lectureCount,
      completeLectureCount: lectureProgress,
      isCompleted,
      courseTitle: title,
      totalDuration: totalDuration(lectures),
      nextLecture: LectureUtils.getNextVideoLecture(lectures),
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
            lectures={lectures}
            handlePressLecture={this.handlePressLecture}
          />
        </View>
      </ScrollView>
    );
  }
}

export default CourseDetails;
