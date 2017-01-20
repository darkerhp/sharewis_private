import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import _ from 'lodash';
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

const {
  Alert,
  Dimensions,
  Image,
  ListView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

const displayWidth = Dimensions.get('window').width;
const itemWidth = (displayWidth - 30) / 2;
const itemHeight = (itemWidth / 3) * 4; // 4:3

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
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  courseItemWrapper: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
    width: itemWidth,
    height: itemHeight,
    borderRadius: 9,
    overflow: 'hidden',
  },
  courseImage: {
    flex: 1,
    height: (itemHeight / 10) * 8,
  },
  courseContentWrapper: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    height: (itemHeight / 10) * 2,
  },
  courseTitle: {
    fontWeight: '500',
    marginBottom: 5,
    color: BaseStyles.textColor,
    ...Platform.select({
      ios: {
        fontSize: 10,
      },
      android: {
        fontSize: 9,
      },
    }),
  },
  // MyCouese
  box: {
    flex: 1,
    height: Dimensions.get('window').height / 2,
    borderWidth: 1,
    borderColor: BaseStyles.borderColor,
    borderRadius: 9,
    backgroundColor: 'white',
    marginBottom: 13,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
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
class SnackCourse extends Component {
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
      dataSource: ds.cloneWithRows([1, 2]),
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
      dataSource: this.state.dataSource.cloneWithRows(snackCourses),
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

    const snackCourseItems = courses.getSnackCourses().valueSeq().map(course =>
      <TouchableOpacity
        key={course.id}
        onPress={() => this.handlePressSnackCourseItem(course.id)}
        style={styles.courseItemWrapper}
      >
        <Image source={{ uri: course.imageUrl }} style={styles.courseImage} />
        <View style={styles.courseContentWrapper}>
          <Text style={styles.courseTitle}>{course.title}</Text>
        </View>
      </TouchableOpacity>);

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
        {!proCourse ?
          <CourseSummary
            key={proCourse.id}
            courseSummaryStyleId={styles.box}
            course={proCourse}
            isDisabledCourse={false}
            lectures={lectures.filter(l => l.courseId === proCourse.id)}
            onPressCourse={this.handlePressMyCourseItem}
          />
          :
          <View style={[styles.box, { height: 150, paddingHorizontal: 15 }]}>
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
          </View>
        }
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return <SleekLoadingIndicator loading={this.state.isLoading} text={I18n.t('loading')} />;
    }

    const { courses } = this.props;

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

export default SnackCourse;
