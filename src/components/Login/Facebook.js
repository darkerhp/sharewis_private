/**
 * @flow
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import ReactNative from 'react-native';
import Button from 'react-native-button';

const { Text, TextInput, View } = ReactNative;

const t = {
  emailLabel: 'メールアドレスでログインする',
  emailPlaceHolder: 'メールアドレス',
  passwordPlaceHolder: 'パスワード',
  login: 'ログイン',
};

class Email extends Component {
  propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.number.isRequired,
  };
  state = {
    email: null,
    password: null,
  };

  doLogin() {
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log(`do login with ${this.state.email}/${this.state.password}`);
  }

  render(): ReactElement<any> {
    return (
      <View>
        <Text>{ t.emailLabel }</Text>
        <TextInput
          placeholder={t.emailPlaceHolder}
          onChangeText={(email: String): String => this.setState({ email })}
          keyboardType="email-address"
          returnKeyType="next"
          autoFocus
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
      </View>
    );
  }
}


export default Email;
