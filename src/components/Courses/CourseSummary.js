import React from 'react';
import ReactNative from 'react-native';

import BaseStyles from '../../baseStyles';

const { PropTypes } = React;
const { StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  courseWrapper: {
    flex: 1,
  },
  contentText: {
    ...BaseStyles.Text,
    textAlignVertical: 'center',
  },
  CourseSummary: {
    flex: 1,
    margin: 30,
  },
});


const CourseSummary = ({ course }) =>
  <View style={styles.courseWrapper}>
    <Text style={styles.contentText}>
      {course.title}
    </Text>
  </View>;

CourseSummary.propTypes = {
  course: PropTypes.shape({
    /* eslint-disable react/no-unused-prop-types */
    title: PropTypes.string.required,
    lectures: PropTypes.array.required,
    /* eslint-enable react/no-unused-prop-types */
  }),
};

export default CourseSummary;
