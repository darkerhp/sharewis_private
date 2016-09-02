import React from 'react';
import ReactNative from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const { PropTypes } = React;
const { View, Text } = ReactNative;


const Login = (props) =>
  <View>
    <Text>
      current page: {props.text}
    </Text>
    <Button
      onPress={() => {
        Actions.refresh({ key: 'courseList' });
      }}
    >
      Switch!
    </Button>
  </View>;

Login.propTypes = {
  text: PropTypes.string,
};
Login.defaultProps = {};

export default Login;
