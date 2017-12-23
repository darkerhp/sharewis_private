/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import { Actions as RouterActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import Hyperlink from 'react-native-hyperlink';

import BaseStyles from '../../lib/baseStyles';
import Form from './Form';
import Footer from './Footer'; // eslint-disable-line
import Hr from '../Hr';
import SleekLoadingIndicator from '../SleekLoadingIndicator';
import { ACT_TOS_URL, ACT_PRIVACY_URL } from '../../lib/constants';

const { StatusBar, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: BaseStyles.navbarHeight,
    backgroundColor: BaseStyles.onboardingBackgroundColor
  },
  contentText: {
    flex: 1,
    color: BaseStyles.textColor,
    fontSize: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hrWrapper: {
    marginBottom: 25
  }
});

class Signup extends Component {
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
        // ↓NOTE: これを入れるとポップアップが全てログインモーダルに。。。
        // RouterActions.refresh({ key: 'drawer', open: false });
      }
      RouterActions.top();
    }
  }

  render() {
    const { isFetching, isModal, isOnline } = this.props;
    StatusBar.setBarStyle('dark-content');

    if (isFetching) {
      return (
        <SleekLoadingIndicator loading={isFetching} text={I18n.t('loading')} />
      );
    }

    return (
      <View style={styles.container}>
        <Form {...this.props} />
        <Hyperlink
          style={{ flex: 1, marginHorizontal: 13 }}
          linkStyle={{ color: BaseStyles.hyperlink }}
          linkText={url => {
            if (url === ACT_TOS_URL) return I18n.t('tos');
            if (url === ACT_PRIVACY_URL) return I18n.t('privacy');
            return url;
          }}
          onPress={url => {
            if (url === ACT_TOS_URL) RouterActions.tosModal();
            if (url === ACT_PRIVACY_URL) RouterActions.privacyModal();
          }}
        >
          <Text style={styles.contentText}>{I18n.t('agreeTosAndPolicy')}</Text>
        </Hyperlink>
        {!isModal && (
          <View style={styles.hrWrapper}>
            <Hr lineStyle={{ backgroundColor: '#dadada' }} />
          </View>
        )}
        {isModal ? <View style={{ flex: 2 }} /> : <Footer {...this.props} />}
      </View>
    );
  }
}

export default Signup;
