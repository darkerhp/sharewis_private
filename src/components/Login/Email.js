/**
 * @flow
 */
import React, {
  Component,
  // PropTypes,
} from 'react';
import ReactNative from 'react-native';
import Button from 'react-native-button';

const { Text, TextInput, View } = ReactNative;

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

  doLogin() {
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log(`do login with ${this.state.email}/${this.state.password}`);
  }

  render() {
    return (
      <View>
        <Text>{ t.emailLabel }</Text>
        <TextInput
          placeholder={t.emailPlaceHolder}
          onChangeText={(email: String): String => this.setState({ email })}
          keyboardType="email-address"
          returnKeyType="next"
        />
        <TextInput
          placeholder={t.passwordPlaceHolder}
          onChangeText={(password: String): String => this.setState({ password })}
          returnKeyType="next"
          secureTextEntry
        />
        <Button
          onPress={(): void => this.doLogin()}
        >
          { t.login }
        </Button>
        <Text>{ t.passwordForgotten }</Text>
      </View>
    );
  }
}


export default Email;
