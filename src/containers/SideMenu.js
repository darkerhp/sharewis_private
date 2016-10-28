import React from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from 'react-native-i18n';

import MenuItem from '../components/SideMenu/MenuItem';
import {
  ACT_INQUIRIES_URL,
  ACT_TOS_URL,
  ACT_PRIVACY_URL,
} from '../constants/Api';

const { Component, PropTypes } = React;
const { Image, Linking, StyleSheet, Text, View } = ReactNative;

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

@connect(({ ui, user }) => ({ ui, user }))
class SideMenu extends Component { // eslint-disable-line
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
          <MenuItem text={I18n.t('courseList')} iconName={'home'} handlePress={() => console.log('myCourse')} />
          <MenuItem text={I18n.t('accountSettings')} iconName={'account-circle'} handlePress={() => console.log('settings')} />
          <MenuItem text={I18n.t('inquiry')} iconName={'mail'} handlePress={() => Linking.openURL(ACT_INQUIRIES_URL)} />
          <MenuItem text={I18n.t('tos')} iconName={'description'} handlePress={() => Linking.openURL(ACT_TOS_URL)} />
          <MenuItem text={I18n.t('privacy')} iconName={'lock'} handlePress={() => Linking.openURL(ACT_PRIVACY_URL)} />
        </View>
      </View>
    );
  }
}

export default SideMenu;

