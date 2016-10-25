/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import { Actions, ActionConst, Scene } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import BaseStyles from '../baseStyles';
import CourseList from '../containers/CourseList';
import CourseDetails from '../containers/CourseDetails';
import Onboarding from '../containers/Onboarding';
import Profile from '../containers/Profile';
import Lecture from '../containers/Lecture';

const moreHorizWhiteImage = require('./images/ic_more_horiz_white.png');
const menuWhiteImage = require('./images/ic_menu_white.png');
const backButtonWhiteImage = require('./images/ic_chevron_left_white.png');

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
    height: 17,
  },
  leftButtonTextStyle: { color: 'white' },
  leftButtonIconStyle: {
    width: 25,
    height: 17,
  },
};


const getScenes = loggedIn =>
  <Scene key="root" hideNavBar>
    <Scene
      key="onboarding"
      component={Onboarding}
      initial={!loggedIn}
    />
    <Scene
      key="courseList"
      {...baseNavBarProps}
      component={CourseList}
      title={I18n.t('courseList')}
      initial={loggedIn}
      type={ActionConst.RESET}
      hideNavBar={false}
      estimatedTime={0}
      onLeft={() => console.log('onLeft')}
      leftButtonImage={menuWhiteImage}
    />
    <Scene
      key="courseDetails"
      {...baseNavBarProps}
      component={CourseDetails}
      hideNavBar={false}
      backTitle={I18n.t('courseList')}
      // onRight={() => console.log('onRight')}
      onBack={() => Actions.courseList()}
      backButtonImage={backButtonWhiteImage}
      // rightButtonImage={moreHorizWhiteImage}
    />
    <Scene
      key="lecture"
      {...baseNavBarProps}
      backTitle={I18n.t('back')}
      component={Lecture}
      hideNavBar={false}
      backButtonImage={backButtonWhiteImage}
    />
    <Scene
      key="profile"
      component={Profile}
      title={I18n.t('profile')}
    />
  </Scene>;


export default getScenes;
