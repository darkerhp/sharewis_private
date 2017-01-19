/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import Hyperlink from 'react-native-hyperlink';
import { Actions as RouterActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/courses';
import BaseStyles from '../baseStyles';
import CourseSummary from '../components/CourseList/CourseSummary';
import EmptyList from '../components/CourseList/EmptyList';
import { ACT_SITE_URL } from '../constants/Api';
import alertOfflineError from '../utils/alert';
import redirectTo from '../utils/linking';

const {
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseStyles.courseListBackgroundColor,
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  courseList: {
    flex: 1,
    paddingBottom: BaseStyles.navbarHeight,
  },
  contentText: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222',
    textAlignVertical: 'center',
  },
  box: {
    flex: 1,
    height: Dimensions.get('window').height / 2,
    borderWidth: 1,
    borderColor: BaseStyles.borderColor,
    backgroundColor: 'white',
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
class MyCourse extends Component {
  static propTypes = {
    // states
    courses: ImmutablePropTypes.orderedMap,
    lectures: ImmutablePropTypes.orderedMap,
    isFetching: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    // actions
    fetchCoursesDownloadStatus: PropTypes.func.isRequired,
    fetchMyCourse: PropTypes.func.isRequired,
    setCurrentCourseId: PropTypes.func.isRequired,
  };

  state = {
    isRefreshing: false,
  };

  async componentWillMount() {
    await this.refreshList();
  }

  @autobind
  async refreshList(force = false) {
    const { fetchMyCourse, fetchCoursesDownloadStatus } = this.props;
    try {
      await fetchMyCourse(force);
      await fetchCoursesDownloadStatus();
    } catch (error) {
      console.error(error);
      Alert.alert(I18n.t('errorTitle'), I18n.t('networkFailure'));
    }
  }

  @autobind
  handlePressCourse(course) {
    const { isOnline, setCurrentCourseId } = this.props;
    if (!isOnline && !course.hasDownloadedLecture) return;
    setCurrentCourseId(course.id);
    RouterActions.courseDetails();
  }

  @autobind
  async handleRefresh() {
    this.setState({ isRefreshing: true });
    await this.refreshList(true);
    this.setState({ isRefreshing: false });
    RouterActions.refresh();
  }

  render() {
    const { isFetching, isOnline, courses, lectures } = this.props;
    StatusBar.setBarStyle('light-content');

    if (!this.state.isRefreshing && isFetching) {
      return <SleekLoadingIndicator loading={isFetching} text={I18n.t('loading')} />;
    }

    if (courses.isEmpty()) {
      return <EmptyList />;
    }

    return (
      <ScrollView
        style={styles.container}
        showVerticalScrollIndicator={false}
        indicatorStyle={'white'}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh}
            title={I18n.t('loading')}
          />
        }
      >
        <View style={styles.courseList}>
          {courses.getProCourses().valueSeq().map((course) => {
            const isDisabledCourse = !isOnline && !course.hasDownloadedLecture;
            return (
              <CourseSummary
                key={course.id}
                courseSummaryStyleId={styles.box}
                course={course}
                isDisabledCourse={isDisabledCourse}
                lectures={lectures.filter(l => l.courseId === course.id)}
                onPressCourse={this.handlePressCourse}
              />
            );
          })}
          <View style={[styles.box, { height: 150 }]}>
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

export default MyCourse;
