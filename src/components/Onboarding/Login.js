/**
 * @flow
 */
import React from 'react';
import ReactNative from 'react-native';

// const { Component, PropTypes } = React;
const { View, Text } = ReactNative;

const Login = (): ReactElement<any> =>
  <View>
    <Text>ログインページ</Text>
  </View>;

Login.propTypes = {};
Login.defaultProps = {};

export default Login;
