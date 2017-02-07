import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import FitImage from 'react-native-fit-image';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/courses';
import alertOfflineError from '../utils/alert';
import BaseStyles from '../baseStyles';
import CourseSummary from '../components/CourseList/CourseSummary';
import OneColumnItemBox from '../components/CourseList/OneColumnItemBox';
import redirectTo from '../utils/linking';
import TwoColumnCourseItem from '../components/CourseList/TwoColumnCourseItem';
import { ACT_SITE_URL } from '../constants/Api';

const {
  Alert,
  Dimensions,
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
    marginBottom: 10,
  },
  topImage: {
    width: displayWidth,
  },
  recommendedSnackCourseWrapper: {
    flex: 1,
  },
  myCourseWrapper: {
    flex: 1,
    marginBottom: 10,
  },
  myCourseSummaryItemBox: {
    height: 150,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  headerTextWrapper: {
    marginLeft: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 14,
    color: '#030304',
  },
  contentText: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222',
  },
  signupButtonWrapper: {
    minHeight: 30,
    maxHeight: 47,
    flex: 1,
    borderRadius: 3,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#9b9b9b',
  },
  signupButtonText: {
    fontSize: 16,
    color: BaseStyles.textColor,
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
    fontWeight: 'normal',
  },
});

const mapStateToProps = ({ entities, netInfo, ui, user }) => ({
  courses: entities.courses,
  lectures: entities.lectures,
  isLoginUser: user.loggedIn,
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
    isLoginUser: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    // actions
    setCurrentCourseId: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
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
    const {
      fetchMyCourse,
      fetchSnackCourse,
      fetchCoursesDownloadStatus,
      isLoginUser,
    } = this.props;
    try {
      if (isLoginUser) {
        await fetchMyCourse(force);
        await fetchCoursesDownloadStatus();
      }
      await fetchSnackCourse(force);
    } catch (error) {
      console.error(error);
      Alert.alert(I18n.t('errorTitle'), I18n.t('networkFailure'));
    }

    this.setState({
      isLoading: false,
    });
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
    const snackCourseItems = courses
      .getSnackCourses()
      .sortByRanking()
      .valueSeq()
      .map(course =>
        <TwoColumnCourseItem
          key={course.id}
          course={course}
          onPress={() => this.handlePressSnackCourseItem(course.id)}
        />);

    return (
      <View>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>{I18n.t('recommendedSnackCourse')}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {snackCourseItems.slice(0, 2)}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {snackCourseItems.slice(2, 4)}
        </View>
      </View>
    );
  }

  @autobind
  renderMyCourses() {
    return (
      <View>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>{I18n.t('myCourse')}</Text>
        </View>
        {this.renderMyCourseItem()}
      </View>
    );
  }

  @autobind
  renderMyCourseItem() {
    const { courses, lectures, isLoginUser, isOnline } = this.props;
    const proCourse = courses.getProCourses().first();

    if (!isLoginUser) {
      return (
        <OneColumnItemBox style={styles.myCourseSummaryItemBox} isTouchble={false}>
          <Text style={styles.contentText}>
            {I18n.t('noLogin')}
          </Text>
          <Button
            containerStyle={styles.signupButtonWrapper}
            style={styles.signupButtonText}
            onPress={() => RouterActions.login()}
          >
            { I18n.t('login') }
          </Button>
        </OneColumnItemBox>
      );
    }

    if (proCourse) {
      return (
        <CourseSummary
          course={proCourse}
          isDisabledCourse={false}
          lectures={lectures.filter(l => l.courseId === proCourse.id)}
          onPressCourse={this.handlePressMyCourseItem}
        />
      );
    }

    return (
      <OneColumnItemBox style={styles.myCourseSummaryItemBox} isTouchble={false}>
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
    );
  }

  render() {
    if (this.state.isLoading) {
      return <SleekLoadingIndicator loading={this.state.isLoading} text={I18n.t('loading')} />;
    }

    // TODO ハードコード
    const topImageUrl = `https://act-production.s3.amazonaws.com/uploads/editor_image/image/1129/app_topimage_750.png?dt=${new Date().getTime()}`;

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
          <FitImage source={{ uri: topImageUrl }} />
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
