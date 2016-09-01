import React from 'react';
import ReactNative from 'react-native';
import Hr from 'react-native-hr';
import MainStyles from '../../styles';
import Email from './Email';
import Facebook from './Facebook';

const { PropTypes } = React;
const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: MainStyles.Text,
});


const Login = () =>
  <View style={styles.login}>
    <Email />
    <Facebook />
    <Hr lineColor="black" />
    <Text style={styles.contentText}>
      アカウントをお持ちでない方はShareWis ACTのWebサイト
      からアカウントを作成してください
    </Text>
  </View>;

Login.propTypes = {
  text: PropTypes.string,
};
Login.defaultProps = {};

export default Login;
