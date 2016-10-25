/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import Hr from 'react-native-hr';
import Hyperlink from 'react-native-hyperlink';
import { Actions as RouterActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';

import BaseStyles from '../../baseStyles';
import Email from './Email';
import Facebook from './Facebook';
import redirectTo from '../../utils/linking';
import { connectState } from '../../utils/redux';

const { Component, PropTypes } = React;
const { StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    paddingVertical: 70,
    backgroundColor: BaseStyles.onboardingBackgroundColor,
  },
  contentText: {
    flex: 1,
    color: '#222',
    fontSize: 10.5,
    marginTop: 30,
  },
  footer: {
    flex: 1,
    marginHorizontal: 13,
    paddingVertical: 13,
  },
});


@connectState('user')
class Login extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    // Redirect to Course List page if user is logged in
    if (this.props.isFetching && !nextProps.isFetching && nextProps.loggedIn) {
      RouterActions.courseList();
    }
  }

  render() {
    if (this.props.isFetching) {
      return (<SleekLoadingIndicator loading={this.props.isFetching} text={I18n.t('loading')} />);
    }

    return (
      <View style={styles.login}>
        <Email />
        <Facebook />
        <View style={styles.footer}>
          <Hr lineColor={'#dadada'} />
          <Hyperlink
            linkStyle={{ color: BaseStyles.hyperlink }}
            linkText={I18n.t('actWebsite')}
            onPress={redirectTo}
          >
            <Text style={styles.contentText}>
              {I18n.t('signupText')}
            </Text>
          </Hyperlink>
        </View>
      </View>
    );
  }
}

// export default Login;

const mapStateToProps = (state) => {
  const { user, netInfo, ui } = state;
  return {
    ...user,
    ...ui,
    isOnline: netInfo.isConnected,
  };
};

export default connect(mapStateToProps)(Login);

