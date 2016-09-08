import React from 'react';
import { ActionConst, Scene } from 'react-native-router-flux';

import CourseList from '../containers/CourseList';
import Onboarding from '../containers/Onboarding';
import Profile from '../containers/Profile';
import Lecture from '../containers/Lecture';

const t = {
  courseList: 'マイコース',
  profile: 'プロファイル',
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
    />
    <Scene
      key="profile"
      component={Profile}
      title={t.profile}
    />
    <Scene
      key="lecture"
      component={Lecture}
      title={t.profile}
      hideNavBar={false}
    />
  </Scene>;


export default getScenes;
