/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import { ActionConst, Scene } from 'react-native-router-flux';

import BaseStyles from '../baseStyles';
import CourseList from '../containers/CourseList';
import CourseDetails from '../containers/CourseDetails';
import Onboarding from '../containers/Onboarding';
import Profile from '../containers/Profile';
import Lecture from '../containers/Lecture';

const t = {
  courseList: 'マイコース',
  profile: 'プロファイル',
};

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
      component={CourseList}
      title={t.courseList}
      initial={loggedIn}
      type={ActionConst.RESET}
      hideNavBar={false}
      duration={0}
      {...baseNavBarProps}
      onLeft={() => console.log('onLeft')}
      leftButtonImage={menuWhiteImage}
    />
    <Scene
      key="courseDetails"
      component={CourseDetails}
      hideNavBar={false}
      {...baseNavBarProps}
      backTitle={t.courseList}
      onRight={() => console.log('onRight')}
      backButtonImage={backButtonWhiteImage}
      rightButtonImage={moreHorizWhiteImage}
    />
    <Scene
      key="lecture"
      component={Lecture}
      title={t.profile}
      hideNavBar={false}
      {...baseNavBarProps}
      backButtonImage={backButtonWhiteImage}
    />
    <Scene
      key="profile"
      component={Profile}
      title={t.profile}
    />
  </Scene>;


export default getScenes;
