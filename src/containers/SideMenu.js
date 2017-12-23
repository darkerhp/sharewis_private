/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import Button from 'react-native-button';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Actions as RouterActions } from 'react-native-router-flux';

import alertOfflineError from '../utils/alert';
import BaseStyles from '../lib/baseStyles';
import MenuItem from '../components/SideMenu/MenuItem';
import { ACT_INQUIRIES_URL } from '../lib/constants';
import * as localeUtil from '../utils/locale';

const { Alert, Linking, Platform, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#ecedec',
    paddingTop: 40
  },
  mainContainer: {
    flex: 5,
    padding: 20
  },
  profileWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  userNameText: {
    fontSize: 17,
    color: '#666'
  },
  buttonWrapper: {
    height: 47,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: '#ecedec',
    justifyContent: 'center',
    marginBottom: 15
  },
  buttonText: {
    fontSize: 16,
    color: BaseStyles.textColor,
    fontWeight: '400',
    fontFamily: null // react-native-buttonのfontFamilyをリセット
  },
  labelTextWrapper: {
    marginBottom: 10
  },
  labelText: {
    fontSize: 14,
    color: BaseStyles.textColor
  },
  forGuestFieldWrapper: {
    justifyContent: 'center',
    marginBottom: 15
  }
});

const mapStateToProps = ({ netInfo, ui, user }) => ({
  isOnline: netInfo.isConnected,
  ui,
  user
});

@connect(mapStateToProps)
class SideMenu extends Component { // eslint-disable-line
  static propTypes = {
    isOnline: PropTypes.bool.isRequired,
    user: PropTypes.shape({}).isRequired
  };

  renderLoginAndSignupButtons() {
    const { isOnline, user } = this.props;

    return (
      <View>
        {user.isTemporary === false && ( // 購入済みゲストユーザーにはログインさせない
          <View style={styles.forGuestFieldWrapper}>
            <View style={styles.labelTextWrapper}>
              <Text style={styles.labelText}>
                {I18n.t('loginNavigationMessage')}
              </Text>
            </View>
            <Button
              containerStyle={styles.buttonWrapper}
              style={styles.buttonText}
              onPress={isOnline ? RouterActions.loginModal : alertOfflineError}
            >
              {I18n.t('login')}
            </Button>
          </View>
        )}

        <View style={styles.forGuestFieldWrapper}>
          {user.isTemporary === false && ( // 購入済みゲストユーザーには表示しない
            <View style={styles.labelTextWrapper}>
              <Text style={styles.labelText}>{I18n.t('noAccountYet')}</Text>
            </View>
          )}
          <Button
            containerStyle={styles.buttonWrapper}
            style={styles.buttonText}
            onPress={isOnline ? RouterActions.signupModal : alertOfflineError}
          >
            {I18n.t('signupForFree')}
          </Button>
        </View>
      </View>
    );
  }

  render() {
    const { isOnline, user } = this.props;

    let displayUsername = '';
    if (user.loggedIn) {
      displayUsername = user.nickName || user.userName;
    } else {
      displayUsername = I18n.t('guest');
    }
    if (localeUtil.isJa()) {
      displayUsername += ' さん';
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.profileWrapper}>
            {/* TODO プロフィール画像 */}
            <Text style={styles.userNameText}>{displayUsername}</Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          {!user.loggedIn && this.renderLoginAndSignupButtons()}
          <MenuItem
            text={I18n.t('accountSettings')}
            iconName={'account-circle'}
            handlePress={
              isOnline ? RouterActions.accountModal : alertOfflineError
            }
          />
          {Platform.OS !== 'ios' && ( // iOSではお問い合わせを表示しない
            <MenuItem
              text={I18n.t('inquiry')}
              iconName={'mail'}
              handlePress={() =>
                isOnline
                  ? Linking.openURL(ACT_INQUIRIES_URL)
                  : alertOfflineError()
              }
            />
          )}
          <MenuItem
            text={I18n.t('tos')}
            iconName={'description'}
            handlePress={isOnline ? RouterActions.tosModal : alertOfflineError}
          />
          <MenuItem
            text={I18n.t('privacy')}
            iconName={'lock'}
            handlePress={
              isOnline ? RouterActions.privacyModal : alertOfflineError
            }
          />
          {/*
           FIXME プレミアムアカウントに入会するボタンは一旦非表示に
           {Platform.OS === 'ios' && !user.isPremium &&
           <Button
           containerStyle={styles.buttonWrapper}
           style={styles.buttonText}
           onPress={() => (
           isOnline ? RouterActions.premiumModal() : alertOfflineError()
           )}
           >
           {I18n.t('aboutPremiumButtonLabel')}
           </Button>
           }
           */}
        </View>
      </View>
    );
  }
}

export default SideMenu;
