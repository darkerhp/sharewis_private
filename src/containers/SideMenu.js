/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Actions as RouterActions } from 'react-native-router-flux';

import alertOfflineError from '../utils/alert';
import MenuItem from '../components/SideMenu/MenuItem';
import {
  ACT_INQUIRIES_URL,
  ACT_TOS_URL,
  ACT_PRIVACY_URL,
} from '../lib/constants';
import * as localeUtil from '../utils/locale';

const { Linking, Platform, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#ecedec',
    paddingTop: 40,
  },
  mainContainer: {
    flex: 5,
    padding: 20,
  },
  profileWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userNameText: {
    fontSize: 17,
    color: '#555',
  },
  menuWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  menuIcon: {
    fontSize: 32,
    color: '#999',
    marginRight: 10,
  },
  menuText: {
    fontSize: 17,
    color: '#33bcd0',
  },
  joinButtonWrapper: {
    minHeight: 30,
    maxHeight: 47,
    flex: 1,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: '#F5A400',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
  },
});

@connect(({ netInfo, ui, user }) => ({ isOnline: netInfo.isConnected, ui, user }))
class SideMenu extends Component { // eslint-disable-line
  static propTypes = {
    isOnline: PropTypes.bool.isRequired,
    user: PropTypes.shape({}).isRequired,
  };

  render() {
    const { isOnline, user } = this.props;
    let displayUsername = user.nickName || user.userName;
    if (displayUsername && localeUtil.isLocaleJa()) {
      displayUsername += ' さん';
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.profileWrapper}>
            {/* TODO プロフィール画像 */}
            <Text style={styles.userNameText}>
              {displayUsername}
            </Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          {Platform.OS !== 'ios' && // iOSではログインを表示しない
          <MenuItem
            text={user.loggedIn ? I18n.t('accountSettings') : I18n.t('login')}
            iconName={'account-circle'}
            handlePress={() => {
              if (!isOnline) {
                alertOfflineError();
                return;
              }
              user.loggedIn ? RouterActions.accountModal() : RouterActions.loginModal(); // eslint-disable-line
            }}
          />
          }
          {Platform.OS !== 'ios' && // iOSではお問い合わせを表示しない
          <MenuItem
            text={I18n.t('inquiry')}
            iconName={'mail'}
            handlePress={() => (
              isOnline ? Linking.openURL(ACT_INQUIRIES_URL) : alertOfflineError()
            )}
          />
          }
          <MenuItem
            text={I18n.t('tos')}
            iconName={'description'}
            handlePress={() => (
              isOnline ? RouterActions.tosModal() : alertOfflineError()
            )}
          />
          <MenuItem
            text={I18n.t('privacy')}
            iconName={'lock'}
            handlePress={() => (
              isOnline ? RouterActions.privacyModal() : alertOfflineError()
            )}
          />
          {Platform.OS === 'ios' &&
            <Button
              containerStyle={styles.joinButtonWrapper}
              style={styles.buttonText}
              onPress={() => (
                isOnline ? RouterActions.premiumModal() : alertOfflineError()
              )}
            >
              プレミアムアカウントについて
            </Button>
          }
        </View>
      </View>
    );
  }
}

export default SideMenu;

