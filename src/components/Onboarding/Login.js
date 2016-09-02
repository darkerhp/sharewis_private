import React from 'react';
import ReactNative from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const { PropTypes } = React;
const { View, Text } = ReactNative;


const Login = (props) =>
  <View style={{ flex: 1 }}>
    <Text>
      current page: {props.text}
    </Text>
    <Button
      style={{ backgroundColor: 'red' }}
      onPress={Actions.courseList}
    >
      Go to Course List
    </Button>
  </View>;

Login.propTypes = {
  text: PropTypes.string,
};
Login.defaultProps = {};

export default Login;
