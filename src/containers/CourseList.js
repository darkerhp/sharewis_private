import React from 'react';
import { PropTypes, View, Text } from 'react-native';
import { connect } from 'react-redux';


const CourseList = () =>
  <View>
    <Text>
    { this.props.routes.scene.title }
    </Text>
  </View>;

CourseList.propTypes = {
  routes: PropTypes.object,
};
CourseList.defaultProps = {};


export default connect((
  { routes }) => ({ routes })
)(CourseList);
