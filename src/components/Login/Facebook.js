/**
 * @flow
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import ReactNative from 'react-native';

const { Text, TextInput, View } = ReactNative;

const t = {
  emailLabel: 'メールアドレスでログインする',
  emailPlaceHolder: 'メールアドレス',
  passwordPlaceHolder: 'パスワード',
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
      </View>
    );
  }
}


export default Email;
