/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import * as Actions from '../modules/actions/user';

import Signup from '../components/Signup';

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
class SignupContainer extends Component {
  static defaultProps = {
    isModal: false,
  };

  render() {
    return <Signup {...this.props} />;
  }
}

export default SignupContainer;
