import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import BaseStyles from '../../lib/baseStyles';
import Course from '../../modules/models/Course';
import TwoColumnItemBox from './TwoColumnItemBox';

const { Image, Platform, StyleSheet, Text, View } = ReactNative;

const itemWidth = (BaseStyles.deviceWidth - 30) / 2;
const itemHeight = itemWidth / 3 * 4; // 4:3

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
    width: itemWidth,
    height: itemHeight,
    borderRadius: 9,
    overflow: 'hidden'
  },
  courseImage: {
    flex: 1,
    height: itemHeight / 10 * 8,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9
  },
  courseContentWrapper: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    height: itemHeight / 10 * 2
  },
  courseTitle: {
    fontWeight: '500',
    marginBottom: 5,
    color: BaseStyles.textColor,
    ...Platform.select({
      ios: {
        fontSize: 10
      },
      android: {
        fontSize: 9
      }
    })
  }
});

const TwoColumnCourseItem = ({ style, course, onPress, ...props }) => (
  <TwoColumnItemBox
    style={[styles.container, style]}
    onPress={onPress}
    {...props}
  >
    <Image source={{ uri: course.imageUrl }} style={styles.courseImage} />
    <View style={styles.courseContentWrapper}>
      <Text style={styles.courseTitle}>{course.title}</Text>
    </View>
  </TwoColumnItemBox>
);

TwoColumnCourseItem.propTypes = {
  course: PropTypes.instanceOf(Course).isRequired,
  style: PropTypes.any, // eslint-disable-line
  // functions
  onPress: PropTypes.func.isRequired
};

export default TwoColumnCourseItem;
