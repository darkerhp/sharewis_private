import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';

import * as Actions from '../actions/courses';
import BaseStyles from '../baseStyles';
import { ACT_SITE_URL } from '../constants/Api';
import CourseSummary from '../components/CourseList/CourseSummary';
import alertOfflineError from '../utils/alert';
import redirectTo from '../utils/linking';
import OneColumnItemBox from '../components/CourseList/OneColumnItemBox';
import TwoColumnCourseItem from '../components/CourseList/TwoColumnCourseItem';

const {
  Alert,
  Dimensions,
  Image,
  ListView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const displayWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseStyles.courseListBackgroundColor,
    paddingBottom: BaseStyles.navbarHeight,
  },
  topImageWrapper: {
    overflow: 'hidden',
    width: displayWidth,
  },
  topImage: {
    width: displayWidth,
  },
  recommendedSnackCourseWrapper: {},
  myCourseWrapper: {},
  // MyCouese
  contentText: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222',
  },
});

const topImage = require('../components/Top/images/top.png');

const mapStateToProps = ({ entities, netInfo, ui }) => ({
  courses: entities.courses,
  lectures: entities.lectures,
  ...ui,
  isOnline: netInfo.isConnected,
});

const mapDispatchToProps = dispatch => ({ ...bindActionCreators(Actions, dispatch) });

@connect(mapStateToProps, mapDispatchToProps)
class Top extends Component {
  static propTypes = {
    // states
    courses: ImmutablePropTypes.orderedMap,
    lectures: ImmutablePropTypes.orderedMap,
    isOnline: PropTypes.bool.isRequired,
    // actions
    setCurrentCourseId: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      isRefreshing: false,
      isLoading: true,
    };
  }

  async componentWillMount() {
    await this.refreshList();
  }

  @autobind
  async refreshList(force = false) {
    const { fetchMyCourse, fetchSnackCourse, fetchCoursesDownloadStatus } = this.props;
    try {
      await fetchMyCourse(force);
      await fetchCoursesDownloadStatus();
      await fetchSnackCourse(force);
    } catch (error) {
      console.error(error);
      Alert.alert(I18n.t('errorTitle'), I18n.t('networkFailure'));
    }

    const snackCourses = this.props.courses.getSnackCourses().toJS();
    this.setState({
      isLoading: false,
    });
    RouterActions.top({ initialPage: 2 });
    RouterActions.top({ initialPage: 1 });
  }

  @autobind
  handlePressSnackCourseItem(courseId) { // eslint-disable-line
    const { isOnline, setCurrentCourseId } = this.props;
    if (!isOnline) return;
    setCurrentCourseId(courseId);
    RouterActions.snackLecture({
      backTitle: I18n.t('back'),
      onBack: () => RouterActions.pop(),
    });
  }

  @autobind
  handlePressMyCourseItem(course) {
    const { isOnline, setCurrentCourseId } = this.props;
    if (!isOnline && !course.hasDownloadedLecture) return;
    setCurrentCourseId(course.id);
    RouterActions.courseDetails({
      backTitle: I18n.t('back'),
      onBack: () => RouterActions.pop(),
    });
  }

  @autobind
  async handleRefresh() {
    this.setState({ isRefreshing: true });
    await this.refreshList(true);
    this.setState({ isRefreshing: false });
    RouterActions.refresh();
  }

  @autobind
  renderSnackCourses() {
    const { courses } = this.props;

    const snackCourseItems = courses.getSnackCourses().sortByRanking().valueSeq().map(course =>
      <TwoColumnCourseItem
        key={course.id}
        course={course}
        onPress={() => this.handlePressSnackCourseItem(course.id)}
      />);

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 14, padding: 10, color: '#030303' }}>{I18n.t('recommendedSnackCourse')}</Text>
        <View
          style={{ flexDirection: 'row' }}
        >
          {snackCourseItems.slice(0, 2)}
        </View>
        <View
          style={{ flexDirection: 'row' }}
        >
          {snackCourseItems.slice(2, 4)}
        </View>
      </View>
    );
  }

  @autobind
  renderMyCourses() {
    const { courses, isOnline, lectures } = this.props;

    const proCourse = courses.getProCourses().first();

    return (
      <View>
        <Text
          style={{ fontSize: 14, paddingLeft: 10, paddingBottom: 10, color: '#030303' }}
        >
          { I18n.t('myCourse') }
        </Text>
        {proCourse ?
          <CourseSummary
            course={proCourse}
            isDisabledCourse={false}
            lectures={lectures.filter(l => l.courseId === proCourse.id)}
            onPressCourse={this.handlePressMyCourseItem}
          />
          :
          <OneColumnItemBox style={{ height: 150, paddingHorizontal: 15 }} isTouchble={false}>
            <Hyperlink
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              linkStyle={{ color: BaseStyles.hyperlink }}
              linkText={url => (url === ACT_SITE_URL ? I18n.t('actWebsite') : url)}
              onPress={isOnline ? redirectTo : alertOfflineError}
            >
              <Text style={styles.contentText}>
                {I18n.t('noProCourses')}
              </Text>
            </Hyperlink>
          </OneColumnItemBox>
        }
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return <SleekLoadingIndicator loading={this.state.isLoading} text={I18n.t('loading')} />;
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
        <View style={styles.topImageWrapper}>
          <Image
            source={topImage}
            resizeMode={Image.resizeMode.stretch}
            style={styles.topImage}
          />
        </View>
        <View style={styles.recommendedSnackCourseWrapper}>
          {this.renderSnackCourses()}
        </View>
        <View style={styles.myCourseWrapper}>
          {this.renderMyCourses()}
        </View>
      </ScrollView>
    );
  }
}

export default Top;
