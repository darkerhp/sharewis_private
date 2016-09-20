/* eslint no-console: ["error", { allow: ["warn", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import FBSDK from 'react-native-fbsdk';
import autobind from 'autobind-decorator';
import I18n from 'react-native-i18n';

import * as Actions from '../../actions/login';
import connectToProps from '../../utils/redux';

const { Component, PropTypes } = React;
const { Alert, StyleSheet, Text, View } = ReactNative;
const { GraphRequest, GraphRequestManager, LoginButton, LoginManager } = FBSDK;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginHorizontal: 13,
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
    fontSize: 10.5,
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


class Facebook extends Component {
  static propTypes = {
    fetchUserBy: PropTypes.func.isRequired,
    fetchFBEmailFailure: PropTypes.func.isRequired,
  };

  @autobind
  async getAccountData(fbGraphError, result) {
    if (fbGraphError) {
      this.props.fetchFBEmailFailure();
      Alert.alert(I18n.t('errorTitle'), I18n.t('emailNotFound'));
      console.warn('Unable to fetch user email from Facebook!');
      console.log(fbGraphError);
      return;
    }
    // Notify ACT API of the login and fetch user data
    try {
      await this.props.fetchUserBy('facebook', [result.email, result.id]);
    } catch (actError) {
      LoginManager.logOut();
      Alert.alert(I18n.t('errorTitle'), I18n.t('userDoesNotExist'));
    }
  }

  @autobind
  handleLoginFinished(fbLoginError, result) {
    console.log(result);
    if (fbLoginError) {
      Alert.alert(I18n.t('errorTitle'), I18n.t('loginFacebookError'));
      console.warn('Unexpected facebook login error!');
      console.log(fbLoginError);
      return;
    } else if (result.isCancelled) {
      return;
    } else if (!result.grantedPermissions.find(perm => perm === 'email')) {
      Alert.alert(I18n.t('errorTitle'), I18n.t('emailNotFound'));
      console.warn('Missing email permission!');
      console.log(result.grantedPermissions);
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
            { I18n.t('facebookLabel') }
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <LoginButton
            style={styles.button}
            readPermissions={['public_profile', 'email']}
            onLoginFinished={this.handleLoginFinished}
          />
        </View>
      </View>
    );
  }
}

export default connectToProps(Facebook, 'user', Actions);
