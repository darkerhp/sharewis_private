import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

import I18n from 'react-native-i18n';

import BaseStyles from '../../baseStyles';

const { StyleSheet, Text, View } = ReactNative;

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
  contentText: {
    flex: 1,
    color: BaseStyles.textColor,
    fontSize: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Footer = () =>
  <View style={styles.container}>
    <Text style={styles.contentText}>
      {I18n.t('notAllowedSignup')}
    </Text>
  </View>;

export default Footer;
