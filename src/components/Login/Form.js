import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import I18n from 'react-native-i18n';
import {
  Field,
  reduxForm,
  SubmissionError,
} from 'redux-form';

import alertOfflineError from '../../utils/alert';
import BaseStyles from '../../baseStyles';
import TextField from '../../components/TextField';
import validateEmailLogin from '../../utils/validate';

const {
  Alert,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  labelWrapper: {
    marginHorizontal: 13,
    marginBottom: 5,
  },
  label: {
    color: BaseStyles.textColor,
    fontSize: 12,
  },
  inputsWrapper: {
    flex: 2,
    maxHeight: 95,
    backgroundColor: 'white',
    paddingLeft: 13,
    borderColor: '#dadada',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  emailInputWrapper: {
    maxHeight: 47,
    flex: 1,
  },
  passwordInputWrapper: {
    maxHeight: 46,
    flex: 1,
  },
  buttonTextWrapper: {
    flex: 1,
    marginHorizontal: 13,
    marginTop: 13,
  },
  innerTextInput: {
    borderColor: '#dadada',
    borderBottomWidth: 1,
  },
  buttonWrapper: {
    minHeight: 30,
    maxHeight: 47,
    flex: 1,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: '#7be161',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
  },
  TextInput: {
    flex: 1,
    padding: 4,
    fontSize: 13,
    color: BaseStyles.textColor,
    backgroundColor: 'white',
  },
});


const formOptions = {
  form: 'email',
  validate: validateEmailLogin,
};

@reduxForm(formOptions)
class Form extends Component {
  static propTypes = {
    fetchActLoginFailure: PropTypes.func.isRequired,
    fetchUserBy: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isOnline: PropTypes.bool.isRequired,
    loginDisabled: PropTypes.bool.isRequired,
  };

  @autobind
  async handlePress({ email, password }) {
    const { fetchUserBy, fetchActLoginFailure, isOnline } = this.props;

    if (!isOnline) {
      alertOfflineError();
      return;
    }

    try {
      await fetchUserBy('email', [email, password]);
    } catch (error) {
      fetchActLoginFailure();
      Alert.alert(I18n.t('errorTitle'), I18n.t('loginEmailError'));
      throw new SubmissionError({
        _error: I18n.t('loginEmailError'),
      });
    }
  }

  render() {
    const { handleSubmit, loginDisabled } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>
            { I18n.t('emailLoginLabel') }
          </Text>
        </View>
        <View style={styles.inputsWrapper}>
          <View style={[styles.emailInputWrapper, styles.innerTextInput]}>
            <Field
              style={[styles.TextInput]}
              name="email"
              type="email"
              component={TextField}
              placeholder={I18n.t('emailOrUsername')}
              placeholderTextColor={'#dadada'}
              keyboardType="email-address"
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>
          <View style={styles.passwordInputWrapper}>
            <Field
              style={styles.TextInput}
              name="password"
              type="password"
              component={TextField}
              placeholder={I18n.t('passwordPlaceHolder')}
              placeholderTextColor={'#dadada'}
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType="next"
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.buttonTextWrapper}>
          <Button
            containerStyle={[styles.buttonWrapper, loginDisabled && {
              backgroundColor: BaseStyles.disabledButtonColor,
            }]}
            style={styles.buttonText}
            onPress={handleSubmit(this.handlePress)}
            disabled={loginDisabled}
          >
            { I18n.t('login') }
          </Button>
        </View>
      </View>
    );
  }
}

export default Form;
