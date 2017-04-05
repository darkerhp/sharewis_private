// NOTE iOS版はreact-native-videoライブラリの不具合によりプログレスバーを表示しない
import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SeekBar from './SeekBar';
import BaseStyles from '../../lib/baseStyles';

const { Platform, StyleSheet, TouchableOpacity, Text, View } = ReactNative;

const styles = StyleSheet.create({
  containerWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  seekBarWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    ...Platform.select({
      android: {
        paddingBottom: 10,
      },
    }),
  },
  playButton: {
    width: 78,
    height: 78,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  playButtonIcon: {
    fontSize: 78,
    height: 78,
    color: 'white',
    opacity: 0.9,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  lectureTitleTextWrapper: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 15,
  },
  lectureTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    opacity: 0.9,
  },
  fullScreenExitButton: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        paddingBottom: 5,
      },
      android: {
        paddingTop: 10,
      },
    }),
  },
  fullScreenExitButtonIcon: {
    fontSize: 34,
    height: 34,
    color: 'white',
    opacity: 0.9,
  },
});

class FullScreenVideoControls extends Component {
  static propTypes = {
    isLoadingThumbnail: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    //
    onPressFullScreen: PropTypes.func.isRequired,
    onPressPlay: PropTypes.func.isRequired,
  };

  state = {
    isShowControls: false,
    timeoutId: 0,
  };

  @autobind
  handlePressContainer() {
    const { isPaused } = this.props;
    // 再生中に画面がタップされたら5秒間コントロールを表示する
    if (!isPaused) {
      this.setState({ isShowControls: true });
      if (this.state.timeoutId) clearTimeout(this.state.timeoutId);
      const timeoutId = setTimeout(() => this.setState({ isShowControls: false }), 5000);
      this.setState({ timeoutId });
    }
  }

  @autobind
  handlePressFullScreenExit() {
    const { onPressFullScreen } = this.props;
    if (this.state.timeoutId) clearTimeout(this.state.timeoutId);
    onPressFullScreen();
  }

  render() {
    const {
      isLoadingThumbnail,
      isPaused,
      onPressPlay,
      title,
    } = this.props;

    return (
      <TouchableOpacity
        style={styles.containerWrapper}
        onPress={this.handlePressContainer}
        activeOpacity={1}
      >
        {(isPaused || this.state.isShowControls) &&
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <View style={styles.lectureTitleTextWrapper}>
              <Text style={styles.lectureTitle}>{title}</Text>
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              containerStyle={[
                styles.playButton,
                isLoadingThumbnail && { backgroundColor: BaseStyles.disabledButtonColor },
              ]}
              style={styles.buttonText}
              onPress={() => onPressPlay()}
              disabled={isLoadingThumbnail}
            >
              <Icon
                name={isPaused ? 'play-arrow' : 'pause'}
                style={styles.playButtonIcon}
              />
            </Button>
          </View>
          <View style={styles.seekBarWrapper}>
            <Button
              containerStyle={styles.fullScreenExitButton}
              style={styles.buttonText}
              onPress={this.handlePressFullScreenExit}
            >
              <Icon
                name={'fullscreen-exit'}
                style={styles.fullScreenExitButtonIcon}
              />
            </Button>
          </View>
        </View>
        }
      </TouchableOpacity>
    );
  }
}


export default FullScreenVideoControls;
