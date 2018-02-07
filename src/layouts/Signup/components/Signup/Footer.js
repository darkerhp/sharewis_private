import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import Button from 'react-native-button';
import I18n from 'react-native-i18n';
import { Actions as RouterActions } from 'react-native-router-flux';

import {baseStyles} from '@lib';

const { StyleSheet, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginHorizontal: 13,
    paddingVertical: 13
  },
  signupButtonWrapper: {
    minHeight: 30,
    maxHeight: 47,
    flex: 1,
    borderRadius: 3,
    // marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#9b9b9b'
  },
  signupButtonText: {
    fontSize: 16,
    color: baseStyles.textColor,
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
    fontWeight: 'normal'
  }
});

const Footer = () => (
  <View style={styles.container}>
    <Button
      containerStyle={styles.signupButtonWrapper}
      style={styles.signupButtonText}
      onPress={() => RouterActions.login()}
    >
      {I18n.t('alreadyHaveAnAccount')}
    </Button>
  </View>
);

export default Footer;
