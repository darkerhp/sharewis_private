/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { Actions as RouterActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as Actions from '../actions/courseList';
import BaseStyles from '../baseStyles';
import CourseSummary from '../components/CourseList/CourseSummary';
import EmptyList from '../components/CourseList/EmptyList';
import { ACT_SITE_URL } from '../constants/Api';
import alertOfflineError from '../utils/alert';
import redirectTo from '../utils/linking';

const { Component, PropTypes } = React;
const {
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
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

const mapStateToProps = ({ entities, netInfo, ui }) => ({
  courses: entities.courses,
  lectures: entities.lectures,
  ...ui,
  isOnline: netInfo.isConnected,
});

const mapDispatchToProps = dispatch => ({ ...bindActionCreators(Actions, dispatch) });

@connect(mapStateToProps, mapDispatchToProps)
class CourseList extends Component {
  static propTypes = {
    // states
    courses: PropTypes.shape({}),
    lectures: PropTypes.shape({}),
    isFetching: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    // actions
    fetchCoursesDownloadStatus: PropTypes.func.isRequired,
    fetchCourseList: PropTypes.func.isRequired,
    setCurrentCourseId: PropTypes.func.isRequired,
  };

  async componentWillMount() {
    const { fetchCourseList, fetchCoursesDownloadStatus } = this.props;
    try {
      await fetchCourseList();
      await fetchCoursesDownloadStatus();
    } catch (error) {
      console.error(error);
      Alert.alert(I18n.t('errorTitle'), I18n.t('networkFailure'));
    }
  }

  handlePressCourse(course) {
    this.props.setCurrentCourseId(course.id);
    RouterActions.courseDetails();
  }

  render() {
    const { isFetching, isOnline, courses, lectures } = this.props;

    if (_.isEmpty(courses)) {
      return <EmptyList isFetching={isFetching} />;
    }
    return (
      <ScrollView
        style={{ flex: 1 }}
        showVerticalScrollIndicator={false}
        indicatorStyle={'white'}
      >
        <StatusBar barStyle="light-content" />
        <Spinner visible={isFetching} />
        <View style={styles.courseList}>
          {Object.keys(courses).map((courseId, index) =>
            <CourseSummary
              style={styles.container}
              onPress={() => this.handlePressCourse(courses[courseId])}
              course={courses[courseId]}
              lectures={_.filter(lectures, { courseId: parseInt(courseId, 10) })}
              key={index}
            />
          )}
          <View style={[styles.container, { height: 150 }]}>
            <View style={styles.hyperlinkWrapper}>
              <Hyperlink
                style={styles.searchMore}
                linkStyle={styles.hyperlink}
                linkText={I18n.t('searchMore')}
                onPress={isOnline ? redirectTo : alertOfflineError}
              >
                <Text style={styles.contentText}>
                  {ACT_SITE_URL}
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
