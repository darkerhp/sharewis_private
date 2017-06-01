/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component } from 'react';

import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import * as Actions from '../modules/user';
import Login from '../components/Login';

const mapStateToProps = (state) => {
  const { form, user, netInfo, ui, routes: { scene } } = state;
  const selector = formValueSelector('loginForm');
  const hasEmail = selector(state, 'email') !== undefined;
  const hasPassword = selector(state, 'password') !== undefined;
  return {
    ...user,
    ...ui,
    isOnline: netInfo.isConnected,
    loginDisabled: !(hasEmail && hasPassword),
    // 新規登録時に登録済みのemailを入力して遷移してきた場合 sceneのinitialEmailValueに入力したemailが設定されている
    initialValues: { email: _.has(scene, 'initialEmailValue') ? scene.initialEmailValue : '' },
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ ...Actions }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class LoginContainer extends Component { // eslint-disable-line
  render() {
    return <Login {...this.props} />;
  }
}

export default LoginContainer;
