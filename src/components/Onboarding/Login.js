import React from 'react';
import ReactNative from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

 const { PropTypes } = React;
const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentText: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222222',
  },
});


const Login = (): ReactElement<any> =>
  <View style={styles.login}>
    <Text style={styles.contentText}>
    ログインページ
    </Text>
  </View>;

Login.propTypes = {
  text: PropTypes.string,
};
Login.defaultProps = {};

export default Login;
