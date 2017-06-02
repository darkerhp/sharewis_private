/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import Hr from 'react-native-hr';
import { Actions as RouterActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';

import BaseStyles from '../../lib/baseStyles';
import Form from './Form';
import Footer from './Footer'; // eslint-disable-line
import Facebook from './Facebook';
import alertOfflineError from '../../utils/alert';
import { ACT_PASSWORD_REMINDER_URL } from '../../lib/constants';

const { Linking, Platform, StatusBar, StyleSheet, Text, View } = ReactNative;

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
  contentText: {
    textAlign: 'center',
    fontSize: 12,
    color: BaseStyles.textColor,
  },
  hrWrapper: {
    marginBottom: 25,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 13,
    paddingVertical: 13,
  },
});

class Login extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isModal: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired, // eslint-disable-line
  };

  componentWillReceiveProps(nextProps) {
    const { isFetching, isModal } = this.props;
    // ユーザーがログインしたらトップページにリダイレクトする
    if (isFetching && !nextProps.isFetching && nextProps.loggedIn) {
      if (isModal) {
        // モーダルからのログイン時にはモーダルを閉じる
        RouterActions.pop();
      }
      RouterActions.top();
    }
  }

  render() {
    const { isFetching, isModal, isOnline } = this.props;
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
          {Platform.OS !== 'ios' && // iOSではパスワードリマインダーのリンクを表示しない
            <Text
              style={styles.passwordForgottenText}
              onPress={() => (
                isOnline ? Linking.openURL(ACT_PASSWORD_REMINDER_URL) : alertOfflineError()
              )}
            >
              {I18n.t('passwordForgotten')}
            </Text>
          }
        </View>
        <View style={styles.facebookWrapper}>
          <Facebook
            {...this.props}
          />
        </View>
        <View style={styles.hrWrapper}>
          <Hr lineColor={'#dadada'} />
        </View>
        {isModal ? <View style={{ flex: 1 }} /> : <Footer {...this.props} />}
      </View>
    );
  }
}

export default Login;
