/* eslint no-console: ["error", { allow: ["log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import Button from 'react-native-button';
import Hyperlink from 'react-native-hyperlink';
import { Field, reduxForm } from 'redux-form';
import autobind from 'autobind-decorator';

import * as Actions from '../../actions/login';
import BaseStyles from '../../baseStyles';
import TextField from '../../components/TextField';
import { PASSWORD_FORGOTTEN_URL } from '../../constants/Api';
import redirectTo from '../../utils/linking';
import connectToProps from '../../utils/reduxUtils';
import validateEmailLogin from '../../utils/validate';

const { Component, PropTypes } = React;
const {
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
      ios: { borderBottomWidth: 0.1 },
      android: { borderBottomWidth: 1 },
    }),
  },
  buttonWrapper: {
    flex: 5,
    flexDirection: 'row',
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
  emailLabel: 'メールアドレスでログインする',
  emailPlaceHolder: 'メールアドレス',
  login: 'ログイン',
  passwordForgotten: 'パスワードを忘れた方',
  passwordPlaceHolder: 'パスワード',
};


const formOptions = {
  form: 'email',
  validate: validateEmailLogin,
};


@reduxForm(formOptions)
class Email extends Component {
  static propTypes = {
    addEmail: PropTypes.func,
    addPassword: PropTypes.func,
    fetchUserBy: PropTypes.func.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
  };

  @autobind
  async handlePressedLogin() {
    await this.props.fetchUserBy(
      'facebook',
      [this.props.email, this.props.password],
    );
  }

  @autobind
  handleOnChangeEmail(text) {
    try {
      console.log(`add ${text} to email`);
      return this.props.addEmail(text);
    } catch (error) {
      console.log('YESSS ERROR FOUND');
      return false;
    }
  }

  render() {
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
              onChangeText={text => this.handleOnChangeEmail(text)}
              keyboardType="email-address"
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
              onChangeText={text => this.props.addPassword(text)}
              returnKeyType="next"
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.buttonTextWrapper}>
          <Button
            containerStyle={styles.buttonWrapper}
            style={styles.button}
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
