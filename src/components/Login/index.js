/**
 * @flow
 */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import Hr from 'react-native-hr';
import { Actions } from 'react-native-router-flux';

import MainStyles from '../../baseStyles';
import Facebook from '../../containers/Facebook';
import connectToProps from '../../utils/reduxUtils';
import Email from './Email';

const { Component, PropTypes } = React;
const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: MainStyles.Text,
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
        <Hr lineColor="black" />
        <Text style={styles.contentText}>
          アカウントをお持ちでない方はShareWis ACTのWebサイト
          からアカウントを作成してください
        </Text>
      </View>
    );
  }
}

export default connectToProps(Login, 'user');
