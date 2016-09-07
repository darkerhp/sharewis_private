import React from 'react';
import ReactNative from 'react-native';

import Section from './Section';
import Lecture from './Lecture';

const { Component, PropTypes } = React;
const { View, StyleSheet, Text, Slider, Dimensions } = ReactNative;

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  slider: {
    width: (DEVICE_WIDTH - 90) * 0.9,
  },
  timeTextContainer: {
    justifyContent: 'center',
    width: 45,
  },
  timeText: {
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
  },
});

class LectureList extends Component {
  render() {
    return (
      <View style={container}>
        {lectures.map(lecture => lecture.kind === 'section' ? <Section /> : <Lecture />)}
      </View>
    );
  }
}


LectureList.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default LectureList;
