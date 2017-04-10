import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import I18n from 'react-native-i18n';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { Client } from 'bugsnag-react-native';
import { connect } from 'react-redux';

import * as lectureActions from '../modules/actions/lecture';
import * as courseDetailsActions from '../modules/actions/courseDetails';
import BaseStyles from '../lib/baseStyles';
import Lecture from '../modules/models/Lecture';
import OfflineLecture from '../components/Lecture/OfflineLecture';
import VideoLecture from '../components/Lecture/VideoLecture';
import ScrollableTabs from './ScrollableTabs';

const { Alert, StatusBar, StyleSheet, View } = ReactNative;

const styles = StyleSheet.create({
  lectureContentStyle: {
    flex: 3,
  },
  joinButtonWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  joinButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseStyles.navBarBackgroundColor,
    minHeight: 60,
  },
  joinButtonText: {
    color: 'white',
  },
});

const mapStateToProps = ({ entities: { courses, lectures }, netInfo, ui }) => {
  const { currentCourseId } = ui;
  const currentCourse = courses.get(currentCourseId.toString());

  return {
    lectures,
    currentCourse,
    ...ui,
    isOnline: netInfo.isConnected,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ ...lectureActions, ...courseDetailsActions }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class SnackLectureContainer extends Component {
  static propTypes = {
    // values
    currentLectureId: PropTypes.number.isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    lectures: ImmutablePropTypes.orderedMap.isRequired,
  };

  state = {
    loading: false,
  };

  async componentWillMount() {
    const {
      currentCourse,
      fetchCourseDetails,
      setCurrentLectureId,
      updateLectureStatus,
    } = this.props;

    this.setState({ loading: true });

    try {
      await fetchCourseDetails(currentCourse.id);
    } catch (error) {
      new Client().notify(error);
      console.error(error);
      Alert.alert(I18n.t('errorTitle'), I18n.t('networkFailure'));
      return;
    }

    const lectures = this.props.lectures;
    const currentLecture = lectures.byCourseId(currentCourse.id).first();
    setCurrentLectureId(currentLecture.id);
    if (currentLecture.isNotStarted()) {
      updateLectureStatus(currentLecture.id, Lecture.STATUS_VIEWED);
    }

    this.setState({ loading: false });
  }

  @autobind
  renderLectureContent() {
    const { currentLectureId, isOnline, lectures } = this.props;

    const currentLecture = lectures.get(currentLectureId.toString());

    if (!currentLecture.canAccess(isOnline)) {
      return <OfflineLecture lectureContentStyleId={styles.lectureContentStyle} />;
    }
    if (currentLecture.isVideo()) {
      return (
        <VideoLecture
          lectureContentStyleId={styles.lectureContentStyle}
          // TODO 実装する クイズレクチャー
          handleEnd={() => console.log('End Snack Lecture')}
          currentLecture={currentLecture}
          {...this.props}
        />
      );
    }
    return null;
  }

  @autobind
  renderBackButtonArea() {
    const { isFullScreen } = this.props;
    if (isFullScreen) return null;
    return (
      <View style={styles.joinButtonWrapper}>
        <Button
          containerStyle={styles.joinButton}
          style={styles.joinButtonText}
          onPress={() => RouterActions.top({ moveTo: ScrollableTabs.SNACK_COURSE })}
        >
          {I18n.t('backToCourseList')}
        </Button>
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return <SleekLoadingIndicator loading={this.state.loading} text={I18n.t('loading')} />;
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {this.renderLectureContent()}
        {this.renderBackButtonArea()}
      </View>
    );
  }
}

export default SnackLectureContainer;
