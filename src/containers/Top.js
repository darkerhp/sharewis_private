import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import FitImage from 'react-native-fit-image';
import I18n from 'react-native-i18n';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { Client } from 'bugsnag-react-native';
import { connect } from 'react-redux';

import * as coursesActions from '../modules/courses';
import * as userActions from '../modules/user';
import * as uiActions from '../modules/ui';
import BaseStyles from '../lib/baseStyles';
import CourseSummary from '../components/CourseList/CourseSummary';
import TwoColumnCourseItem from '../components/CourseList/TwoColumnCourseItem';
import NoProCourseItem from '../components/Top/NoProCourseItem';
import {
  snackCourseSelector,
  purchasedProCourseSelector,
} from '../modules/selectors/courseSelectors';
import CourseMap from '../modules/models/CourseMap';
import LectureMap from '../modules/models/LectureMap';


const {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseStyles.courseListBackgroundColor,
  },
  topImageWrapper: {
    overflow: 'hidden',
    width: BaseStyles.deviceWidth,
    marginBottom: 10,
  },
  topImage: {
    width: BaseStyles.deviceWidth,
  },
  recommendedSnackCourseWrapper: {
    flex: 1,
  },
  myCourseWrapper: {
    flex: 1,
    marginBottom: BaseStyles.navbarHeight,
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

const mapStateToProps = (state, props) => {
  const { entities, netInfo, ui, user } = state;

  return {
    lectures: entities.lectures,
    snackCourses: snackCourseSelector(state, props),
    purchasedProCourses: purchasedProCourseSelector(state, props),
    isLoginUser: user.loggedIn,
    ...ui,
    isOnline: netInfo.isConnected,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ ...coursesActions, ...userActions, ...uiActions }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Top extends Component {
  static propTypes = {
    // states
    purchasedProCourses: ImmutablePropTypes.orderedMap,
    snackCourses: ImmutablePropTypes.orderedMap,
    lectures: ImmutablePropTypes.orderedMap,
    isLoginUser: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    // actions
    setCurrentCourseId: PropTypes.func.isRequired,
  };

  static defaultProps = {
    purchasedProCourses: new CourseMap(),
    snackCourses: new CourseMap(),
    lectures: new LectureMap(),
  };

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      isLoading: true,
    };
  }

  async componentWillMount() {
    this.props.finishOnboarding();
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
      new Client().notify(error);
      console.error(error);
      Alert.alert(I18n.t('errorTitle'), I18n.t('networkFailure'));
    }

    this.setState({
      isLoading: false,
    });
  }

  @autobind
  handlePressSnackCourseItem(courseId) {
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
    const { snackCourses } = this.props;
    const snackCourseItems = snackCourses
      .sortBy(c => c.ranking)
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
    const { purchasedProCourses, lectures, isLoginUser, isOnline } = this.props;
    const proCourse = purchasedProCourses.first();

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

    return <NoProCourseItem isOnline={isOnline} />;
  }

  render() {
    if (this.state.isLoading) {
      return <SleekLoadingIndicator loading={this.state.isLoading} text={I18n.t('loading')} />;
    }

    // TODO ハードコード
    // eslint-disable-next-line
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
