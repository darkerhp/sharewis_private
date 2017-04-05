import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

import Button from 'react-native-button';
import I18n from 'react-native-i18n';
import { Actions as RouterActions } from 'react-native-router-flux';

import BaseStyles from '../../lib/baseStyles';

const { Dimensions, StyleSheet, Text, View } = ReactNative;

const displayWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 13,
  },
  contentText: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222',
    margin: 30,
  },
  signupButtonWrapper: {
    height: 47,
    width: displayWidth - 60,
    borderRadius: 3,
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
});


const NotLoginList = () =>
  <View style={styles.container}>
    <Text style={styles.contentText}>
      {I18n.t('noLogin')}
    </Text>
    <Button
      containerStyle={styles.signupButtonWrapper}
      style={styles.signupButtonText}
      onPress={() => RouterActions.login()}
    >
      { I18n.t('login') }
    </Button>
  </View>;

export default NotLoginList;
