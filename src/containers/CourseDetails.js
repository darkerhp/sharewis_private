import React from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import { Actions as RouterActions } from 'react-native-router-flux';

import LectureList from '../components/CourseDetails/LectureList';
import CourseInfoSection from '../components/CourseDetails/CourseInfoSection';
import * as CourseUtils from '../utils/course';
import BaseStyles from '../baseStyles';

import { course } from './dummyData'; // TODO

const { Component } = React;
const {
  StyleSheet,
  ScrollView,
  Dimensions,
} = ReactNative;

const { height } = Dimensions.get('window');
const HALF_DISPLAY_HEIGHT = (height - BaseStyles.navbarHeight) / 2;
const QUARTER_DISPLAY_HEIGHT = (height - BaseStyles.navbarHeight) / 4;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: BaseStyles.navbarHeight },
});

class CourseDetails extends Component {
  static propTypes = {
    // lectures: PropTypes.arrayOf(PropTypes.shape({
    //   id: PropTypes.number.isRequired,
    //   title: PropTypes.string.isRequired,
    //   duration: PropTypes.number.isRequired,
    //   type: PropTypes.number.isRequired,
    // })).isRequired,
  };

  // componentWillMount() { console.log('[CourseDetails] Component Will Mount', arguments); }
  // componentDidMount() { console.log('[CourseDetails] Component Did Mount', arguments); }
  // componentWillReceiveProps() {
  //  console.log('[CourseDetails] Component Will Receive Props', arguments);
  // }
  // shouldComponentUpdate() { console.log('[CourseDetails] Should Component Update', arguments); }
  // componentWillUpdate() { console.log('[CourseDetails] Component Will Update', arguments); }
  // componentDidUpdate() { console.log('[CourseDetails] Component Did Update', arguments); }
  // componentWillUnmount() { console.log('[CourseDetails] Component Will Unmount', arguments); }

  @autobind
  // TODO ↓this.prop使うようになったら消す
  // eslint-disable-next-line class-methods-use-this
  handlePressNextLecture() {
    // const { course } = this.props; TODO propを受け取る
    const nextLecture = CourseUtils.getNextLecture(course);
    RouterActions.lecture({ lecture: nextLecture, title: nextLecture.title });
  }

  @autobind
  // TODO ↓this.prop使うようになったら消す
  // eslint-disable-next-line class-methods-use-this
  handlePressLecture(lecture) {
    console.log('dfsafdsa');
    RouterActions.lecture({ lecture: lecture, title: lecture.title });
  }

  render() {
    // const { course } = this.props; TODO propを受け取る
    const completeLectureCount = CourseUtils.completeLectureCount(course);
    const totalLectureCount = CourseUtils.totalLectureCount(course);
    const isCompleted = completeLectureCount === totalLectureCount;
    const courseInfo = {
      totalLectureCount,
      completeLectureCount,
      isCompleted,
      courseTitle: course.title,
      totalDuration: CourseUtils.totalDuration(course),
      nextLecture: CourseUtils.getNextLecture(course),
    };
    return (
      <ScrollView
        style={styles.container}
        automaticallyAdjustContentInsets={false}
      >
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
      </ScrollView>
    );
  }
}

export default CourseDetails;
