import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

import Button from 'react-native-button';
import I18n from 'react-native-i18n';
import { Actions as RouterActions } from 'react-native-router-flux';

import BaseStyles from '../../baseStyles';

const { StyleSheet, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 13,
    paddingVertical: 13,
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
  skipLoginButtonWrapper: {
    minHeight: 30,
    maxHeight: 47,
    flex: 1,
    marginTop: 15,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  skipLoginButtonText: {
    fontSize: 16,
    color: BaseStyles.textColor,
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
    fontWeight: 'normal',
  },
});

const Footer = () =>
  <View style={styles.container}>
    <Button
      containerStyle={styles.signupButtonWrapper}
      style={styles.signupButtonText}
      onPress={() => RouterActions.signup()}
    >
      { I18n.t('noAccountYet') }
    </Button>
    <Button
      containerStyle={styles.skipLoginButtonWrapper}
      style={styles.skipLoginButtonText}
      onPress={() => RouterActions.top()}
    >
      { I18n.t('skipLogin') }
    </Button>
  </View>;

export default Footer;
