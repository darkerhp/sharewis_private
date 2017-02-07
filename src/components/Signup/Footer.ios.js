import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

import Button from 'react-native-button';
import Hr from 'react-native-hr';
import I18n from 'react-native-i18n';
import { Actions as RouterActions } from 'react-native-router-flux';

import BaseStyles from '../../baseStyles';

const { StyleSheet, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginHorizontal: 13,
    paddingVertical: 13,
  },
  signupButtonWrapper: {
    minHeight: 30,
    maxHeight: 47,
    flex: 1,
    borderRadius: 3,
    marginTop: 35,
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
  skipSignupButtonWrapper: {
    minHeight: 30,
    maxHeight: 47,
    flex: 1,
    borderRadius: 3,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  skipSignupButtonText: {
    fontSize: 16,
    color: BaseStyles.textColor,
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
    fontWeight: 'normal',
  },
});

const Footer = ({ handlePressSignup, handlePressSkipSignup }) =>
  <View style={styles.container}>
    <Hr lineColor={'#dadada'} />
    <Button
      containerStyle={styles.signupButtonWrapper}
      style={styles.signupButtonText}
      onPress={handlePressSignup}
    >
      { I18n.t('alreadyHaveAnAccount') }
    </Button>
    <Button
      containerStyle={styles.skipSignupButtonWrapper}
      style={styles.skipSignupButtonText}
      onPress={handlePressSkipSignup}
    >
      { I18n.t('skipSignup') }
    </Button>
  </View>;

Footer.propTypes = {
  handlePressSignup: PropTypes.func.isRequired,
  handlePressSkipSignup: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  handlePressSignup: () => RouterActions.login(),
  handlePressSkipSignup: () => RouterActions.top(),
};

export default Footer;
