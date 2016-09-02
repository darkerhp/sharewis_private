import React from 'react';
import { Scene } from 'react-native-router-flux';

import CourseList from '../containers/CourseList';
import Onboarding from '../containers/Onbording';
import Profile from '../containers/Profile';

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
  </Scene>;


export default getScenes;
