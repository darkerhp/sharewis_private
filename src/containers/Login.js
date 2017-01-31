/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import Button from 'react-native-button';
import Hr from 'react-native-hr';
import { Actions as RouterActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { formValueSelector } from 'redux-form';

import * as Actions from '../actions/login';
import BaseStyles from '../baseStyles';
import Form from '../components/Login/Form';
import Facebook from '../components/Login/Facebook';
import alertOfflineError from '../utils/alert';
import { ACT_PASSWORD_REMINDER_URL } from '../constants/Api';

const { Linking, StatusBar, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: BaseStyles.navbarHeight,
    backgroundColor: BaseStyles.onboardingBackgroundColor,
  },
  formWrapper: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  facebookWrapper: {
    flex: 1,
  },
  passwordForgottenTextWrapper: {
    flex: 1,
  },
  passwordForgottenText: {
    color: BaseStyles.hyperlink,
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  signupButtonWrapper: {
    minHeight: 30,
    maxHeight: 47,
    flex: 1,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  signupButtonText: {
    fontSize: 16,
    color: BaseStyles.textColor,
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
    fontWeight: 'normal',
  },
  contentText: {
    textAlign: 'center',
    fontSize: 12,
    color: BaseStyles.textColor,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 13,
    paddingVertical: 13,
  },
});

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
class Login extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    // Redirect to Course List page if user is logged in
    if (this.props.isFetching && !nextProps.isFetching && nextProps.loggedIn) {
      RouterActions.top();
    }
  }

  render() {
    const { isFetching, isOnline } = this.props;
    StatusBar.setBarStyle('dark-content');
    if (isFetching) {
      return <SleekLoadingIndicator loading={isFetching} text={I18n.t('loading')} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.formWrapper}>
          <Form
            {...this.props}
          />
        </View>
        <View style={styles.passwordForgottenTextWrapper}>
          <Text
            style={styles.passwordForgottenText}
            onPress={() => (
              isOnline ? Linking.openURL(ACT_PASSWORD_REMINDER_URL) : alertOfflineError()
            )}
          >
            {I18n.t('passwordForgotten')}
          </Text>
        </View>
        <View style={styles.facebookWrapper}>
          <Facebook
            {...this.props}
          />
        </View>
        <Hr lineColor={'#dadada'} />
        <View style={styles.footer}>
          <Button
            containerStyle={styles.signupButtonWrapper}
            style={styles.signupButtonText}
            onPress={() => RouterActions.pop()}
          >
            { I18n.t('noAccountYet') }
          </Button>
        </View>
      </View>
    );
  }
}

export default Login;
