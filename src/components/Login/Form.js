import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';
import {
  Field,
  reduxForm,
  SubmissionError,
} from 'redux-form';

import BaseStyles from '../../baseStyles';
import redirectTo from '../../utils/linking';
import TextField from '../../components/TextField';
import alertOfflineError from '../../utils/alert';
import validateEmailLogin from '../../utils/validate';
import { PASSWORD_FORGOTTEN_URL } from '../../constants/Api';

const {
  Alert,
  Platform,
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
    ...Platform.select({
      ios: {
        borderColor: '#dadada',
        borderLeftWidth: 0,
        borderBottomWidth: 1,
      },
    }),
  },
  buttonWrapper: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#96D243',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonWrapperDisabled: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BaseStyles.disabledButtonColor,
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: BaseStyles.Button,
  textWrapper: {
    flex: 3,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: BaseStyles.hyperlink,
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
            { I18n.t('emailOrUsernameLabel') }
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <View style={[styles.textInputWrapper, styles.innerTextInput]}>
            <Field
              style={BaseStyles.TextInput}
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
              style={BaseStyles.TextInput}
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
            containerStyle={loginDisabled ? styles.buttonWrapperDisabled : styles.buttonWrapper}
            style={styles.button}
            onPress={handleSubmit(this.handlePress)}
            disabled={loginDisabled}
          >
            { I18n.t('login') }
          </Button>
          <Hyperlink
            style={styles.textWrapper}
            linkText={I18n.t('passwordForgotten')}
            onPress={isOnline ? redirectTo : alertOfflineError}
          >
            <Text style={styles.text}>
              {PASSWORD_FORGOTTEN_URL}
            </Text>
          </Hyperlink>
        </View>
      </View>
    );
  }
}

export default Form;
