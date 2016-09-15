import React from 'react';
import ReactNative from 'react-native';
import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import Hyperlink from 'react-native-hyperlink';
import {
  formValueSelector,
  Field,
  reduxForm,
  SubmissionError,
} from 'redux-form';
import { connect } from 'react-redux';

import * as Actions from '../../actions/login';
import BaseStyles from '../../baseStyles';
import BaseTranslations from '../../translations';
import TextField from '../../components/TextField';
import { PASSWORD_FORGOTTEN_URL } from '../../constants/Api';
import redirectTo from '../../utils/linking';
import connectToProps from '../../utils/reduxUtils';
import validateEmailLogin from '../../utils/validate';

const { Component, PropTypes } = React;
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
    marginBottom: 4,
  },
  label: {
    flex: 1,
    color: '#222',
    fontSize: 10.5,
  },
  inputWrapper: {
    flex: 2,
    backgroundColor: 'white',
    paddingLeft: 13,
    borderColor: BaseStyles.lightGray,
    borderWidth: 1,
  },
  textInputWrapper: {
    flex: 1,
    borderColor: BaseStyles.lightGray,
    borderBottomWidth: 1,
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
        borderLeftWidth: 0,
        borderBottomWidth: 1,
      },
      android: { borderBottomWidth: 1 },
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
    backgroundColor: BaseStyles.lightGray,
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
    fontSize: 10.5,
    color: BaseStyles.hyperlink,
  },
});

const t = {
  ...BaseTranslations,
  emailLabel: 'メールアドレスでログインする',
  emailPlaceHolder: 'メールアドレス',
  login: 'ログイン',
  passwordForgotten: 'パスワードを忘れた方',
  passwordPlaceHolder: 'パスワード',
  loginError: 'このメールとパスワードでログインを失敗しました',
};


const formOptions = {
  form: 'email',
  validate: validateEmailLogin,
  touchOnChange: true,
  fields: ['email', 'password'],
};

const checkInput = (states) => {
  // We extract form from the state because returning it will cause
  // a bug "form must be a string, not an object"
  // eslint-disable-next-line no-unused-vars
  const { form, ...otherStates } = states;
  const selector = formValueSelector('email');
  const hasEmail = selector(states, 'email') !== undefined;
  const hasPassword = selector(states, 'password') !== undefined;
  return {
    ...otherStates,
    loginDisabled: !(hasEmail && hasPassword),
  };
};


@connect(checkInput)
@reduxForm(formOptions)
class Email extends Component {
  static propTypes = {
    fetchUserBy: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loginDisabled: PropTypes.bool.isRequired,
  };

  @autobind
  async handlePress({ email, password }) {
    const { fetchUserBy } = this.props;
    try {
      const data = await fetchUserBy('email', [email, password]);
      return data;
    } catch (error) {
      Alert.alert(t.errorTitle, t.loginError);
      throw new SubmissionError({
        email: t.loginError,
        password: t.loginError,
      });
    }
  }

  render() {
    const { handleSubmit, loginDisabled } = this.props;

    return (
      <View style={styles.view}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>
            { t.emailLabel }
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <View style={[styles.textInputWrapper, styles.innerTextInput]}>
            <Field
              style={BaseStyles.TextInput}
              name="email"
              type="email"
              component={TextField}
              placeholder={t.emailPlaceHolder}
              placeholderTextColor={BaseStyles.lightGray}
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
              placeholder={t.passwordPlaceHolder}
              placeholderTextColor={BaseStyles.lightGray}
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType="next"
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.buttonTextWrapper}>
          <Button
            containerStyle={
              (loginDisabled)
                ? styles.buttonWrapperDisabled
                : styles.buttonWrapper
            }
            style={styles.button}
            onPress={handleSubmit(this.handlePress)}
            disabled={loginDisabled}
          >
            { t.login }
          </Button>
          <Hyperlink
            style={styles.textWrapper}
            linkText={t.passwordForgotten}
            onPress={redirectTo}
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


export default connectToProps(Email, 'user', Actions);
