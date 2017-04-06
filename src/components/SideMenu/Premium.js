import React from 'react';
import ReactNative from 'react-native';
import Button from 'react-native-button';
import I18n from 'react-native-i18n';

import BaseStyles from '../../lib/baseStyles';
import * as localeUtil from '../../utils/locale';

const { StyleSheet, View, WebView } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: BaseStyles.navbarHeight,
  },
  buttonWrapper: {
    minHeight: 30,
    maxHeight: 47,
    flex: 1,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: '#F5A400',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
  },
});

const ja = '<h1>プレミアム</h1>';
const en = '<h1>プレミアム</h1>';

const Privacy = () =>
  <View style={styles.container}>
    <WebView
      source={{ html: localeUtil.isLocaleJa() ? ja : en }}
      style={{ flex: 5, width: BaseStyles.deviceWidth }}
    />
    <Button
      containerStyle={styles.buttonWrapper}
      style={styles.buttonText}
      onPress={() => console.log('press')}
    >
      入会する
    </Button>
  </View>;

export default Privacy;
