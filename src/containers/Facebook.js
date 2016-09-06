/**
 * @flow
 */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import { GraphRequest, GraphRequestManager, LoginButton } from 'react-native-fbsdk';
import * as Actions from '../actions/login';
import { connectToProps } from '../utils';

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
    fetchUserFromFacebook: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleLoginFinished = this.handleLoginFinished.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  async componentDidMount() {
    console.log('in componentDidMount');
    console.log('props', this.props);

    const infoRequest = new GraphRequest('/me?fields=email', null, this.fetchUser);
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  async fetchUser(error, result) {
    console.log('in graph request callback');
    if (error) {
      Alert.alert(t.errorTitle, t.loginError);
      console.error(error);
      return;
    }
    console.log(result);
    // Notify ACT API of the login and fetch user data
    const data = await this.props.fetchUser('facebook', [result.email, result.id]);
    console.log('data from api:', data);
    Alert.alert(t.successTitle, t.loginSuccess);
  }

  handleLoginFinished(error, result) {
    console.log('facebook login done', result);
    const infoRequest = new GraphRequest('/me?fields=email', null, this.fetchUser);
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
