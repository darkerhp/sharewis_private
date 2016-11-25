import React from 'react';
import ReactNative from 'react-native';
import I18n from 'react-native-i18n';
import * as ApiConstants from '../../constants/Api';

const { PropTypes } = React;
const { View, StyleSheet, Text, Image, TouchableOpacity } = ReactNative;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseImageWrapper: {
    flex: 2,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  courseImage: {},
  nextLectureTextWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#579eff',
  },
  nextLectureText: {
    color: 'white',
    fontWeight: '900',
  },
  nextLectureTitleText: {
    color: 'white',
    position: 'absolute',
    top: 30,
    left: 75,
    backgroundColor: 'rgba(0,0,0,0)',
  },

});


const videoImageSrc = require('./images/video.png');
const quizImageSrc = require('./images/quiz.png');
const textImageSrc = require('./images/text.png');

const getNextLectureImageSrc = (nextLecture) => {
  switch (nextLecture.type) {
    case ApiConstants.LECTURE_TYPE_VIDEO:
      return videoImageSrc;
    case ApiConstants.LECTURE_TYPE_QUIZ:
      return quizImageSrc;
    case ApiConstants.LECTURE_TYPE_TEXT:
      return textImageSrc;
    default:
      return videoImageSrc;
  }
};

const NextLectureArea = ({ nextLecture, handlePressNextLecture, containerStyleId }) =>
  <View style={[styles.container, containerStyleId]}>
    <TouchableOpacity onPress={handlePressNextLecture}>
      <View style={styles.courseImageWrapper}>
        <Image
          source={getNextLectureImageSrc(nextLecture)}
          style={styles.courseImage}
          resizeMode={Image.resizeMode.contain}
        />
        <Text style={styles.nextLectureTitleText}>{nextLecture.title}</Text>
      </View>
      <View style={styles.nextLectureTextWrapper}>
        <Text style={styles.nextLectureText}>{I18n.t('nextLecture')}</Text>
      </View>
    </TouchableOpacity>
  </View>;

NextLectureArea.propTypes = {
  nextLecture: PropTypes.shape({}).isRequired,
  handlePressNextLecture: PropTypes.func.isRequired,
  containerStyleId: PropTypes.number.isRequired,
};

export default NextLectureArea;
