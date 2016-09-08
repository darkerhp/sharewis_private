/* eslint no-console: ["error", { allow: ["log"] }] */
import React, { Component } from 'react';
import ReactNative from 'react-native';
import Button from 'react-native-button';
import Hyperlink from 'react-native-hyperlink';

import BaseStyles from '../../baseStyles';
import { PASSWORD_FORGOTTEN_URL } from '../../constants/Api';
import redirectTo from '../../utils/linking';

const {
  Platform,
  StyleSheet,
  Text,
  TextInput,
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


class Email extends Component {
  // static propTypes = {
  //   email: PropTypes.string.isRequired,
  //   password: PropTypes.number.isRequired,
  // };
  state = {
    email: null,
    password: null,
  };

  handlePressedLogin() {
    console.log(`do login with ${this.state.email}/${this.state.password}`);
  }

  handleHyperlinkText(url) {
    return url === PASSWORD_FORGOTTEN_URL ? t.passwordForgotten : url;
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
            <TextInput
              style={BaseStyles.TextInput}
              placeholder={t.emailPlaceHolder}
              placeholderTextColor={BaseStyles.lightGray}
              onChangeText={email => this.setState({ email })}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={BaseStyles.TextInput}
              placeholder={t.passwordPlaceHolder}
              placeholderTextColor={BaseStyles.lightGray}
              onChangeText={password => this.setState({ password })}
              returnKeyType="next"
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.buttonTextWrapper}>
          <Button
            containerStyle={styles.buttonWrapper}
            style={styles.button}
            onPress={redirectTo}
          >
            { t.login }
          </Button>
          <Hyperlink
            style={styles.textWrapper}
            linkText={this.handleHyperlinkText}
            onPress={this.handleHyperlinkOnPress}
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


export default Email;
