/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import _ from 'lodash';
import autobind from 'autobind-decorator';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { Client as Bugsnag } from 'bugsnag-react-native';
import { connect } from 'react-redux';

import * as coursesActions from '../modules/courses';
import * as productsActions from '../modules/products'; // eslint-disable-line
import * as purchaseActions from '../modules/purchase'; // eslint-disable-line
import alertOfflineError from '../utils/alert';
import BaseStyles from '../lib/baseStyles';
import CourseMap from '../modules/models/CourseMap';
import ProCourseSummary from '../components/CourseList/ProCourseSummary';
import EmptyList from '../components/CourseList/EmptyList';
import LectureMap from '../modules/models/LectureMap';
import ProductMap from '../modules/models/ProductMap';
import OneColumnItemBox from '../components/CourseList/OneColumnItemBox';
import redirectTo from '../utils/linking';
import { ACT_PRO_COURSES_URL } from '../lib/constants';
import { notPurchasedProCourseSelector } from '../modules/selectors/courseSelectors';

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
  const { entities, netInfo, ui } = state;

  return {
    notPurchasedProCourses: notPurchasedProCourseSelector(state, props),
    lectures: entities.lectures,
    products: entities.products,
    ...ui,
    isOnline: netInfo.isConnected,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ..._.pickBy(coursesActions, _.isFunction),
    ..._.pickBy(productsActions, _.isFunction),
    ..._.pickBy(purchaseActions, _.isFunction),
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ProCourses extends Component {
  static propTypes = {
    // states
    notPurchasedProCourses: PropTypes.instanceOf(CourseMap),
    lectures: PropTypes.instanceOf(LectureMap),
    products: PropTypes.instanceOf(ProductMap),
    isOnline: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    notPurchasedProCourses: new CourseMap(),
    lectures: new LectureMap(),
    products: new ProductMap(),
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
    const { fetchProCourse, fetchProducts, loadProducts } = this.props;

    try {
      await fetchProCourse(force);
      await fetchProducts();
      await loadProducts();
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      Alert.alert(I18n.t('errorTitle'), I18n.t('networkFailure'));
    }
  }

  @autobind
  async handlePressCourse(courseId) {
    const { createPurchaseStatus, isOnline, purchaseCourse } = this.props;
    if (!isOnline) {
      alertOfflineError();
      return;
    }
    try {
      this.setState({ isLoading: true });
      const response = await purchaseCourse(courseId);
      await createPurchaseStatus(courseId, response);
    } catch (error) {
      Alert.alert(I18n.t('errorTitle'), I18n.t('purchaseCourseFailed'));
    } finally {
      this.setState({ isLoading: false });
    }
  }

  @autobind
  async handleRefresh() {
    this.setState({ isRefreshing: true });
    await this.refreshList(true);
    this.setState({ isRefreshing: false });
    RouterActions.refresh();
  }

  render() {
    const { isOnline, notPurchasedProCourses, lectures, products } = this.props;
    StatusBar.setBarStyle('light-content');

    if (!this.state.isRefreshing && this.state.isLoading) {
      return <SleekLoadingIndicator loading={this.state.isLoading} text={I18n.t('loading')} />;
    }

    if (notPurchasedProCourses.isEmpty()) {
      // TODO メッセージ ＆ 翻訳
      return <EmptyList contentText={I18n.t('notAvailablePurchaseCourses')} />;
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
          {notPurchasedProCourses.valueSeq().map((course) => {
            const isDisabledCourse = !isOnline && !course.hasDownloadedLecture;
            return (
              <ProCourseSummary
                key={course.id}
                courseSummaryStyleId={styles.box}
                course={course}
                product={products.find(p => p.courseId === course.id)}
                isDisabledCourse={isDisabledCourse}
                lectures={lectures.filter(l => l.courseId === course.id)}
                onPressCourse={() => this.handlePressCourse(course.id)}
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

export default ProCourses;
