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


const getScenes = () =>
  <Scene key="root" hideNavBar>
    <Scene
      key="onboarding"
      component={Onboarding}
    />
    <Scene
      key="courseList"
      component={CourseList}
      title={t.courseList}
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
