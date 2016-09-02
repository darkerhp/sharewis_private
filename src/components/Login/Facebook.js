/**
 * @flow
 */
import React, { Component } from 'react';
import ReactNative from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

const { Text, View } = ReactNative;

const t = {
  facebookLabel: 'Facebookアカウントでログインする',
  loginError: 'Facebookログインが失敗しました',
  loginSuccess: 'Facebookログインが出来ました',
};

class Facebook extends Component {
  doLogin(error, result) {
    if (error) {
      alert(t.loginError);
      console.error(error);
    }
    alert(t.loginSuccess);
  }

  render() {
    return (
      <View>
        <Text>{ t.facebookLabel }</Text>
        <LoginButton
          readPermissions={['public_profile']}
          onLoginFinished={this.doLogin}
        />
      </View>
    );
  }
}

export default Facebook;
