/**
 * @flow
 */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import { GraphRequest, GraphRequestManager, LoginButton } from 'react-native-fbsdk';

import * as Actions from '../../actions/login';
// import BaseStyles from '../../baseStyles';
import connectToProps from '../../utils/reduxUtils';

const { Component, PropTypes } = React;
const { Alert, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue',
    marginHorizontal: 17,
  },
  labelWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    alignSelf: 'flex-end',
    color: '#222',
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'stretch',
  },
  button: {
    marginVertical: 5,
    height: 30,
  },
});

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
      <View style={styles.view}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>
            { t.facebookLabel }
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <LoginButton
            style={styles.button}
            readPermissions={['public_profile']}
            onLoginFinished={this.handleLoginFinished}
          />
        </View>
      </View>
    );
  }
}

export default connectToProps(Facebook, 'user', Actions);
