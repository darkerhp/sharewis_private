/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { Client } from 'bugsnag-react-native';
import { connect } from 'react-redux';

import * as Actions from '../modules/courses';
import alertOfflineError from '../utils/alert';
import BaseStyles from '../lib/baseStyles';
import CourseMap from '../modules/models/CourseMap';
import CourseSummary from '../components/CourseList/CourseSummary';
import EmptyList from '../components/CourseList/EmptyList';
import LectureMap from '../modules/models/LectureMap';
import NotLoginList from '../components/CourseList/NotLoginList';
import OneColumnItemBox from '../components/CourseList/OneColumnItemBox';
import redirectTo from '../utils/linking';
import { ACT_PRO_COURSES_URL } from '../lib/constants';
import { purchasedProCourseSelector } from '../modules/selectors/courseSelectors';

const {
  Alert,
  Platform,
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
  },
  courseList: {
    flex: 1,
    marginVertical: 13,
    paddingBottom: BaseStyles.navbarHeight,
  },
  contentText: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222',
    textAlignVertical: 'center',
  },
  hyperlinkWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchMore: {
    borderWidth: 1,
    borderColor: BaseStyles.hyperlink,
    paddingHorizontal: 5,
  },
});

const mapStateToProps = (state, props) => {
  const { entities, netInfo, ui, user } = state;

  return {
    purchasedProCourses: purchasedProCourseSelector(state, props),
    lectures: entities.lectures,
    isLoginUser: user.loggedIn,
    ...ui,
    isOnline: netInfo.isConnected,
  };
};

const mapDispatchToProps = dispatch => ({ ...bindActionCreators(Actions, dispatch) });

@connect(mapStateToProps, mapDispatchToProps)
class MyCourse extends Component {
  static propTypes = {
    // states
    purchasedProCourses: ImmutablePropTypes.orderedMap,
    lectures: ImmutablePropTypes.orderedMap,
    isLoginUser: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    // actions
    setCurrentCourseId: PropTypes.func.isRequired,
  };

  static defaultProps = {
    purchasedProCourses: new CourseMap(),
    lectures: new LectureMap(),
  };

  state = {
    isLoading: false,
    isRefreshing: false,
  };

  async componentWillMount() {
    this.setState({ isLoading: true });
    await this.refreshList();
    this.setState({ isLoading: false });
  }

  @autobind
  async refreshList(force = false) {
    const { fetchMyCourse, fetchCoursesDownloadStatus, isLoginUser } = this.props;
    if (!isLoginUser) return;
    try {
      await fetchMyCourse(force);
      await fetchCoursesDownloadStatus();
    } catch (error) {
      new Client().notify(error);
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
    const { isOnline, isLoginUser, lectures, purchasedProCourses } = this.props;
    StatusBar.setBarStyle('light-content');

    if (!this.state.isRefreshing && this.state.isLoading) {
      return <SleekLoadingIndicator loading={this.state.isLoading} text={I18n.t('loading')} />;
    }

    if (!isLoginUser) {
      return <NotLoginList />;
    }

    if (purchasedProCourses.isEmpty()) {
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
          {purchasedProCourses.valueSeq().map((course) => {
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
          {Platform.OS !== 'ios' &&
            <OneColumnItemBox style={{ height: 150 }} isTouchble={false}>
              <View style={styles.hyperlinkWrapper}>
                <Hyperlink
                  style={styles.searchMore}
                  linkStyle={{ color: BaseStyles.hyperlink }}
                  linkText={I18n.t('searchMore')}
                  onPress={isOnline ? redirectTo : alertOfflineError}
                >
                  <Text style={styles.contentText}>
                    {ACT_PRO_COURSES_URL}
                  </Text>
                </Hyperlink>
              </View>
            </OneColumnItemBox>
          }
        </View>
      </ScrollView>
    );
  }
}

export default MyCourse;
