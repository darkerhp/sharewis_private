/**
 * @flow
 */
import React, { Component } from 'react';
import ReactNative from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

const { Text, View } = ReactNative;

const t = {
  facebookLabel: 'Facebookアカウントでログインする',
};

class Facebook extends Component {
  doLogin() {
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log(`do login with ${this.state.email}/${this.state.password}`);
  }

  render() {
    return (
      <View>
        <Text>{ t.facebookLabel }</Text>
        <LoginButton
          readPermissions={['public_profile']}
          onLoginFinished={() => this.doLogin()}
        />
      </View>
    );
  }
}

export default Facebook;
