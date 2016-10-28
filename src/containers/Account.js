import React from 'react';
import ReactNative from 'react-native';

import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import I18n from 'react-native-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextField from '../components/TextField';

import BaseStyles from '../baseStyles';

const { Component, PropTypes } = React;
const { View, Text, StyleSheet, Platform, TextInput, Dimensions } = ReactNative;
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
});

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
              プロフィール
            </Text>
          </View>
          <View style={styles.profileContentWrapper}>
            <View style={styles.rowWrapper}>
              <View style={styles.fieldNameWrapper}>
                <Text>ユーザー名</Text>
              </View>
              <View style={styles.fieldValueWrapper}>
                <Text>{user.userName}</Text>
              </View>
            </View>
            <View style={styles.rowWrapper}>
              <View style={styles.fieldNameWrapper}>
                <Text>ニックネーム</Text>
              </View>
              <View style={styles.fieldValueWrapper}>
                <Text>{user.nickName}</Text>
              </View>
            </View>
            <View style={[styles.rowWrapper, { borderBottomWidth: 0 }]}>
              <View style={styles.fieldNameWrapper}>
                <Text>メールアドレス</Text>
              </View>
              <View style={styles.fieldValueWrapper}>
                <Text>{user.email}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.fbContainer} />
        <View style={styles.notificationContainer} />
      </View>
    );
  }
}

export default Account;
