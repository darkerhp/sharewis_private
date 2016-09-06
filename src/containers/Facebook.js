/**
 * @flow
 */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import * as Actions from '../actions/login';
import connectToProps from '../utils';

const { Component, PropTypes } = React;
const { Alert, Text, View } = ReactNative;

const t = {
  errorTitle: 'エラー',
  facebookLabel: 'Facebookアカウントでログインする',
  loginError: 'Facebookログインが失敗しました',
  loginSuccess: 'Facebookログインができました',
  successTitle: '成功',
};


class Facebook extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
  };

  async handleLoginFinished(error, result) {
    if (error) {
      Alert.alert(t.errorTitle, t.loginError);
      console.error(error);
    }
    // Notify ACT API of the login and fetch user data
    const data = await this.props.fetchUser();
    console.log('data from api:', data);
    Alert.alert(t.successTitle, t.loginSuccess);
    console.log('login done', result);
  }

  render() {
    return (
      <View>
        <Text>{ t.facebookLabel }</Text>
        <LoginButton
          readPermissions={['public_profile']}
          onLoginFinished={this.handleLoginFinished}
        />
      </View>
    );
  }
}

export default connectToProps(Facebook, 'user', Actions);
