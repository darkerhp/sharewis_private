import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

import Button from 'react-native-button';
import I18n from 'react-native-i18n';
import { Actions as RouterActions } from 'react-native-router-flux';

import BaseStyles from '../../lib/baseStyles';

const { StyleSheet, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 13,
    paddingVertical: 13,
  },
  buttonWrapper: {
    height: 47,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#9b9b9b',
  },
  buttonText: {
    fontSize: 16,
    color: BaseStyles.textColor,
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
    fontWeight: 'normal',
  },
});

const Footer = () =>
  <View style={styles.container}>
    <Button
      containerStyle={styles.buttonWrapper}
      style={styles.buttonText}
      onPress={() => RouterActions.signup()}
    >
      { I18n.t('noAccountYet') }
    </Button>
    <Button
      containerStyle={[styles.buttonWrapper, { borderWidth: 0, marginTop: 20 }]}
      style={styles.buttonText}
      onPress={() => RouterActions.top()}
    >
      { I18n.t('skipLogin') }
    </Button>

  </View>;

export default Footer;
