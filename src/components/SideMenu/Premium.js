import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import Button from 'react-native-button';
import I18n from 'react-native-i18n';

import BaseStyles from '../../lib/baseStyles';
import * as localeUtil from '../../utils/locale';

const { Image, StyleSheet, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: BaseStyles.navbarHeight,
  },
  premiumImageWrapper: {
    flex: 5,
  },
  premiumImage: {
    maxWidth: BaseStyles.deviceWidth,
    maxHeight: BaseStyles.deviceHeight - BaseStyles.navbarHeight - 70,
  },
  joinButtonWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    width: BaseStyles.deviceWidth,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: BaseStyles.courseListBackgroundColor,
  },
  joinButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8EC445',
    minHeight: 55,
  },
  joinButtonText: {
    color: 'white',
  },
});

const ja = require('./images/premium_ja.png');
const en = require('./images/premium_en.png');

const Premium = ({ onPressJoin }) =>
  <View style={styles.container}>
    <View style={styles.premiumImageWrapper}>
      <Image
        source={localeUtil.isLocaleJa() ? ja : en}
        resizeMode={Image.resizeMode.contain}
        style={styles.premiumImage}
      />
    </View>
    <View style={styles.joinButtonWrapper}>
      <Button
        containerStyle={styles.joinButton}
        style={styles.joinButtonText}
        onPress={onPressJoin}
      >
        {I18n.t('nextLecture')}
      </Button>
    </View>
  </View>;

Premium.propTypes = {
  onPressJoin: PropTypes.func.isRequired,
};

export default Premium;
