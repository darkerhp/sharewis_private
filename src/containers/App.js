import React from 'react';
import ReactNative from 'react-native';
// import { connect } from 'react-redux';
// import { fetchData } from '../actions/courses';
import CourseList from './CourseList';

const {
  Navigator,
  StyleSheet,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

/* eslint no-unused-vars: [2, { "args": "none" }] */
const App = () =>
  <Navigator
    initialRoute={{
      title: 'Courses',
      index: 0,
    }}
    renderScene={(route, navigator) =>
      <CourseList />
    }
    style={styles.container}
  />;

export default App;
