import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import I18n from 'react-native-i18n';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';

import * as Actions from '../actions/courses';
import BaseStyles from '../baseStyles';

const {
  Alert,
  Dimensions,
  Image,
  ListView,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

const itemWidth = (Dimensions.get('window').width - 15) / 2;
const itemHeight = (itemWidth / 3) * 4; // 4:3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseStyles.courseListBackgroundColor,
    paddingBottom: BaseStyles.navbarHeight,
    paddingTop: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  courseItemWrapper: {
    backgroundColor: 'white',
    marginBottom: 5,
    marginLeft: 5,
    width: itemWidth,
    height: itemHeight,
    borderRadius: 2,
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
    return (
      <TouchableOpacity
        onPress={() => this.handlePressCourseItem(data.id)}
        style={styles.courseItemWrapper}
      >
        <Image source={{ uri: data.imageUrl }} style={styles.courseImage} />
        <View style={styles.courseContentWrapper}>
          <Text style={styles.courseTitle}>{data.title}</Text>
        </View>
      </TouchableOpacity>
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
