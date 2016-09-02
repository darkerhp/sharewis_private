import React from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

import CourseList from './CourseList';
import Onboarding from './Onbording';
import Profile from './Profile';
import Styles from '../styles';

const RouterWithRedux = connect()(Router);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.mainColorBlue,
  },
});

const t = {
  courseList: 'コースリスト',
  profile: 'プロファイル',
};


/* eslint no-unused-vars: [2, { "args": "none" }] */
const App = () =>
  <RouterWithRedux style={styles.container}>
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
  </RouterWithRedux>;


export default App;
