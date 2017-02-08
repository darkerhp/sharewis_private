/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import { Actions as RouterActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import Hyperlink from 'react-native-hyperlink';

import BaseStyles from '../../baseStyles';
import Form from './Form';
import Footer from './Footer'; // eslint-disable-line
import alertOfflineError from '../../utils/alert';
import redirectTo from '../../utils/linking';
import { ACT_TOS_URL, ACT_PRIVACY_URL } from '../../constants/Api';

const { StatusBar, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: BaseStyles.navbarHeight,
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
});

class Signup extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps(nextProps) {
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
        <Form {...this.props} />
        <Hyperlink
          style={{ flex: 1, marginHorizontal: 13 }}
          linkStyle={{ color: BaseStyles.hyperlink }}
          linkText={(url) => {
            if (url === ACT_TOS_URL) return I18n.t('tos');
            if (url === ACT_PRIVACY_URL) return I18n.t('privacy');
            return url;
          }}
          onPress={(url) => {
            if (url === ACT_TOS_URL) RouterActions.tosModal();
            if (url === ACT_PRIVACY_URL) RouterActions.privacyModal();
          }}
        >
          <Text style={styles.contentText}>
            {I18n.t('agreeTosAndPolicy')}
          </Text>
        </Hyperlink>
        <Footer {...this.props} />
      </View>
    );
  }
}

export default Signup;
