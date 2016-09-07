import React, { Component } from 'react';
import ReactNative from 'react-native';
import Button from 'react-native-button';

import BaseStyles from '../../baseStyles';

const { Text, StyleSheet, TextInput, View } = ReactNative;

const styles = StyleSheet.create({
  view: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'red',
  },
  labelWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 17,
    marginBottom: 4,
    borderColor: '#110000',
    borderWidth: 1,
  },
  label: {
    flex: 1,
    color: '#222',
  },
  inputWrapper: {
    flex: 2,
    borderColor: '#770000',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  textInputWrapper: {
    flex: 1,
    borderColor: BaseStyles.lightGray,
    paddingLeft: 17,
    borderWidth: 1,
  },
  buttonTextWrapper: {
    flex: 2,
    marginHorizontal: 17,
    marginTop: 17,
    borderColor: '#BB0000',
    borderWidth: 1,
  },
  buttonWrapper: {
    flex: 3,
  },
  button: BaseStyles.Button,
  textWrapper: {
    flex: 1,
    borderColor: 'pink',
    borderWidth: 1,
  },
  text: {
    flex: 1,
    color: '#222',
    textAlign: 'center',
    textAlignVertical: 'center',
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
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log(`do login with ${this.state.email}/${this.state.password}`);
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
          <View style={styles.textInputWrapper}>
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
            onPress={this.handlePressedLogin}
          >
            { t.login }
          </Button>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>
              { t.passwordForgotten }
            </Text>
          </View>
        </View>
      </View>
    );
  }
}


export default Email;
