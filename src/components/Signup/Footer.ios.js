import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import Button from 'react-native-button';
import I18n from 'react-native-i18n';
import { Actions as RouterActions } from 'react-native-router-flux';

import BaseStyles from '../../lib/baseStyles';

const { StyleSheet, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 2,
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

const Footer = ({ handlePressSignup, handlePressSkipSignup }) =>
  (
    <View style={styles.container}>
      <Button
        containerStyle={styles.buttonWrapper}
        style={styles.buttonText}
        onPress={handlePressSignup}
      >
        { I18n.t('alreadyHaveAnAccount') }
      </Button>
      <Button
        containerStyle={[styles.buttonWrapper, { borderWidth: 0, marginTop: 20 }]}
        style={styles.buttonText}
        onPress={handlePressSkipSignup}
      >
        { I18n.t('skipSignup') }
      </Button>
    </View>
  );

Footer.propTypes = {
  handlePressSignup: PropTypes.func.isRequired,
  handlePressSkipSignup: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  handlePressSignup: () => RouterActions.login(),
  handlePressSkipSignup: () => RouterActions.top(),
};

export default Footer;
