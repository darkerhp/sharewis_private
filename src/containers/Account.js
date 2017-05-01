import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';

import BaseStyles from '../lib/baseStyles';
import { ENV } from '../lib/constants';

const { View, Text, StyleSheet, Platform, Dimensions } = ReactNative;
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: BaseStyles.onboardingBackgroundColor,
    paddingTop: 90,
  },
  profileImageContainer: {
    flex: 2,
  },
  profileContainer: {
    flex: 2,
    width,
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
    alignItems: 'flex-end',
    width,
  },
  versionText: {
    textAlign: 'right',
    color: '#aaa',
    fontSize: 10,
    margin: 5,
  },
});

const pckg = require('../../package.json');

@connect(({ user }) => ({ user }))
class Account extends Component {// eslint-disable-line
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        {/* <View style={styles.profileImageContainer} /> */}

        <View style={styles.profileContainer}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>
              {I18n.t('profile')}
            </Text>
          </View>
          <View style={styles.profileContentWrapper}>
            <View style={styles.rowWrapper}>
              <View style={styles.fieldNameWrapper}>
                <Text style={styles.fieldText}>{I18n.t('userName')}</Text>
              </View>
              <View style={styles.fieldValueWrapper}>
                <Text style={styles.fieldText}>{user.userName}</Text>
              </View>
            </View>
            <View style={styles.rowWrapper}>
              <View style={styles.fieldNameWrapper}>
                <Text style={styles.fieldText}>{I18n.t('nickName')}</Text>
              </View>
              <View style={styles.fieldValueWrapper}>
                <Text style={styles.fieldText}>{user.nickName}</Text>
              </View>
            </View>
            <View style={[styles.rowWrapper, { borderBottomWidth: 0 }]}>
              <View style={styles.fieldNameWrapper}>
                <Text style={styles.fieldText}>{I18n.t('email')}</Text>
              </View>
              <View style={styles.fieldValueWrapper}>
                <Text style={styles.fieldText}>{user.email}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>version: {pckg.version}-{ENV}</Text>
        </View>
      </View>
    );
  }
}

export default Account;
