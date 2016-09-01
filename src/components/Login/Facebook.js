/**
 * @flow
 */
import React from 'react';
import ReactNative from 'react-native';

const { Text, View } = ReactNative;

const t = {
  facebookLabel: 'Facebookアカウントでログインする',
};

const Facebook = () =>
  <View>
    <Text>{ t.facebookLabel }</Text>
  </View>;

export default Facebook;
