import React from 'react';
import ReactNative from 'react-native';
import connectToProps from '../utils/reduxUtils';

const { Text, View } = ReactNative;

const t = {
  profile: 'Profile',
};


const Profile = () =>
  <View>
    <Text>
      {t.profile}
    </Text>
  </View>;


export default connectToProps(Profile, 'user');
