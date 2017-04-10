/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

import * as Actions from '../modules/actions/user';
import Premium from '../components/SideMenu/Premium';

const { Alert } = ReactNative;

const mapStateToProps = (state) => {
  const { user, netInfo, ui } = state;
  return {
    ...user,
    ...ui,
    isOnline: netInfo.isConnected,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ ...Actions }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class PremiumContainer extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  };

  @autobind
  handlePressJoin() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      this.popupLoginAlert();
    } else {
      Alert.alert(
        I18n.t('premiumJoinTitle'),
        I18n.t('premiumJoin'),
        [
          { text: I18n.t('join'), onPress: () => this.join() },
          { text: I18n.t('cancel') },
        ],
      );
    }
  }

  @autobind
  popupLoginAlert() { // eslint-disable-line
    const options = [
      {
        text: I18n.t('login'),
        onPress: () => {
          RouterActions.loginModal();
        },
      },
      {
        text: I18n.t('signup'),
        onPress: () => {
          RouterActions.signupModal();
        },
      },
      { text: I18n.t('cancel') },
    ];

    Alert.alert(
      I18n.t('loginShareWis'),
      I18n.t('loginShareWisText'),
      options,
    );
  }

  @autobind
  join() { // eslint-disable-line
    console.log('join');
  }

  render() {
    console.log(this.handlePressJoin);
    return <Premium {...this.props} onPressJoin={this.handlePressJoin} />;
  }
}

export default PremiumContainer;
