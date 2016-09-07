/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import Hr from 'react-native-hr';
import { Actions } from 'react-native-router-flux';

import BaseStyles from '../../baseStyles';
import connectToProps from '../../utils/reduxUtils';
import Email from './Email';
import Facebook from './Facebook';

const { Component, PropTypes } = React;
const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    paddingVertical: 70,
    // justifyContent: 'center',
    // alignItems: 'stretch',
    backgroundColor: BaseStyles.onboardingBgLightBlue,
  },
  contentText: {
    flex: 1,
    color: '#222',
    fontSize: 10.5,
    fontWeight: '100',
    marginTop: 30,
  },
  footer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'green',
    marginHorizontal: 17,
    paddingVertical: 17,
  },
});


class Login extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps(props) {
    console.log('in componentWillReceiveProps', props);
    // Redirect to Course List page if user is logged in
    if (!props.isFetching && props.loggedIn) {
      Actions.courseList();
    }
  }

  render() {
    return (
      <View style={styles.login}>
        <Email />
        <Facebook />
        <View style={styles.footer}>
          <Hr lineColor="black" />
          <Text style={styles.contentText}>
            アカウントをお持ちでない方はShareWis ACTのWebサイト
            からアカウントを作成してください
          </Text>
        </View>
      </View>
    );
  }
}

export default connectToProps(Login, 'user');
