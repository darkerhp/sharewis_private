/**
 * @flow
 */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component } from 'react';
import ReactNative from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

const { Alert, Text, View } = ReactNative;

const t = {
  errorTitle: 'エラー',
  facebookLabel: 'Facebookアカウントでログインする',
  loginError: 'Facebookログインが失敗しました',
  loginSuccess: 'Facebookログインができました',
  successTitle: '成功',
};

class Facebook extends Component {
  handleLoginFinished(error, result) {
    if (error) {
      Alert.alert(t.errorTitle, t.loginError);
      console.error(error);
    }
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

export default Facebook;
