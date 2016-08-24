import React from 'react';
import ReactNative from 'react-native';
// import { connect } from 'react-redux';
// import { fetchData } from '../actions/courses';
import CoursesScreen from './CourseList';

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


const App = () =>
  <Navigator
    initialRoute={{
      title: 'Courses',
      index: 0,
    }}
    renderScene={(route, navigator) =>
      <CoursesScreen />
    }
    style={styles.container}
  />;

export default App;
