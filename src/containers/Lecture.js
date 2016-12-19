import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import I18n from 'react-native-i18n';

import Spinner from 'react-native-loading-spinner-overlay';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/lecture';
import VideoLecture from '../components/Lecture/VideoLecture';
import OfflineLecture from '../components/Lecture/OfflineLecture';
import * as ApiConstants from '../constants/Api';
import * as LectureUtils from '../utils/lecture';


const { StatusBar, StyleSheet, View } = ReactNative;

const styles = StyleSheet.create({
  lectureContentStyle: {
    flex: 3,
  },
  nextLectureButtonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  nextLectureButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#579eff',
    minHeight: 60,
  },
  nextLectureButtonText: {
    color: 'white',
  },
});

const mapStateToProps = ({ entities: { lectures }, netInfo, ui }) => {
  const lectureId = ui.currentLectureId;
  const currentLecture = lectures.get(lectureId.toString());
  return {
    lectures,
    ...currentLecture.toJS(),
    ...ui,
    isOnline: netInfo.isConnected,
    isLastLecture: lectureId === LectureUtils.getLastLectureId(currentLecture.courseId, lectures),
  };
};

const mapDispatchToProps = dispatch => ({ ...bindActionCreators(Actions, dispatch) });

@connect(mapStateToProps, mapDispatchToProps)
class Lecture extends Component {
  static propTypes = {
    // values
    courseId: PropTypes.number.isRequired,
    hasVideoInDevice: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    isLastLecture: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    lectures: PropTypes.shape({}).isRequired,
    order: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    // actions
    updateLectureStatus: PropTypes.func.isRequired,
    setCurrentLectureId: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
  };

  componentWillMount() {
    const { id, status, updateLectureStatus } = this.props;
    if (status === ApiConstants.LECTURE_STATUS_NOT_STARTED) {
      updateLectureStatus(id, ApiConstants.LECTURE_STATUS_VIEWED);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.id) return;
    if (nextProps.id !== this.props.id) {
      RouterActions.refresh({});
    }
  }

  @autobind
  handlePressNextLecture() {
    // 一瞬Spinnerを表示する
    this.setState({ loading: true });
    setTimeout(() => this.setState({ loading: false }), 1000);

    const {
      courseId,
      updateLectureStatus,
      id,
      order,
      lectures,
      setCurrentLectureId,
      status,
    } = this.props;

    if (status !== ApiConstants.LECTURE_STATUS_FINISHED) {
      updateLectureStatus(id, ApiConstants.LECTURE_STATUS_FINISHED);
    }

    const nextLecture = LectureUtils.getNextVideoLecture(courseId, lectures, false, order);
    setCurrentLectureId(nextLecture.id);
  }

  render() {
    const { hasVideoInDevice, isFullScreen, isLastLecture, isOnline } = this.props;
    const isOfflineAndUnsavedLecture = !isOnline && !hasVideoInDevice;
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.loading} />
        <StatusBar barStyle="light-content" />
        {isOfflineAndUnsavedLecture
          ? <OfflineLecture lectureContentStyleId={styles.lectureContentStyle} />
          : <VideoLecture lectureContentStyleId={styles.lectureContentStyle} {...this.props} />
        }

        {isFullScreen || /* フルスクリーン時には「次のレクチャーへ」ボタンは表示しない */
          <View style={styles.nextLectureButtonWrapper}>
            { isLastLecture || isOfflineAndUnsavedLecture ||
              <Button
                containerStyle={styles.nextLectureButton}
                style={styles.nextLectureButtonText}
                onPress={this.handlePressNextLecture}
              >
                {I18n.t('nextLecture')}
              </Button>
            }
          </View>
        }
      </View>
    );
  }
}

export default Lecture;
