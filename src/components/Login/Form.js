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

import BaseStyles from '../../baseStyles';
import TextField from '../../components/TextField';
import alertOfflineError from '../../utils/alert';
import validateEmailLogin from '../../utils/validate';
import { PASSWORD_FORGOTTEN_URL } from '../../constants/Api';

const {
  Alert,
  Linking,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  view: {
    flex: 2,
  },
  labelWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 13,
    marginBottom: 5,
  },
  label: {
    flex: 1,
    color: '#666',
    fontSize: 12,
  },
  inputWrapper: {
    flex: 2,
    backgroundColor: 'white',
    paddingLeft: 13,
    paddingBottom: 1,
    borderColor: '#dadada',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  textInputWrapper: {
    flex: 1,
  },
  buttonTextWrapper: {
    flex: 2,
    marginHorizontal: 13,
    marginTop: 13,
  },
  innerTextInput: {
    flex: 1,
    borderColor: '#dadada',
    borderBottomWidth: 1,
  },
  buttonWrapper: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#96D243',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: BaseStyles.hyperlink,
  },
  TextInput: {
    flex: 1,
    padding: 4,
    fontSize: 13,
    color: '#222',
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
    const { handleSubmit, isOnline, loginDisabled } = this.props;

    return (
      <View style={styles.view}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>
            { I18n.t('emailLoginLabel') }
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <View style={[styles.textInputWrapper, styles.innerTextInput]}>
            <Field
              style={styles.TextInput}
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
            { I18n.t('login') }
          </Button>
          <View style={styles.textWrapper}>
            <Text
              style={styles.text}
              onPress={() => (
              isOnline ? Linking.openURL(PASSWORD_FORGOTTEN_URL) : alertOfflineError()
            )}
            >
              {I18n.t('passwordForgotten')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Form;
