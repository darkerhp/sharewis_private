import React from 'react';
import { StyleSheet } from 'react-native';
import { Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Onboarding from './Onbording';
import CourseList from './CourseList';
import Styles from '../styles';

const RouterWithRedux = connect()(Router);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.mainColorBlue,
  },
});

/* eslint no-unused-vars: [2, { "args": "none" }] */
const App = () =>
  <RouterWithRedux style={styles.container}>
    <Onboarding />
    <CourseList />
  </RouterWithRedux>;

export default App;
