import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import _ from 'lodash';
import autobind from 'autobind-decorator';
import Button from 'react-native-button';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions as RouterActions } from 'react-native-router-flux';

import alertOfflineError from '../utils/alert';
import BaseStyles from '../lib/baseStyles';
import { ENV } from '../lib/constants';
import * as courseActions from '../modules/courses';
import * as purchaseActions from '../modules/purchase'; // eslint-disable-line

const { ActivityIndicator, Alert, View, Text, StyleSheet, Platform } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BaseStyles.onboardingBackgroundColor,
    paddingTop: 90,
  },
  profileImageContainer: {
    flex: 2,
  },
  profileContainer: {
    flex: 2,
    width: BaseStyles.deviceWidth,
  },
  fbContainer: {
    flex: 1,
  },
  notificationContainer: {
    flex: 1,
  },
  labelWrapper: {
    alignItems: 'stretch',
    marginHorizontal: 13,
    marginBottom: 4,
  },
  label: {
    color: '#666',
    fontSize: 13,
  },
  profileContentWrapper: {
    backgroundColor: 'white',
    borderColor: '#dadada',
    borderWidth: 1,
    paddingLeft: 13,
  },
  rowWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: '#dadada',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  fieldNameWrapper: {
    flex: 1,
  },
  fieldText: {
    color: '#222',
  },
  fieldValueWrapper: {
    flex: 2,
  },
  innerTextInput: {
    ...Platform.select({
      ios: {
        borderLeftWidth: 0,
        borderBottomWidth: 1,
      },
    }),
  },
  versionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: BaseStyles.deviceWidth,
  },
  versionText: {
    textAlign: 'right',
    color: '#aaa',
    fontSize: 10,
    margin: 5,
  },
  buttonWrapper: {
    height: 47,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#9b9b9b',
  },
  buttonText: {
    fontSize: 16,
    color: BaseStyles.textColor,
    fontWeight: '400',
    fontFamily: null, // react-native-buttonのfontFamilyをリセット
  },
  restoreButtonWrapper: {
    backgroundColor: '#6f6f6f',
    borderWidth: 0,
    marginHorizontal: 15,
    marginBottom: 0,
  },
  restoreButtonText: {
    color: 'white',
  },
  forGuestFieldWrapper: {
    justifyContent: 'center',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  forGuestFieldLableTextWrapper: {
    marginBottom: 10,
  },
  forGuestFieldLableText: {
    fontSize: 14,
    color: BaseStyles.textColor,
  },
});

const pckg = require('../../package.json');

const mapStateToProps = ({ netInfo, ui, user }) => ({ isOnline: netInfo.isConnected, ui, user });
const mapDispatchToProps = dispatch => ({ ...bindActionCreators({ ...courseActions, ...purchaseActions }, dispatch) });

@connect(mapStateToProps, mapDispatchToProps)
class Account extends Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    isOnline: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  async restore() {
    const { fetchMyCourse, restoreCourse, fetchRestorePurchases, user } = this.props;

    try {
      this.setState({ isLoading: true });
      const response = await restoreCourse(user);
      if (response.length === 0) {
        Alert.alert(I18n.t('restorePurchaseNotFoundTitle'), I18n.t('restorePurchaseNotFoundMessage'));
        return;
      }
      await fetchMyCourse(true);
      Alert.alert(I18n.t('restorePurchaseSuccessTitle'), I18n.t('restorePurchaseSuccessMessage'));
    } catch (error) {
      console.error(error);
      Alert.alert(I18n.t('restorePurchaseErrorTitle'), I18n.t('restorePurchaseErrorMessage'));
    } finally {
      this.setState({ isLoading: false });
    }
  }

  @autobind
  renderRestoreButtonLabel() {
    if (this.state.isLoading) {
      return <ActivityIndicator animating size="small" color={'white'} />;
    }
    return I18n.t('restorePurchaseButtonLabel');
  }

  @autobind
  renderProfileField(fieldName, fieldValue, rowStyle = {}, valueStyle = {}) { // eslint-disable-line
    return (
      <View style={[styles.rowWrapper, rowStyle]}>
        <View style={styles.fieldNameWrapper}>
          <Text style={styles.fieldText}>{fieldName}</Text>
        </View>
        <View style={styles.fieldValueWrapper}>
          <Text style={[styles.fieldText, _.isEmpty(fieldValue) ? { color: '#999' } : {}, valueStyle]}>
            {fieldValue || I18n.t('notSet')}
          </Text>
        </View>
      </View>
    );
  }

  @autobind
  renderLoginAndSignupButtons() {
    const { isOnline } = this.props;

    return (
      <View style={{ justifyContent: 'flex-start' }}>
        <View style={styles.forGuestFieldWrapper}>
          <View style={styles.forGuestFieldLableTextWrapper}>
            <Text style={styles.forGuestFieldLableText}>{I18n.t('loginNavigationMessage')}</Text>
          </View>
          <Button
            containerStyle={styles.buttonWrapper}
            style={styles.buttonText}
            onPress={isOnline ? RouterActions.loginModal : alertOfflineError}
          >
            {I18n.t('login')}
          </Button>
        </View>
        <View style={styles.forGuestFieldWrapper}>
          <View style={styles.forGuestFieldLableTextWrapper}>
            <Text style={styles.forGuestFieldLableText}>{I18n.t('noAccountYet')}</Text>
          </View>
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
    const isGuest = !user.loggedIn;
    return (
      <View style={styles.container}>
        {/* <View style={styles.profileImageContainer} /> */}
        <View style={[styles.profileContainer, isGuest && { flex: 0.5 }]}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>
              {I18n.t('profile')}
            </Text>
          </View>
          <View style={styles.profileContentWrapper}>
            {this.renderProfileField(
              I18n.t('userName'),
              isGuest ? I18n.t('noLoginProfileMessage') : user.userName,
              isGuest && { borderBottomWidth: 0 },
              isGuest && { color: '#999', textAlign: 'right', marginRight: 15 },
            )}
            {!isGuest && this.renderProfileField(I18n.t('nickName'), user.nickName)}
            {!isGuest && this.renderProfileField(I18n.t('email'), user.email, { borderBottomWidth: 0 })}
          </View>
        </View>
        {!user.loggedIn && this.renderLoginAndSignupButtons()}
        <View style={styles.versionContainer}>
          {Platform.OS === 'ios' &&
          <Button
            containerStyle={[styles.buttonWrapper, styles.restoreButtonWrapper]}
            style={[styles.buttonText, styles.restoreButtonText]}
            onPress={() => (
              isOnline ? this.restore() : alertOfflineError()
            )}
            disabled={this.state.isLoading}
          >
            { this.renderRestoreButtonLabel() }
          </Button>
          }
          <Text style={styles.versionText}>version: {pckg.version}-{ENV}</Text>
        </View>
      </View>
    );
  }
}

export default Account;
