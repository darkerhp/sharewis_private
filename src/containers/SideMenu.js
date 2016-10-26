import React from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

import BaseStyles from '../baseStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { Component, PropTypes } = React;
const { Image, StyleSheet, Text, View } = ReactNative;

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
});

class SideMenu extends Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.profileWrapper}>
            {/* TODO プロフィール画像 */}
            <Text style={styles.userNameText}>
              {`${user.nickName || user.userName} さん`}
            </Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.menuWrapper}>
            <Icon
              style={styles.menuIcon}
              name={'home'}
            />
            <Text style={styles.menuText}>マイコース</Text>
          </View>
          <View style={styles.menuWrapper}>
            <Icon
              style={styles.menuIcon}
              name={'account-circle'}
            />
            <Text style={styles.menuText}>アカウント・通知設定</Text>
          </View>
          <View style={styles.menuWrapper}>
            <Icon
              style={styles.menuIcon}
              name={'mail'}
            />
            <Text style={styles.menuText}>お問い合わせ</Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, ui } = state;
  return {
    ui,
    user,
  };
};

export default connect(mapStateToProps)(SideMenu);

