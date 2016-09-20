import React from 'react';
import ReactNative from 'react-native';
import I18n from 'react-native-i18n';
import connectToProps from '../utils/redux';

const { Text, View } = ReactNative;


const Profile = () =>
  <View>
    <Text>
      {I18n.t('profile')}
    </Text>
  </View>;


export default connectToProps(Profile, 'user');
