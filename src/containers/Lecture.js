import React from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Video from 'react-native-video';

import * as Actions from '../actions/lecture';
import VideoControls from '../components/Lecture/VideoControls';

const { PropTypes } = React;
const { View, StyleSheet, Text, TouchableOpacity } = ReactNative;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

class Lecture extends React.Component {
  constructor(props) {
    super(props);
    this.handlePressPlay = this.handlePressPlay.bind(this);
    this.handlePressRate = this.handlePressRate.bind(this);
  }

  handlePressPlay() {
    this.props.pressPlay();
  }

  handlePressRate() {
    this.props.pressRate();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.videoContainer, { marginTop: 64 }]}>
          <Video
            source={{ uri: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin' }} // Can be a URL or a local file.
            rate={this.props.rate}
            volume={1.0}
            muted={false}
            paused={this.props.isPaused}
            resizeMode="contain"
            repeat={false}
            playInBackground={false}
            playWhenInactive={false}
            // onError={e => console.log(e)}
            style={styles.backgroundVideo}
          />
        </View>
        <View style={{ flex: 1.5, backgroundColor: 'white' }}>
          {/* TODO ProgressBar 実装する */}
          <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'stretch' }}>
            <Text>ProgressBar</Text>
          </View>
          {/* TODO LectureTitle 実装する */}
          <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'stretch' }}>
            <Text>LectureTitle</Text>
          </View>
          <VideoControls
            isPaused={this.props.isPaused}
            rate={this.props.rate}
            onPressPlay={this.handlePressPlay}
            onPressRate={this.handlePressRate}
          />
          {/* TODO NextLecture 実装する */}
          <View style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'stretch' }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#579eff',
                minHeight: 60,
              }}
            >
              <Text style={{ color: 'white' }}>次のレクチャーに進む</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

Lecture.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  pressPlay: PropTypes.func.isRequired,
  rate: PropTypes.number.isRequired,
  pressRate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ ...state.lecture });
const mapDispatchToProps = dispatch => ({ ...bindActionCreators(Actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(Lecture);
