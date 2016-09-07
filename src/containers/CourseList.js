import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

const { View, Text } = ReactNative;


const CourseList = (routes) =>
  <View>
    <Text>
      {routes.title}
    </Text>
  </View>;

CourseList.propTypes = {
  routes: PropTypes.object,
};


export default connect(
  ({ routes }) => ({ routes })
)(CourseList);
