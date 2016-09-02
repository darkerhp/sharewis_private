import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

const { View, Text } = ReactNative;


const CourseList = () =>
  <View />;

CourseList.propTypes = {
  routes: PropTypes.object,
};


export default connect(
  ({ routes }) => ({ routes })
)(CourseList);
