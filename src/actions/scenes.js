import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

import CourseList from '../containers/CourseList';
import Onboarding from '../containers/Onbording';
import Profile from '../containers/Profile';

const t = {
  courseList: 'コースリスト',
  profile: 'プロファイル',
};


export default Actions.create(
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
  </Scene>
);
