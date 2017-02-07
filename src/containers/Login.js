/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import * as Actions from '../actions/login';
import Login from '../components/Login';

const mapStateToProps = (state) => {
  const { form, user, netInfo, ui } = state;
  const selector = formValueSelector('email');
  const hasEmail = selector(state, 'email') !== undefined;
  const hasPassword = selector(state, 'password') !== undefined;
  return {
    ...user,
    ...ui,
    isOnline: netInfo.isConnected,
    loginDisabled: !(hasEmail && hasPassword),
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
