import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import I18n from 'react-native-i18n';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { Client } from 'bugsnag-react-native';
import { connect } from 'react-redux';

import * as Actions from '../modules/actions/courses';
import BaseStyles from '../lib/baseStyles';
import TwoColumnCourseItem from '../components/CourseList/TwoColumnCourseItem';
import Course from '../modules/models/Course';

const {
  Alert,
  ListView,
  RefreshControl,
  StyleSheet,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseStyles.courseListBackgroundColor,
    paddingTop: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: BaseStyles.navbarHeight,
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
class SnackCourse extends Component {
  static propTypes = {
    // states
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
    const { fetchSnackCourse } = this.props;
    try {
      await fetchSnackCourse(force);
    } catch (error) {
      new Client().notify(error);
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
  handlePressCourseItem(courseId) { // eslint-disable-line
    const { isOnline, setCurrentCourseId } = this.props;
    if (!isOnline) return;
    setCurrentCourseId(courseId);
    RouterActions.snackLecture();
  }

  @autobind
  async handleRefresh() {
    this.setState({ isRefreshing: true });
    await this.refreshList(true);
    this.setState({ isRefreshing: false });
    RouterActions.refresh();
  }

  @autobind
  renderRow(data) {
    const course = new Course(data);
    return (
      <TwoColumnCourseItem
        course={course}
        onPress={() => this.handlePressCourseItem(data.id)}
      />
    );
  }

  render() {
    if (this.state.isLoading) {
      return <SleekLoadingIndicator loading={this.state.isLoading} text={I18n.t('loading')} />;
    }

    return (
      <ListView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh}
            title={I18n.t('loading')}
          />
        }
      />
    );
  }
}

export default SnackCourse;
