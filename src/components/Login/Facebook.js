/**
 * @flow
 */
import React, { Component } from 'react';
import ReactNative from 'react-native';

const { Text, TextInput, View } = ReactNative;

const t = {
  emailLabel: 'メールアドレスでログインする',
  emailValue: 'メールアドレス',
  passwordValue: 'パスワード',
};

class Email extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      label: t.emailLabel,
      email: t.emailValue,
      password: t.passwordValue,
    };
  }

  render(): ReactElement<any> {
    return (
      <View>
        <Text>{ this.state.label }</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email: String): String => this.setState({ email })}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password: String): String => this.setState({ password })}
        />
      </View>
    );
  }
}

export default Email;
