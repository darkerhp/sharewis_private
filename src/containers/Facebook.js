/**
 * @flow
 */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import { GraphRequest, GraphRequestManager, LoginButton } from 'react-native-fbsdk';

import * as Actions from '../actions/login';
import connectToProps from '../utils/reduxUtils';

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
    fetchUserByFacebook: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleLoginFinished = this.handleLoginFinished.bind(this);
    this.getAccountData = this.getAccountData.bind(this);
  }

  async getAccountData(error, result) {
    if (error) {
      Alert.alert(t.errorTitle, t.loginError);
      console.error(error);
      return;
    }
    // Notify ACT API of the login and fetch user data
    await this.props.fetchUserByFacebook('facebook', [result.email, result.id]);
    Alert.alert(t.successTitle, t.loginSuccess);
  }

  handleLoginFinished(error, result) {
    if (error || !result.grantedPermissions.find(perm => perm === 'email')) {
      Alert.alert(t.errorTitle, t.loginError);
      console.error(error);
      console.error(result.grantedPermissions);
      return;
    }
    const infoRequest = new GraphRequest('/me?fields=email', null, this.getAccountData);
    new GraphRequestManager().addRequest(infoRequest).start();
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
