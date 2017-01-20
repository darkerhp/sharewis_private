/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import { Actions, ActionConst, Modal, Scene } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import BaseStyles from '../baseStyles';
import CourseDetails from '../containers/CourseDetails';
import NavigationDrawer from './NavigationDrawer';
import Onboarding from '../containers/Onboarding';
import Lecture from '../containers/Lecture';
import Account from '../containers/Account';
import Login from '../containers/Login';
import SnackLecture from '../containers/SnackLecture';
import ScrollableTabs from './ScrollableTabs';

const { Image, Platform, StyleSheet, View } = ReactNative;

const moreHorizWhiteImage = require('./images/ic_more_horiz_white.png');
const menuWhiteImage = require('./images/ic_menu_white.png');
const backButtonWhiteImage = require('./images/ic_chevron_left_white.png');
const closeWhiteImage = require('./images/ic_close_white.png');

const baseNavBarProps = {
  navigationBarStyle: {
    backgroundColor: BaseStyles.navBarBackgroundColor,
    borderBottomColor: BaseStyles.navBarBackgroundColor,
  },
  backTitle: '戻る',
  titleStyle: { color: 'white' },
  backButtonTextStyle: {
    color: 'white',
    paddingLeft: 0,
  },
  rightButtonTextStyle: { color: 'white' },
  rightButtonIconStyle: {
    width: 25,
    height: 21,
  },
  leftButtonTextStyle: { color: 'white' },
  leftButtonIconStyle: {
    width: 25,
    height: 21,
  },
  leftButtonStyle: {
    width: 200,
  },
};

const styles = StyleSheet.create({
  logoTitleImageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTitleImage: {
    width: 70,
    marginTop: 75,
  },
});

const logoImageSrc = require('./images/logo.png');

const logoTitle = () =>
  <View style={styles.logoTitleImageWrapper}>
    <Image
      source={logoImageSrc}
      resizeMode={'contain'}
      style={styles.logoTitleImage}
    />
  </View>;


const getScenes = () =>
  <Scene key="modal" component={Modal}>
    <Scene key="root" hideNavBar>
      <Scene key="drawer" component={NavigationDrawer} open={false}>
        <Scene key="main" hideNavBar>
          <Scene
            key="onboarding"
            component={Onboarding}
            initial
          />
          <Scene
            key="login"
            component={Login}
            hideNavBar
          />
          <Scene
            key="top"
            {...baseNavBarProps}
            component={ScrollableTabs}
            type={ActionConst.RESET}
            hideNavBar={false}
            onLeft={() => Actions.refresh({ key: 'drawer', open: value => !value })}
            leftButtonImage={menuWhiteImage}
            renderTitle={logoTitle}
          />
          <Scene
            key="courseDetails"
            {...baseNavBarProps}
            component={CourseDetails}
            hideNavBar={false}
            backTitle={I18n.t('myCourse')}
            // onRight={() => console.log('onRight')}
            onBack={() => Actions.top({ initialPage: 0 })}
            backButtonImage={backButtonWhiteImage}
            // rightButtonImage={moreHorizWhiteImage}
          />
          <Scene
            key="lecture"
            {...baseNavBarProps}
            backTitle={I18n.t('back')}
            component={Lecture}
            hideNavBar={false}
            onBack={() => Actions.pop()}
            backButtonImage={backButtonWhiteImage}
          />
          <Scene
            key="snackLecture"
            {...baseNavBarProps}
            backTitle={I18n.t('snackCourse')}
            component={SnackLecture}
            hideNavBar={false}
            onBack={() => Actions.top({ initialPage: 2 })}
            backButtonImage={backButtonWhiteImage}
          />
        </Scene>
      </Scene>
      <Scene key="account">
        <Scene
          key="accountModal"
          {...baseNavBarProps}
          navigationBarStyle={{
            backgroundColor: '#4c4d4f',
            borderBottomColor: '#4c4d4f',
          }}
          component={Account}
          leftButtonImage={closeWhiteImage}
          onLeft={() => Actions.pop()}
          title={I18n.t('accountSettings')}
        />
      </Scene>
    </Scene>
  </Scene>;

export default getScenes;
