/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Actions as RouterActions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';

import alertOfflineError from '../utils/alert';
import MenuItem from '../components/SideMenu/MenuItem';
import {
  ACT_INQUIRIES_URL,
  ACT_TOS_URL,
  ACT_PRIVACY_URL,
} from '../lib/constants';
import * as localeUtil from '../utils/locale';
import * as premiumActions from '../modules/premium'; // eslint-disable-line

const {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} = ReactNative;

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
  restoreButtonWrapper: {
    minHeight: 30,
    maxHeight: 47,
    flex: 1,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: '#999',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
  },
});

const mapStateToProps = ({ netInfo, ui, user }) => ({ isOnline: netInfo.isConnected, ui, user });

const mapDispatchToProps = dispatch => ({ ...bindActionCreators(premiumActions, dispatch) });

@connect(mapStateToProps, mapDispatchToProps)
class SideMenu extends Component { // eslint-disable-line
  static propTypes = {
    isOnline: PropTypes.bool.isRequired,
    user: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  async restore() {
    const { restorePremium } = this.props;

    try {
      this.setState({ isLoading: true });
      const response = await restorePremium();
      if (response.length === 0) {
        Alert.alert(I18n.t('restorePurchaseNotFoundTitle'), I18n.t('restorePurchaseNotFoundMessage'));
        return;
      }
      Alert.alert(I18n.t('restorePurchaseSuccessTitle'), I18n.t('restorePurchaseSuccessMessage'));
    } catch (error) {
      Alert.alert(I18n.t('restorePurchaseErrorTitle'), I18n.t('restorePurchaseErrorMessage'));
    } finally {
      this.setState({ isLoading: false });
    }
  }

  @autobind
  renderRestoreButton() {
    if (this.state.isLoading) {
      return <ActivityIndicator animating size="small" color={'white'} />;
    }
    return I18n.t('restorePurchaseButtonLabel');
  }

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
          {/*
            FIXME プレミアムアカウントに入会するボタンは一旦非表示に
           {Platform.OS === 'ios' && !user.isPremium &&
           <Button
           containerStyle={styles.joinButtonWrapper}
           style={styles.buttonText}
           onPress={() => (
           isOnline ? RouterActions.premiumModal() : alertOfflineError()
           )}
           >
           {I18n.t('aboutPremiumButtonLabel')}
           </Button>
           }
          */}
          {Platform.OS === 'ios' &&
            <Button
              containerStyle={styles.restoreButtonWrapper}
              style={styles.buttonText}
              onPress={() => (
                isOnline ? this.restore() : alertOfflineError()
              )}
              disabled={this.state.isLoading}
            >
              { this.renderRestoreButton() }
            </Button>
          }
        </View>
      </View>
    );
  }
}

export default SideMenu;

