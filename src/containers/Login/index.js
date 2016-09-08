/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import Hr from 'react-native-hr';
import Hyperlink from 'react-native-hyperlink';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

import BaseStyles from '../../baseStyles';
import connectToProps from '../../utils/reduxUtils';
import redirectTo from '../../utils/linking';
import { ACT_API_URL } from '../../constants/Api';
import Email from './Email';
import Facebook from './Facebook';

const { Component, PropTypes } = React;
const { StyleSheet, Text, View } = ReactNative;

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
    marginHorizontal: 13,
    paddingVertical: 13,
  },
});

const t = {
  signupText: `アカウントをお持ちでない方は ${ACT_API_URL} からアカウントを作成してください`,
  actWebsite: 'ShareWis ACTのWebサイト',
};

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

  handleHyperlinkText(url) {
    console.log('hyperlink text', url);
    return url === ACT_API_URL ? t.actWebsite : url;
  }

  render() {
    return (
      <View style={styles.login}>
        <Spinner visible={this.props.isFetching} />
        <Email />
        <Facebook />
        <View style={styles.footer}>
          <Hr lineColor="black" />
          <Hyperlink
            linkStyle={{ color: BaseStyles.hyperlink }}
            linkText={this.handleHyperlinkText}
            onPress={redirectTo}
          >
            <Text style={styles.contentText}>
              {t.signupText}
            </Text>
          </Hyperlink>
        </View>
      </View>
    );
  }
}

export default connectToProps(Login, 'user');
