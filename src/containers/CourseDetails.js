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
  handlePressNextLecture() {
    // const { course } = this.props; TODO propを受け取る
    const nextLecture = CourseUtils.getNextLecture(course);
    RouterActions.lecture({ lecture: nextLecture, title: nextLecture.title });
  }

  render() {
    // const { course } = this.props; TODO propを受け取る
    const courseInfo = {
      courseTitle: course.title,
      totalLectureCount: CourseUtils.totalLectureCount(course),
      completeLectureCount: CourseUtils.completeLectureCount(course),
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
          containerStyle={{ height: HALF_DISPLAY_HEIGHT }}
        />
        <LectureList lectures={course.lectures} containerStyle={{ flex: 1 }} />
      </ScrollView>
    );
  }
}

export default CourseDetails;
