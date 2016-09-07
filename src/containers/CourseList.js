import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

import BaseStyles from '../baseStyles';

const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  courseList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: BaseStyles.Text,
});


const CourseList = routes =>
  <View style={styles.courseList}>
    <Text style={styles.contentText}>
      aaaa
      {routes.title}
    </Text>
  </View>;

CourseList.propTypes = {
  routes: PropTypes.object,
};


export default connect(
  ({ routes }) => ({ routes })
)(CourseList);
