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
import validator from 'validator';

import BaseStyles from '../../baseStyles';
import TextField from '../../components/TextField';
import alertOfflineError from '../../utils/alert';
import validateEmailLogin from '../../utils/validate';

const {
  Alert,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop: 30,
  },
  labelWrapper: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 13,
    marginBottom: 5,
  },
  label: {
    color: BaseStyles.textColor,
    fontSize: 12,
  },
  inputWrapper: {
    backgroundColor: 'white',
    paddingLeft: 13,
    paddingBottom: 1,
    borderColor: '#dadada',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  textInputWrapper: {
    height: 47,
  },
  buttonTextWrapper: {
    flex: 2,
    marginHorizontal: 13,
    marginTop: 13,
  },
  innerTextInput: {
    borderColor: '#dadada',
    borderBottomWidth: 1,
  },
  buttonWrapper: {
    height: 47,
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
  textWrapper: {
    flex: 3,
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
    fetchActSignupFailure: PropTypes.func.isRequired,
    fetchUserBy: PropTypes.func.isRequired,
    signupUserBy: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isOnline: PropTypes.bool.isRequired,
    loginDisabled: PropTypes.bool.isRequired,
  };

  @autobind
  async handlePress({ email, password }) {
    const { fetchUserBy, signupUserBy, fetchActSignupFailure, isOnline } = this.props;

    if (!isOnline) {
      alertOfflineError();
      return;
    }

    // validation
    let errorMessage = null;
    if (!validator.isEmail(email)) {
      errorMessage = I18n.t('invalidEmail');
    } else if (password.length < 6) {
      errorMessage = I18n.t('tooShortPassword');
    } else if (!/^[0-9a-zA-Z_]+$/.test(password)) {
      errorMessage = I18n.t('invalidPassword');
    }

    if (errorMessage) {
      Alert.alert(I18n.t('errorTitle'), errorMessage);
      return;
    }

    try {
      await signupUserBy('email', [email, password]);
      await fetchUserBy('email', [email, password]);
    } catch (error) {
      fetchActSignupFailure();
      Alert.alert(I18n.t('errorTitle'), I18n.t('signupEmailError'));
      throw new SubmissionError({
        _error: I18n.t('signupEmailError'),
      });
    }
  }


  render() {
    const { handleSubmit, loginDisabled } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>
            { I18n.t('emailSignupLabel') }
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <View style={[styles.textInputWrapper, styles.innerTextInput]}>
            <Field
              style={styles.TextInput}
              name="email"
              type="email"
              component={TextField}
              placeholder={I18n.t('email')}
              placeholderTextColor={'#dadada'}
              keyboardType="email-address"
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>
          <View style={styles.textInputWrapper}>
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
            { I18n.t('signup') }
          </Button>
        </View>
      </View>
    );
  }
}

export default Form;
