/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

import * as premiumActions from '../modules/actions/premium';
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
  ...bindActionCreators({ ...premiumActions }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class PremiumContainer extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  };

  static popupLoginAlert() {
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
  popupPremiumJoinAlert() {
    Alert.alert(
      I18n.t('premiumJoinTitle'),
      I18n.t('premiumJoin'),
      [
        { text: I18n.t('join'), onPress: () => this.join() },
        { text: I18n.t('cancel') },
      ],
    );
  }

  @autobind
  handlePressJoin() {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      PremiumContainer.popupLoginAlert();
      return;
    }
    this.popupPremiumJoinAlert();
  }

  @autobind
  async join() { // eslint-disable-line
    const { userId, joinPremium } = this.props;
    const result = await joinPremium(userId);

    // thank you 遷移
    if (result) {
      Alert.alert(I18n.t('paymentFailed'), '', [{ text: I18n.t('cancel') }]);
    } else {
      Alert.alert(I18n.t('thankYou'), I18n.t('thankYouMessage'));
    }
  }

  render() {
    return <Premium {...this.props} onPressJoin={this.handlePressJoin} />;
  }
}

export default PremiumContainer;
