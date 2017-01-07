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
import Hyperlink from 'react-native-hyperlink';

import * as Actions from '../actions/login';
import BaseStyles from '../baseStyles';
import Form from '../components/Signup/Form';
import alertOfflineError from '../utils/alert';
import redirectTo from '../utils/linking';
import { ACT_TOS_URL, ACT_PRIVACY_URL } from '../constants/Api';

const { StatusBar, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 70,
    backgroundColor: BaseStyles.onboardingBackgroundColor,
  },
  contentText: {
    flex: 1,
    color: BaseStyles.textColor,
    fontSize: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonWrapper: {
    height: 47,
    borderRadius: 3,
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#9b9b9b',
  },
  signupButtonText: {
    fontSize: 16,
    color: BaseStyles.textColor,
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
    fontWeight: 'normal',
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    color: BaseStyles.hyperlink,
  },
  hyperLink: {
    flex: 1,
    marginHorizontal: 13,
  },
  footer: {
    flex: 2,
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
      RouterActions.courseList();
    }
  }

  render() {
    const { isFetching, isOnline } = this.props;
    if (isFetching) {
      return <SleekLoadingIndicator loading={isFetching} text={I18n.t('loading')} />;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Form
          {...this.props}
        />
        <Hyperlink
          style={styles.hyperlink}
          linkStyle={{ color: BaseStyles.hyperlink }}
          linkText={(url) => {
            if (url === ACT_TOS_URL) return I18n.t('tos');
            if (url === ACT_PRIVACY_URL) return I18n.t('privacy');
            return url;
          }}
          onPress={isOnline ? redirectTo : alertOfflineError}
        >
          <Text style={styles.contentText}>
            {I18n.t('agreeTosAndPolicy')}
          </Text>
        </Hyperlink>
        <View style={styles.footer}>
          <Hr lineColor={'#dadada'} />
          <Button
            containerStyle={styles.signupButtonWrapper}
            style={styles.signupButtonText}
            onPress={() => RouterActions.login()}
          >
            { I18n.t('alreadyHaveAnAccount') }
          </Button>
        </View>
      </View>
    );
  }
}

export default Login;
