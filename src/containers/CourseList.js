/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { Actions as RouterActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import * as Actions from '../actions/courseList';
import BaseStyles from '../baseStyles';
import CourseSummary from '../components/CourseList/CourseSummary';
import EmptyList from '../components/CourseList/EmptyList';
import { ACT_API_URL } from '../constants/Api';
import redirectTo from '../utils/linking';
import { connectActions, connectState } from '../utils/redux';

const { Component, PropTypes } = React;
const {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  courseList: {
    ...BaseStyles.ContainerWithNavbar,
    margin: 13,
  },
  contentText: {
    ...BaseStyles.Text,
    textAlignVertical: 'center',
  },
  container: {
    flex: 1,
    height: Dimensions.get('window').height / 2,
    borderWidth: 1,
    borderColor: BaseStyles.borderColor,
    marginBottom: 13,
  },
  hyperlinkWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchMore: {
    borderWidth: 1,
    borderColor: 'blue',
    paddingHorizontal: 5,
  },
  hyperlink: {
    color: 'blue',
  },
});


@connectActions(Actions)
@connectState('courseList')
class CourseList extends Component {
  static propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape({})),
    fetchCourseList: PropTypes.func.isRequired,
    loadCurrentCourse: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchCourseList();
  }

  handlePressCourse(course) {
    this.props.loadCurrentCourse(course);
    RouterActions.courseDetails({ course });
  }

  render() {
    const { courses } = this.props;

    if (!courses) {
      return <EmptyList />;
    }
    return (
      <ScrollView
        style={{ flex: 1 }}
        showVerticalScrollIndicator={false}
        indicatorStyle={'white'}
      >
        <View style={styles.courseList}>
          {courses.map((course, key) =>
            <CourseSummary
              style={styles.container}
              onPress={() => this.handlePressCourse(course)}
              course={course}
              key={key}
            />
          )}
          <View style={[styles.container, { height: 150 }]}>
            <View style={styles.hyperlinkWrapper}>
              <Hyperlink
                style={styles.searchMore}
                linkStyle={styles.hyperlink}
                linkText={I18n.t('searchMore')}
                onPress={redirectTo}
              >
                <Text style={styles.contentText}>
                  {ACT_API_URL}
                </Text>
              </Hyperlink>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}


export default CourseList;
