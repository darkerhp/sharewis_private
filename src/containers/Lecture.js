import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import I18n from 'react-native-i18n';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../modules/lectures';
import BaseStyles from '../lib/baseStyles';
import Lecture from '../modules/models/Lecture';
import OfflineLecture from '../components/Lecture/OfflineLecture';
import TextLecture from '../components/Lecture/TextLecture';
import VideoLecture from '../components/Lecture/VideoLecture';
import { getLastLectureId, getNextLecture } from '../modules/selectors/lectureSelectors';

const { StatusBar, StyleSheet, View } = ReactNative;

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

const mapStateToProps = (state, props) => {
  const { entities: { lectures }, netInfo, ui } = state;
  const lectureId = ui.currentLectureId;
  const currentLecture = lectures.get(lectureId.toString());
  const lastLectureId = getLastLectureId(state, props);
  return {
    lectures,
    currentLecture,
    nextLecture: getNextLecture({ ...state, currentOrder: currentLecture.order }, props),
    ...ui,
    isOnline: netInfo.isConnected,
    isLastLecture: lectureId === lastLectureId,
  };
};

const mapDispatchToProps = dispatch => ({ ...bindActionCreators(Actions, dispatch) });

@connect(mapStateToProps, mapDispatchToProps)
class LectureContainer extends Component {
  static propTypes = {
    // values
    currentLecture: PropTypes.instanceOf(Lecture).isRequired,
    nextLecture: PropTypes.instanceOf(Lecture).isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    isLastLecture: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    // actions
    updateLectureStatus: PropTypes.func.isRequired,
    setCurrentLectureId: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
  };

  componentWillMount() {
    const { currentLecture, updateLectureStatus } = this.props;
    if (currentLecture.isNotStarted()) {
      updateLectureStatus(currentLecture.id, Lecture.STATUS_VIEWED);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentLecture.id) return;
    if (nextProps.currentLecture.id !== this.props.currentLecture.id) {
      RouterActions.refresh({});
    }
  }

  @autobind
  handlePressNextLecture() {
    // 一瞬Spinnerを表示する
    this.setState({ loading: true });
    setTimeout(() => this.setState({ loading: false }), 1000);

    const {
      currentLecture,
      nextLecture,
      updateLectureStatus,
      setCurrentLectureId,
    } = this.props;

    if (!currentLecture.isFinished()) {
      updateLectureStatus(currentLecture.id, Lecture.STATUS_FINISHED);
    }

    setCurrentLectureId(nextLecture.id);
  }

  @autobind
  renderLectureContent() {
    const { currentLecture, isOnline } = this.props;

    if (!currentLecture.canAccess(isOnline)) {
      return <OfflineLecture lectureContentStyleId={styles.lectureContentStyle} />;
    }

    if (currentLecture.isVideo()) {
      return (
        <VideoLecture
          lectureContentStyleId={styles.lectureContentStyle}
          // handleEnd={this.handlePressNextLecture} TODO auto play
          handleEnd={() => console.log('End Snack Lecture')}
          {...this.props}
        />
      );
    }
    if (currentLecture.isText()) {
      return <TextLecture lectureContentStyleId={styles.lectureContentStyle} {...this.props} />;
    }

    return null;
  }

  @autobind
  renderNextLectureArea() {
    const { currentLecture, isFullScreen, isLastLecture, isOnline } = this.props;
    // フルスクリーン時には「次のレクチャーへ」ボタンの領域自体表示しない
    if (isFullScreen) return null;
    // アプリでは、コースを完了できないため最後のレクチャーの場合、ボタンを表示しない
    const isVisibleButton = !isLastLecture && currentLecture.canAccess(isOnline);
    return (
      <View style={styles.joinButtonWrapper}>
        { isVisibleButton &&
          <Button
            containerStyle={styles.joinButton}
            style={styles.joinButtonText}
            onPress={this.handlePressNextLecture}
          >
            {I18n.t('nextLecture')}
          </Button>
        }
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
        {this.renderNextLectureArea()}
      </View>
    );
  }
}

export default LectureContainer;
