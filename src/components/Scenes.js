import React from 'react';
import { Scene } from 'react-native-router-flux';

import CourseList from '../containers/CourseList';
import Onboarding from '../containers/Onboarding';
import Profile from '../containers/Profile';
import Lecture from '../containers/Lecture';

const t = {
  courseList: 'コースリスト',
  profile: 'プロファイル',
};


const getScenes = (loggedIn) =>
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
