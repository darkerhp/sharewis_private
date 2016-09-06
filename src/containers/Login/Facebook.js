/**
 * @flow
 */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import { GraphRequest, GraphRequestManager, LoginButton } from 'react-native-fbsdk';

import * as Actions from '../../actions/login';
import connectToProps from '../../utils/reduxUtils';

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

  async getAccountData(fbGraphError, result) {
    if (fbGraphError) {
      Alert.alert(t.errorTitle, t.loginError);
      console.error(fbGraphError);
      return;
    }
    // Notify ACT API of the login and fetch user data
    try {
      await this.props.fetchUserByFacebook('facebook', [result.email, result.id]);
      Alert.alert(t.successTitle, t.loginSuccess);
    } catch (actError) {
      Alert.alert(t.errorTitle, t.loginError);
      console.error(actError);
    }
  }

  handleLoginFinished(fbLoginError, result) {
    if (fbLoginError || !result.grantedPermissions.find(perm => perm === 'email')) {
      Alert.alert(t.errorTitle, t.loginError);
      console.error(fbLoginError);
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
