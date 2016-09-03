import React from 'react';
import ReactNative from 'react-native';

const { PropTypes } = React;
const { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity } = ReactNative;

import Video from 'react-native-video';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


const { width, height } = Dimensions.get('window');

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
    color: 'white'
  },
  appSubMessage: {
    fontSize: 18
  },
  imageContainer: {
    borderRadius: 14,
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
    backgroundColor: 'white',
    opacity: 0.7
  },
  image: {
    borderRadius: 4,
    width: 250,
    height: 300,
    resizeMode: 'stretch'
  },
  _playButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
    padding: 3,
  },
  playButton: {
    marginLeft: 5,
    fontSize: 40,
    height: 44,
    color: 'white',
  }

});

const VideoLecture = () =>
  <View style={{ flex: 1 }}>
    <View style={styles.videoContainer}>
      <Video
        source={{uri: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin'}} // Can be a URL or a local file.
        rate={1.0}                   // 0 is paused, 1 is normal.
        volume={1.0}                 // 0 is muted, 1 is normal.
        muted={false}                // Mutes the audio entirely.
        paused={true}               // Pauses playback entirely.
        resizeMode="contain"           // Fill the whole screen at aspect ratio.
        repeat                // Repeat forever.
        playInBackground={false}     // Audio continues to play when aentering background.
        playWhenInactive={false}     // [iOS] Video continues to play whcontrol or notification center are shown.
        onError={e => console.log(e)}
        style={styles.backgroundVideo}
      />
    </View>
    <View style={{flex: 1.5, backgroundColor: 'white'}}>
      <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <ActionButton
          position={'left'}
          offsetY={0}
          size={78}
          icon={<Icon name="ios-play" style={styles.playButton}/>}
          buttonColor="#579eff"
          onPress={this.props.pressPlay}
        />
      </View>
      <View style={{flex:1}}></View>
      <Text>Hogeghohogheo</Text>
    </View>
  </View>;

VideoLecture.propTypes = {
  pressPlay: PropTypes.function,
};

export default VideoLecture;
