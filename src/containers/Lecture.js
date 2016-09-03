import React from 'react';
import ReactNative from 'react-native';

import Video from 'react-native-video';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';
import VideoControls from '../components/Lecture/VideoControls';

const { PropTypes } = React;
const { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, Animated } = ReactNative;

const lectures = [
  {
    type: 'Video',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',

  },
];

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
  appMessage: {
    fontSize: 36,
    color: 'white',
  },
  appSubMessage: {
    fontSize: 18,
  },
  imageContainer: {
    borderRadius: 14,
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
    backgroundColor: 'white',
    opacity: 0.7,
  },
  image: {
    borderRadius: 4,
    width: 250,
    height: 300,
    resizeMode: 'stretch',
  }
});


class Lecture extends React.Component {
  constructor(props) {
    super(props);
    this.handlePressPlay = this.handlePressPlay.bind(this);
  }

  handlePressPlay() {
    this.props.actions.pressPlay();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin' }} // Can be a URL or a local file.
            rate={1.0}                   // 0 is paused, 1 is normal.
            volume={1.0}                 // 0 is muted, 1 is normal.
            muted={false}                // Mutes the audio entirely.
            paused={this.props.isPaused}               // Pauses playback entirely.
            resizeMode="contain"           // Fill the whole screen at aspect ratio.
            repeat                // Repeat forever.
            playInBackground={false}     // Audio continues to play when aentering background.
            playWhenInactive={false}     // [iOS] Video continues to play whcontrol or notification center are shown.
            onError={e => console.log(e)}
            style={styles.backgroundVideo}
          />
        </View>
        <View style={{ flex: 1.5, backgroundColor: 'white' }}>
          <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'stretch' }}>
            {/* TODO 実装する */}
            <Text>ProgressBar</Text>
          </View>
          <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'stretch' }}>
            {/* TODO 実装する */}
            <Text>Lecturte Title</Text>
          </View>
          <VideoControls
            isPaused={this.props.isPaused}
            onPressPlay={this.handlePressPlay}/>
          <View style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'stretch' }}>
            {/* TODO 実装する */}
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#579eff', minHeight: 60 }}
            >
              <Text style={{ color: 'white' }}>次のレクチャーに進む</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isPaused: state.lecture.isPaused,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

Lecture.propTypes = {};
Lecture.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Lecture);
